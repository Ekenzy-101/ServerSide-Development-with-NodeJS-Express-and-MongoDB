const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const dotenv = require("dotenv");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
dotenv.config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const promoteRouter = require("./routes/promoteRouter");
const leaderRouter = require("./routes/leaderRouter");
const dishRouter = require("./routes/dishRouter");

const connect = mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect
  .then((db) => {
    console.log("Connected correctly to the server");
  })
  .catch((err) => console.log(err));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("12345-67890-09876-54321"));
app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Basic Authentication with Cookies
const auth = (req, res, next) => {
  console.log(req.session);

  if (!req.session.user) {
    let err = new Error("You are not authenticated");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  } else {
    if (req.session.user === "authenticated") {
      next();
    } else {
      let err = new Error("You are not authenticated");
      err.status = 401;
      return next(err);
    }
  }
};
// MiddleWare
app.use(auth);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promoteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
