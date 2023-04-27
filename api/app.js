const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/", async (req, res, next) => {
  console.log("Score that quiz");
  next();
});
apiRouter.get("/", (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({ message: "success" });
});
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
