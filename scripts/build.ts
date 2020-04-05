import path from "path";
import fs from "fs";
import execa from "execa";
import { transformFileAsync } from "@babel/core";
import transform from "linaria/lib/transform";
import globby from "globby";
import clean from "./clean";

/**
 * Returns the resulting filename for the css
 * file that corresponds the the input JS file.
 * @param filename the input typescript/javascript file
 * @param outDir the outout directory
 */
function resolveOutputFilename(filename: string, outDir: string) {
  const folderStructure = path.relative(process.cwd(), path.dirname(filename));
  const outputBasename = path
    .basename(filename)
    .replace(path.extname(filename), `.css`);

  return path.join(outDir, folderStructure, outputBasename);
}

/**
 * This converts any typescript filename to its javascript equivalent.
 * @param filename the input filename
 */
function resolveRequireInsertionFilename(filename: string) {
  return filename.replace(/\.tsx?/, `.js`);
}

function rewiteCSSSourceMaps(map: string, input: string) {
  const sourceMap = JSON.parse(map);
  sourceMap.sources = sourceMap.sources.map((a: string) =>
    path.relative(input, a)
  );
  sourceMap.file = path.relative(input, sourceMap.file);
  return JSON.stringify(sourceMap);
}

export function buildFile(file: string) {
  const outputFilename = resolveOutputFilename(
    file,
    path.join(__dirname, `..`, `lib`)
  );
  const filename = path.join(__dirname, `..`, `src`, file);
  const { cssText, cssSourceMapText } = transform(
    fs.readFileSync(filename).toString(),
    {
      filename,
      outputFilename,
    }
  );
  if (cssText) {
    fs.mkdirSync(path.dirname(outputFilename), { recursive: true });
    fs.writeFileSync(
      outputFilename,
      `${cssText}\n/*# sourceMappingURL=${path.basename(outputFilename)}.map */`
    );
    fs.writeFileSync(
      `${outputFilename}.map`,
      rewiteCSSSourceMaps(cssSourceMapText!, outputFilename)
    );

    const normalizedInputFilename = resolveRequireInsertionFilename(
      filename.replace(`src`, `lib`)
    );
    const relativePath = path.relative(
      path.dirname(normalizedInputFilename),
      outputFilename
    );
    const requireStatement = `\nimport "${
      relativePath.startsWith(`.`) ? relativePath : `./${relativePath}`
    }"`;

    const inputContent = fs.readFileSync(normalizedInputFilename, `utf-8`);
    if (!inputContent.trim().startsWith(`${requireStatement}`)) {
      fs.writeFileSync(
        normalizedInputFilename,
        `${requireStatement}\n${inputContent}`
      );
    }
  }
}

export async function buildFileAsync(file: string) {
  const outputFilename = resolveOutputFilename(
    file,
    path.join(__dirname, `..`, `lib`)
  );
  const filename = path.join(__dirname, `..`, `src`, file);
  const { cssText, cssSourceMapText } = transform(
    await fs.promises.readFile(filename, `utf-8`),
    {
      filename,
      outputFilename,
    }
  );
  if (cssText) {
    await fs.promises.mkdir(path.dirname(outputFilename), { recursive: true });
    await fs.promises.writeFile(
      outputFilename,
      `${cssText}\n/*# sourceMappingURL=${path.basename(outputFilename)}.map */`
    );
    await fs.promises.writeFile(
      `${outputFilename}.map`,
      rewiteCSSSourceMaps(cssSourceMapText!, outputFilename)
    );

    const normalizedInputFilename = resolveRequireInsertionFilename(
      filename.replace(`src`, `lib`)
    );
    const relativePath = path.relative(
      path.dirname(normalizedInputFilename),
      outputFilename
    );
    const requireStatement = `import "${
      relativePath.startsWith(`.`) ? relativePath : `./${relativePath}`
    }"`;

    const inputContent = await fs.promises.readFile(
      normalizedInputFilename,
      `utf-8`
    );
    if (!inputContent.trim().startsWith(`${requireStatement}`)) {
      await fs.promises.writeFile(
        normalizedInputFilename,
        `${requireStatement}\n${inputContent}`
      );
      let sourceMap;
      try {
        sourceMap = JSON.parse(
          await fs.promises.readFile(`${normalizedInputFilename}.map`, `utf-8`)
        );
      } catch (_e) {}

      if (sourceMap) {
        sourceMap.mappings = `;${sourceMap.mappings}`;
        await fs.promises.writeFile(
          `${normalizedInputFilename}.map`,
          JSON.stringify(sourceMap)
        );
      }
    }
  }
}

const root = path.join(__dirname, `..`);
const src = path.join(root, `src`);
const lib = path.join(root, `lib`);

export async function buildOutFile(file: string) {
  const { code, map } = await transformFileAsync(file, {
    configFile: path.join(__dirname, `..`, `.babelrc.js`),
    sourceMaps: true,
    filename: path.join(root, file),
  });
  let outputFile = path.join(path.relative(src, file));
  outputFile = path.join(
    lib,
    path.dirname(outputFile),
    path.basename(file, path.extname(file)) + `.js`
  );
  await fs.promises.mkdir(path.dirname(outputFile), { recursive: true });
  const sourceMapLocation = `${outputFile}.map`;
  await fs.promises.writeFile(
    outputFile,
    `${code}\n/*# sourceMappingURL=${path.basename(outputFile)}.map */`
  );
  await fs.promises.writeFile(sourceMapLocation, JSON.stringify(map));
  await buildFileAsync(path.relative(src, file));
}

function build() {
  clean();
  fs.mkdirSync(lib);
  execa.commandSync(`tsc`, {
    cwd: path.join(__dirname, `..`),
    stdio: `inherit`,
  });
  const files = globby.sync([
    `${process.env.NODE_ENV === `production` ? `lib` : `src`}/**/*.${
      process.env.NODE_ENV === `production` ? `{js,jsx}` : `{ts,tsx}`
    }`,
    `!src/**/*.test.tsx`,
    `!src/docs`,
  ]);

  files.forEach((file) => {
    buildOutFile(file);
  });
}

export default build;

if (require.main === module) {
  build();
}
