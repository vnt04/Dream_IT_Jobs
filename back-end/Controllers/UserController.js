const crypto = require("crypto");
const User = require("../Models/userModel");

const {
  userSignUpSchema,
  userLoginSchema,
} = require("../validations/userValidation");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../helper/auth");
const sendMail = require("../helper/mail");

class UserController {
  index = async (req, res, next) => {
    try {
      const { id, email } = req.query;

      if (id) {
        return this.getUserById(id, res, next);
      }

      if (email) {
        return this.getUserByEmail(email, res, next);
      }

      const users = await User.find({});
      return res.status(200).json({ message: "All users", users });
    } catch (error) {
      next(error);
    }
  };

  async userLogin(req, res, next) {
    try {
      const loginData = await userLoginSchema.validateAsync(req.body);

      const foundUser = await User.findOne({ email: loginData.email });
      if (!foundUser) {
        return res.status(401).json({ message: "Invalid Email" });
      }

      if (!comparePassword(loginData.password, foundUser.password)) {
        return res.status(401).json({ message: "Wrong Password." });
      }

      // generate token and refresh-token
      const payload = {
        sub: foundUser.id,
        role: foundUser.role,
      };

      const data = await generateToken(payload);

      return res.status(200).json({ message: "Login successfully.", data });
    } catch (error) {
      next(error);
    }
  }

  async userSignUp(req, res, next) {
    try {
      //body has {displayName, email, password}
      const newUser = await userSignUpSchema.validateAsync(req.body);
      const emailToken = crypto.randomBytes(64).toString("hex");

      // check if user exist
      const exist = await User.findOne({ email: newUser.email });
      if (exist) {
        return res.status(400).json({ message: "Email exists." });
      }

      // hash password
      newUser.password = hashPassword(newUser.password);

      //save new user to db
      const userCreated = await User.create({
        ...newUser,
        role: "candidate",
        emailToken,
      });

      //verify email

      sendMail(newUser.email, emailToken);

      if (userCreated) {
        return res
          .status(201)
          .json({ message: "User created successfully.", userCreated });
      }
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const emailToken = req.body.emailToken;

      if (!emailToken) {
        return res
          .status(400)
          .json({ status: "Failed", error: "Empty request." });
      }

      const user = await User.findOne({ emailToken });
      console.log(user);

      if (!user) {
        return res
          .status(404)
          .json({ status: "Failed", error: "User not found." });
      }

      await User.updateOne(
        { emailToken },
        { isVerifiedEmail: true, emailToken: null }
      );

      return res
        .status(200)
        .json({ status: "Success", message: "User verified successfully." });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(id, res, next) {
    try {
      const user = await User.findById(id);
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: "User is not found." });
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(email, res, next) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: "User is not found." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
