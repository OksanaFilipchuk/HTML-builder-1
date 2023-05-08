const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");

let bundleCssPath = path.join(__dirname, "project-dist", "bundle.css");

fs.access(bundleCssPath, fs.constants.F_OK, async (err) => {
  try {
    await fsPromise.writeFile(bundleCssPath, "");
  } catch (err) {
    console.log(err.message);
  }
  await fsPromise
    .readdir(path.join(__dirname, "styles"))
    .then((files) => {
      files.forEach(async (file) => {
        if (path.extname(file) === ".css") {
          let readStream = fs.createReadStream(
            path.join(__dirname, "styles", file)
          );
          readStream.on("data", (chunk) => {
            fs.appendFile(bundleCssPath, chunk, (err) => {
              if (err) console.log(err);
            });
          });
        }
      });
    })
    .then(() => {
      console.log("The bundle file has been created");
    })
    .catch((err) => console.log(err));
});
