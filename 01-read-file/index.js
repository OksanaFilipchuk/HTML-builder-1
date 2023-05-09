const fs = require("fs");
const path = require("path");
const readstream = fs.createReadStream(
  path.resolve("01-read-file", "text.txt")
);
let data = "";
readstream.on("data", (chunk) => (data += chunk));
readstream.on("end", () => console.log(data));
