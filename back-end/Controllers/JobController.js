const Job = require("../Models/jobModel");

class JobController {
  index(req, res, next) {
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
  postJob(req, res, next) {
    const {
      job_title,
      company,
      min_salary,
      max_salary,
      tag,
      address,
      location,
      img,
      type_job,
      contract,
      viewed,
      year_exp,
      level,
      tech_stack,
    } = req.body;
    const newJob = new Job({
      job_title,
      company,
      salary_range: {
        min_salary,
        max_salary,
      },
      tag,
      address,
      location,
      img: img || "./src/assets/jobs-img/job-df",
      time_created: new Date(),
      type_job,
      contract,
      viewed: viewed || 0,
      year_exp,
      level,
      tech_stack,
    });

    // Save the job document to the database
    newJob
      .save()
      .then((job) => res.status(201).json({ acknowledged: true, job }))
      .catch((error) => next(error));
  }
}

module.exports = new JobController();
