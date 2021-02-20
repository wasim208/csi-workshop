const http = require("http");
const fs = require("fs");
const path = require("path");
const todoList = require("./todo");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(
      path.join(__dirname, "public", "home.html"),
      "utf8",
      (err, data) => {
        if (err) throw err;
        res.end(data);
      }
    );
  }

  if (req.url === "/api/todo") {
    res.end(JSON.stringify(todoList));
  }
});

const PORT = 4000;

server.listen(PORT, () => console.log(`server running on port ${PORT}...`));
