const Job = require("../Models/Job");

class JobController {
  index(req, res) {
    res.send("jobs API");
  }

  read(req, res, next) {
    Job.find({})
      .then((job) => res.json(job))
      .then((error) => next(error));
  }
  detail(req, res, next) {
    const jobID = req.params.jobID;

    Job.findById(jobID)
      .then((job) => {
        if (!job) return res.status(404).json({ message: "Job not found!" });
        return res.json(job);
      })
      .catch((error) => next(error));
  }
}

module.exports = new JobController();
