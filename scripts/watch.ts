import path from "path";
import execa from "execa";
import fs from "fs";
import chokidar from "chokidar";
import clean from "./clean";
import { buildOutFile } from "./build";

export function debounce<T extends (...params: any[]) => void>(
  cb: T,
  wait = 20
) {
  let h: NodeJS.Timeout;
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };

  return <T>(<any>callable);
}

const root = path.join(__dirname, `..`);
const lib = path.join(root, `lib`);

let tsc: execa.ExecaChildProcess;

function restartTSC() {
  if (tsc) {
    tsc.cancel();
  }

  tsc = execa.command(`tsc --watch --preserveWatchOutput`, {
    cwd: path.join(__dirname, `..`),
  });
}

function watch() {
  clean();
  fs.mkdirSync(lib);
  chokidar
    .watch(`src/**/*.{ts,tsx}`, {
      cwd: path.join(__dirname, `..`),
      ignored: `**/*.test.{ts,tsx}`,
    })
    .on(`add`, (file) => {
      buildOutFile(file);
      if (tsc) {
        restartTSC();
      }
    })
    .on(`change`, (file) => buildOutFile(file))
    .on(`ready`, () => {
      restartTSC();
    });
}

export default watch;

if (require.main === module) {
  watch();
}
