const Company = require("../Models/companyModel");

class CompanyController {
  index(req, res, next) {
    Company.find({})
      .then((company) => res.json(company))
      .catch((error) => next(error));
  }

  search(req, res, next) {
    const { name, city } = req.query;
    let query = {};
    if (name) {
      query.name = new RegExp(name, "i");
    }
    if (city) {
      query.city = new RegExp(city, "i");
    }
    Company.find(query)
      .then((company) => res.json(company))
      .catch((error) => next(error));
  }
}

module.exports = new CompanyController();
