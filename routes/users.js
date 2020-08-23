const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

// Register
router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
});

// Login
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, status: "Login Successful!" });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    let err = new Error(`You are not logged in!`);
    err.status = 403;
    next(err);
  }
});

module.exports = router;
