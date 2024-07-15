const User = require("../Models/userModel");
const Candidate = require("../Models/candidateModel");
const Recruiter = require("../Models/recruiterModel");
const Company = require("../Models/companyModel");

class UserController {
  index(req, res, next) {
    User.find({})
      .then((user) => res.json(user))
      .catch((error) => next(error));
  }

  async signUp(req, res, next) {
    const {
      uid,
      email,
      displayName,
      role,
      company,
      phone,
      position,
      photoURL,
      mst,
    } = req.body;

    const newUser = new User({
      uid,
      email,
      displayName,
      avatar: photoURL,
      role,
    });

    try {
      const existUser = await User.findOne({ email });
      const existCandidate = await Candidate.findOne({ uid });
      const existRecruiter = await Recruiter.findOne({ uid });

      if (existUser || existCandidate || existRecruiter) {
        return res.status(201).json({ message: "Email already exists" });
      }

      const user = await newUser.save();

      if (role === "candidate") {
        const newCandidate = new Candidate({
          uid,
        });
        const candidate = await newCandidate.save();
        res.status(201).json(candidate);
      } else if (role === "recruiter") {
        let companyRecord = await Company.findOne({ mst });

        if (!companyRecord) {
          companyRecord = new Company({
            name: company,
            mst,
            logo: "",
            banner: "",
            model: "",
            scale: 1,
            work_time: "",
            over_time: "",
            tech_stack: [],
            address: [],
            location: [],
            field: "",
            follow: 0,
            description: "",
            benefit: "",
            website: "",
            nation: "",
            review_id: null,
          });
          await companyRecord.save();
        }

        const newRecruiter = new Recruiter({
          uid,
          company,
          phone,
          position,
          company_id: companyRecord._id,
        });

        const recruiter = await newRecruiter.save();
        res.status(201).json(recruiter);
      } else {
        res.status(201).json(user);
      }
    } catch (error) {
      next(error);
    }
  }

  userInfo(req, res, next) {
    User.findById(req.params.uid)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  }
}

module.exports = new UserController();
