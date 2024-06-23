const User = require("../Models/userModel");

class UserController {
  index(req, res, next) {
    User.find({})
      .then((user) => res.json(user))
      .catch((error) => next(error));
  }
  async signUp(req, res, next) {
    const { uid, email, displayName, role } = req.body;
    const newUser = new User({
      uid,
      email,
      displayName,
      role
    });
    try {
      const user = await newUser.save();
      res.status(201).json(user);
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
