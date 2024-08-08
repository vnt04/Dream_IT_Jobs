const Job = require("../models/jobModel");

class JobController {
  async index(req, res, next) {
    try {
      const jobs = await Job.find().populate("company");
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  }

  async detail(req, res, next) {
    const jobID = req.params.jobID;

    try {
      const job = await Job.findById(jobID).populate("company");
      if (!job) {
        return res.status(404).json({ message: "Job not found!" });
      }
      res.json(job);
    } catch (error) {
      next(error);
    }
  }

  async postJob(req, res, next) {
    const {
      job_title,
      min_salary,
      year_exp,
      max_salary,
      contract,
      address,
      level,
      location,
      job_type,
      mission,
      requirement,
      benefit,
      tech_stack,
      company,
    } = req.body;

    const parsedTechStack = Array.isArray(tech_stack)
      ? tech_stack
      : JSON.parse(tech_stack);

    const newJob = new Job({
      job_title,
      min_salary,
      year_exp,
      max_salary,
      contract,
      address,
      level,
      location,
      job_type,
      mission,
      requirement,
      benefit,
      tech_stack: parsedTechStack,
      company,
    });

    try {
      const job = await newJob.save();
      res.status(201).json({ acknowledged: true, job });
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    let { tech, location, level, jobType, contractType } = req.query;
    const filter = {};

    if (tech) {
      tech = Array.isArray(tech) ? tech : [tech];
      if (tech.length > 0) {
        filter.tech_stack = { $in: tech.map((t) => new RegExp(`^${t}$`, "i")) };
      }
    }

    if (jobType) {
      jobType = Array.isArray(jobType) ? jobType : [jobType];
      if (jobType.length > 0) {
        filter.job_type = {
          $in: jobType.map((jt) => new RegExp(`^${jt}$`, "i")),
        };
      }
    }

    if (contractType) {
      contractType = Array.isArray(contractType)
        ? contractType
        : [contractType];
      if (contractType.length > 0) {
        filter.contract = {
          $in: contractType.map((ct) => new RegExp(`^${ct}$`, "i")),
        };
      }
    }

    if (location && location !== "Tất cả địa điểm") {
      filter.location = new RegExp(location, "i");
    }

    if (level && level !== "Tất cả cấp bậc") {
      filter.level = new RegExp(level, "i");
    }
    try {
      const results = await Job.find(filter).populate("company");
      res.json(results);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new JobController();
