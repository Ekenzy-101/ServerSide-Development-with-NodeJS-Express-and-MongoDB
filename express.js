const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const dishRouter = require("./routes/dishRouter");
const promoteRouter = require("./routes/promoteRouter");
const leaderRouter = require("./routes/leaderRouter");

// MIDDLEWARES
app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<html lang="en">
            <body>
                <h1>This is an express server</h1>
            </body>
            </html>`);
});
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// ROUTES
app.use("/dishes", dishRouter);
app.use("/promotions", promoteRouter);
app.use("/leaders", leaderRouter);

const port = 4000;
const hostname = "localhost";
const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running on at http://${hostname}:${port}/`);
});
