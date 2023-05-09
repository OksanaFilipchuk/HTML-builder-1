const fs = require("fs");
const path = require("path");

process.stdin.on("data", (data) => {
  if (data.toString().slice(0, -1) == "exit") {
    process.exit();
  } else {
    fs.appendFile(path.resolve("02-write-file", "text.txt"), data, (err) => {
      if (err) throw err;
      console.log("text is added to file text.txt");
    });
  }
});

process.on("exit", () => {
  process.stdout.write("Good luck!");
});

process.on("SIGINT", () => {
  process.exit();
});

console.log("Welcome to Node.js! Enter the text you want to add to text.txt");
