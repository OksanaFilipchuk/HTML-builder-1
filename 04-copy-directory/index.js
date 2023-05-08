const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");

copyDir("files", "filesCopy");

async function copyDir(srcDir, destDir) {
  let folder = destDir;
  async function updateDirContent() {
    try {
      (await fsPromise.readdir(srcDir)).forEach(async (el) => {
        let elPath = path.join(__dirname, srcDir, el);
        if ((await fsPromise.stat(elPath)).isFile()) {
          let fileName = path.basename(el);
          let filePathDest = path.resolve(__dirname, destDir, fileName);
          fs.writeFile(filePathDest, "", (err) => {
            if (err) {
              throw err;
            }
          });
          let filePathSrc = path.resolve(__dirname, srcDir, fileName);
          fs.copyFile(filePathSrc, filePathDest, (err) => {
            if (err) {
              throw err;
            }
          });
        }
      });
    } catch (err) {
      throw err;
    }
  }

  fs.access(folder, fs.constants.F_OK, async (err) => {
    if (err) {
      fsPromise
        .mkdir(destDir, { recursive: true })
        .then(updateDirContent)
        .catch((err) => {
          throw err;
        });
    } else {
      await updateDirContent();
    }
  });
}
