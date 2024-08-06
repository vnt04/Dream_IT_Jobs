const Company = require("../Models/companyModel");

class CompanyController {
  index(req, res, next) {
    Company.find({})
      .then((company) => res.json(company))
      .catch((error) => next(error));
  }
  addCompany(req, res, next) {
    res.send("add Company");
  }
  detail(req, res, next) {
    const companyID = req.params.companyID;
    Company.findById(companyID)
      .then((company) => {
        if (!company)
          return res.status(404).json({ message: "Company not found!" });
        return res.json(company);
      })
      .catch((error) => next(error));
  }
  search(req, res, next) {
    const { name, city } = req.query;
    let query = {};
    if (name) {
      query.name = new RegExp(name, "i");
    }
    if (city !== "null") {
      query.location = new RegExp(city, "i");
    }
    // query = {name:"",city:""}

    Company.find(query)
      .then((company) => res.json(company))
      .catch((error) => next(error));
  }
}

module.exports = new CompanyController();
