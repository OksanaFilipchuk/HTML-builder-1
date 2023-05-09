const fsPromise = require("fs/promises");
const fs = require("fs");
const path = require("path");

fsPromise
  .readdir(path.resolve("03-files-in-folder", "secret-folder"), {
    withFileTypes: true,
  })
  .then((files) => {
    let array = [];
    files.forEach((el) => {
      let obj = {
        name: el.name,
        isDir: el.isDirectory(),
        ext: el.isDirectory() ? "" : path.extname(el.name),
      };
      array.push(obj);
    });
    console.table(array);
  });
