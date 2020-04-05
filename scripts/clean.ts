import fs from "fs";
import path from "path";

function clean() {
  fs.rmdirSync(path.join(__dirname, `..`, `lib`), { recursive: true });
}

if (require.main === module) {
  clean();
}

export default clean;
