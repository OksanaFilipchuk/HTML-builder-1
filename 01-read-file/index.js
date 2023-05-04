const fs = require("fs");
const readstream = fs.createReadStream("text.txt");
let data = "";
readstream.on("data", (chunk) => (data += chunk));
readstream.on("end", () => console.log(data));
