const http = require("http");
const path = require("path");
const fs = require("fs");

const hostname = "localhost";
const port = 4000;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`);
  if (req.method == "GET") {
    let fileUrl;
    if (req.url == "/") {
      fileUrl = "/index.html";
    } else {
      fileUrl = req.url;
    }

    let filePath = path.resolve(`./public${fileUrl}`);
    const fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(`
                    <html lang="en">
                    <body>
                        <h1>Error 404: ${fileUrl} not found </h1>
                    </body>
                    </html>
                    `);
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(`
                <html lang="en">
                <body>
                    <h1>Error 404: ${fileUrl} is not a HTML file </h1>
                </body>
                </html>
                `);
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(`
            <html lang="en">
            <body>
                <h1>Error 404: ${req.method} not supported </h1>
            </body>
            </html>
            `);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running on at http://${hostname}:${port}/`);
});
