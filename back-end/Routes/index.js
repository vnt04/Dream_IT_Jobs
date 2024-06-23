const jobRouter = require("./job");
const userRouter = require("./user");

function route(app) {
  app.use("/job", jobRouter);
  app.use("/user", userRouter);
}

module.exports = route;
