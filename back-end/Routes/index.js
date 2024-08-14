const jobRouter = require("./job");
const userRouter = require("./user");
const companyRouter = require("./company");
const blogRouter = require("./blog");
const recruiterRouter = require("./recruiter");

function route(app) {
  app.use("/api/v1/job", jobRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/recruiter", recruiterRouter);
  app.use("/api/v1/company", companyRouter);
  app.use("/api/v1/blog", blogRouter);
}

module.exports = route;
