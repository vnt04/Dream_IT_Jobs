const jobRouter = require("./job");
const userRouter = require("./user");
const companyRouter = require("./company");
const blogRouter = require("./blog");
const recruiterRouter = require("./recruiter")
function route(app) {
  app.use("/job", jobRouter);
  app.use("/user", userRouter);
  app.use("/recruiter", recruiterRouter);
  app.use("/company", companyRouter);
  app.use("/blog", blogRouter);
}

module.exports = route;
