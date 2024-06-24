const User = require("../Models/userModel");
const Candidate = require("../Models/candidateModel");
const Recruiter = require("../Models/recruiterModel");

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

      if (existUser) {
        return res.status(201).json({ message: "Email already exists" });
      }

      if (existCandidate) {
        return res.status(201).json({ message: "Email already exists" });
      }
      if (existRecruiter) {
        return res.status(201).json({ message: "Email already exists" });
      }

      const user = await newUser.save();
      res.status(201).json(user);
      if (role === "candidate") {
        const newCandidate = new Candidate({
          uid,
        });
        const candidate = await newCandidate.save();
        res.status(201).json(candidate);
      } else if (role === "recruiter") {
        const newRecruiter = new Recruiter({
          uid,
          company,
          phone,
          position,
        });
        const recruiter = await newRecruiter.save();
        res.status(201).json(recruiter);
      }
    } catch (error) {
      next(error);
    }
  }
  userInfo(req, res, next) {
    User.findById(uid)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  }
}

module.exports = new UserController();
