const express = require("express");
const bodyParser = require("body-parser");
const promoteRouter = express.Router();

promoteRouter.use(bodyParser.json());
promoteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the promotions to you!");
  })
  .post((req, res, next) => {
    res.end(
      `Will add the promotion: ${req.body.name} with details: ${req.body.description}`
    );
  })
  .put((req, res, next) => {
    res.end("PUT operation is supported on /promotions ");
  })
  .delete((req, res, next) => {
    res.end("Deleting all promotions ");
  });

promoteRouter
  .route("/:promoId")
  .get((req, res, next) => {
    res.end(`Will send details of the promotion: ${req.params.promoId}`);
  })
  .post((req, res, next) => {
    res.end(
      `POST operation not supported on /promotions/${req.params.promoId}`
    );
  })
  .put((req, res, next) => {
    res.end(`Updating the promotion: ${req.params.promoId}`);
    res.end(
      `Will update the promotion: ${req.body.name} with details: ${req.body.description}`
    );
  })
  .delete((req, res, next) => {
    res.end(`Deleting promotion: ${req.params.promoId}`);
  });

module.exports = promoteRouter;
