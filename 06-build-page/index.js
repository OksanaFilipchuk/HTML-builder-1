const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const mergeStyles = require("../05-merge-styles/index");
// const copyDir = require("../04-copy-directory/index.js");

async function createHtmlFromTemplate() {
  fs.mkdir(path.join(__dirname, "project-dist"), () => {
    fs.readFile(
      path.join(__dirname, "template.html"),
      "utf-8",
      async (err, data) => {
        if (err) return console.log(err);
        let result = data.toString();
        await fsPromise
          .readdir(path.join(__dirname, "components"))
          .then((components) => {
            components.forEach((component, index) => {
              let templateName = component.replace(".html", "");
              fs.readFile(
                path.resolve(__dirname, "components", component),
                "utf-8",
                (err, templateContent) => {
                  if (err) return console.log(err);
                  result = result.replace(
                    `{{${templateName}}}`,
                    templateContent
                  );
                  if (index === components.length - 1) {
                    result = result.replace("style.css", "bundle.css");
                    fs.writeFile(
                      path.join(__dirname, "project-dist", "index.html"),
                      result,
                      (err) => {
                        if (err) console.log(err);
                      }
                    );
                  }
                }
              );
            });
          });
      }
    );
  });
}

createHtmlFromTemplate();
mergeStyles();
// copyDir(
//   path.join(__dirname, "assets"),
//   path.join(__dirname, "project-dist", "assets")
// );
