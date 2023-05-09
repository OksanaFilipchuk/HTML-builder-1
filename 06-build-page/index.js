const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const mergeStyles = require("../05-merge-styles/index");
const { copyDir } = require("../04-copy-directory/src");

async function createHtmlFromTemplate() {
  fs.mkdir(path.resolve("06-build-page", "project-dist"), () => {
    fs.readFile(
      path.resolve("06-build-page", "template.html"),
      "utf-8",
      async (err, data) => {
        if (err) return console.log(err);
        let result = data.toString();
        await fsPromise
          .readdir(path.resolve("06-build-page", "components"))
          .then((components) => {
            components.forEach((component, index) => {
              let templateName = component.replace(".html", "");
              fs.readFile(
                path.resolve("06-build-page", "components", component),
                "utf-8",
                async (err, templateContent) => {
                  if (err) return console.log(err);
                  result = result.replace(
                    `{{${templateName}}}`,
                    templateContent
                  );
                  if (index === components.length - 1) {
                    result = result.replace("style.css", "bundle.css");
                    fs.writeFile(
                      path.resolve(
                        "06-build-page",
                        "project-dist",
                        "index.html"
                      ),
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
mergeStyles("06-build-page/styles", "06-build-page/project-dist");
copyDir("06-build-page/assets", "06-build-page/project-dist/assets");
