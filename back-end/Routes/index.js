const jobRouter = require("./job");
const userRouter = require("./user");
const companyRouter = require("./company");

function route(app) {
  app.use("/job", jobRouter);
  app.use("/user", userRouter);
  app.use("/company", companyRouter);
}

module.exports = route;
