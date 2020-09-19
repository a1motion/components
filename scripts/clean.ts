import fs from "fs";
import path from "path";

function clean() {
  try {
    fs.unlinkSync(path.join(__dirname, "..", "tsconfig.tsbuildinfo"));
  } catch (_e) {}

  try {
    fs.rmdirSync(path.join(__dirname, "..", "lib"), { recursive: true });
  } catch (_e) {}
}

if (require.main === module) {
  clean();
}

export default clean;
