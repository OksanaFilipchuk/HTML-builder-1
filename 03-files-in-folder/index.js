const fsPromise = require("fs/promises");
const fs = require("fs");
const path = require("path");

fsPromise
  .readdir(path.resolve("03-files-in-folder", "secret-folder"), {
    withFileTypes: true,
  })
  .then((files) => {
    let array = [];
    files.forEach((el, index) => {
      if (!el.isDirectory()) {
        let fileSize;
        fs.stat(
          path.resolve("03-files-in-folder", "secret-folder", el.name),
          (err, stats) => {
            if (err) {
              console.log(err);
            } else {
              fileSize = stats.size;
              let obj = {
                name: el.name,
                ext: el.isDirectory() ? "" : path.extname(el.name),
                size: fileSize,
              };
              array.push(obj);
              if (index === files.length - 1) {
                console.table(array);
              }
            }
          }
        );
      }
    });
  });
