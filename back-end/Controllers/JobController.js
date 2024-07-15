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
    const {
      tags,
      selectedLocation,
      selectedLevel,
      selectedJobType,
      selectedContractType,
    } = req.query;

    const filter = {};

    if (tags) {
      const tagList = JSON.parse(tags).map((tag) => new RegExp(tag.text, "i"));
      if (tagList.length > 0) {
        filter.tech_stack = { $in: tagList };
      }
    }

    const location = JSON.parse(selectedLocation);
    if (selectedLocation && location.label !== "Tất cả địa điểm") {
      filter.location = new RegExp(location.value, "i");
    }

    const level = JSON.parse(selectedLevel);
    if (selectedLevel && level.label !== "Tất cả cấp bậc") {
      filter.level = new RegExp(level.value, "i");
    }

    if (selectedJobType) {
      const jobTypes = JSON.parse(selectedJobType).map(
        (job) => new RegExp(job.value, "i")
      );
      if (jobTypes.length > 0) {
        filter.job_type = { $in: jobTypes };
      }
    }

    if (selectedContractType) {
      const contractTypes = JSON.parse(selectedContractType).map(
        (contract) => new RegExp(contract.value, "i")
      );
      if (contractTypes.length > 0) {
        filter.contract = { $in: contractTypes };
      }
    }

    try {
      const results = await Job.find(filter).populate("company");
      res.json(results);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new JobController();
