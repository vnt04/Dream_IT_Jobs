const Recruiter = require("../Models/recruiterModel");

class RecruiterController {
  index(req, res, next) {
    Recruiter.find({})
      .then((response) => res.status(200).json(response))
      .catch((error) => next(error));
  }
}

module.exports = new RecruiterController();
