import fs from "fs";
import path from "path";

function clean() {
  fs.unlinkSync(path.join(__dirname, "..", "tsconfig.tsbuildinfo"));
  fs.rmdirSync(path.join(__dirname, "..", "lib"), { recursive: true });
}

if (require.main === module) {
  clean();
}

export default clean;
