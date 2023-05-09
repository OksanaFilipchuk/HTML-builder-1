const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");

async function mergeStyles(srcDir, destDir) {
  let bundleCssPath = path.resolve(destDir, "bundle.css");
  fs.access(bundleCssPath, fs.constants.F_OK, async (err) => {
    try {
      await fsPromise.writeFile(bundleCssPath, "");
    } catch (err) {
      console.log(err.message);
    }
    await fsPromise
      .readdir(path.resolve(srcDir))
      .then((files) => {
        files.forEach(async (file) => {
          if (path.extname(file) === ".css") {
            let readStream = fs.createReadStream(path.resolve(srcDir, file));
            readStream.on("data", (chunk) => {
              fs.appendFile(bundleCssPath, chunk, (err) => {
                if (err) console.log(err);
              });
            });
          }
        });
      })
      .then(() => {
        console.log("The bundle css file has been created");
      })
      .catch((err) => console.log(err));
  });
}
mergeStyles("05-merge-styles/styles", "05-merge-styles/project-dist");

module.exports = mergeStyles;
