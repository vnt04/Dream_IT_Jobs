const Recruiter = require("../Models/recruiterModel");

class RecruiterController {
  index(req, res, next) {
    Recruiter.find({})
      .then((response) => res.json(response))
      .catch((error) => next(error));
  }
}

module.exports = new RecruiterController();
