const http = require("http");
const fs = require("fs");

const sendResponse = (res, filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("Error: Page not found");
      console.log(err);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    const url = req.url;

    if (url === "/about") {
      sendResponse(res, "./Hari-ke-10/html/about.html");
    } else if (url === "/contact") {
      sendResponse(res, "./Hari-ke-10/html/contact.html");
    } else {
      sendResponse(res, "./Hari-ke-10/html/index.html");
    }
  })
  .listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
