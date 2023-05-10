const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");

const copyDir = async function (srcDir, destDir) {
  srcDir = path.resolve(srcDir);
  destDir = path.resolve(destDir);

  async function updateDirContent() {
    fsPromise
      .readdir(destDir)
      .then((elements) => {
        if (elements.length > 0) {
          elements.forEach((el) =>
            fsPromise.unlink(path.resolve(__dirname, destDir, el))
          );
        }
      })
      .catch((err) => console.log(err.message));

    try {
      (await fsPromise.readdir(srcDir)).forEach(async (el) => {
        let elPath = path.resolve(srcDir, el);
        if ((await fsPromise.stat(elPath)).isFile()) {
          let fileName = path.basename(el);
          let filePathDest = path.resolve(destDir, fileName);
          fs.writeFile(filePathDest, "", (err) => {
            if (err) {
              throw err;
            }
          });
          let filePathSrc = path.resolve(srcDir, fileName);
          fs.copyFile(filePathSrc, filePathDest, (err) => {
            if (err) {
              throw err;
            }
          });
        } else {
          let dirPathSrc = path.resolve(srcDir, el);
          let dirPathDest = path.resolve(destDir, el);
          copyDir(dirPathSrc, dirPathDest);
        }
      });
    } catch (err) {
      throw err;
    }
  }

  fs.access(destDir, fs.constants.F_OK, async (err) => {
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
};

copyDir("04-copy-directory/files", "04-copy-directory/filesCopy");

module.exports = { copyDir: copyDir };
