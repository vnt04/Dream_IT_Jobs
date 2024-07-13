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

    newJob
      .save()
      .then((job) => res.status(201).json({ acknowledged: true, job }))
      .catch((error) => next(error));
  }

  search = (req, res, next) => {
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
        filter.tag = { $in: tagList };
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
        filter.type_job = { $in: jobTypes };
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

    Job.find(filter)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        next(err);
      });
  };
}

module.exports = new JobController();
