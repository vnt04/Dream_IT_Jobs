const crypto = require("crypto");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const {
  userSignUpSchema,
  userLoginSchema,
} = require("../validations/userValidation");
const {
  hashPassword,
  comparePassword,
  getTokenAndRefreshToken,
  setCookies,
} = require("../helper/auth");
const sendMail = require("../helper/mail");
require("dotenv").config();
const fetch = require("node-fetch");

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

  async getMe(req, res, next) {
    const idMe = req.user.sub;
    const me = await User.findById(idMe);
    const returnData = {
      // id: me.id,
      email: me.email,
      displayName: me.displayName,
      avatar: me.avatar,
      role: me.role,
    };
    res.json(returnData);
  }

  async refreshToken(req, res, next) {
    const refresh_token = req.cookies?.refresh_token;
    if (!refresh_token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    // check if refresh_token is validated
    const verified = jwt.verify(refresh_token, process.env.SECRET_KEY);

    // check if refresh_token exist
    const existUser = await User.findById(verified.sub);
    if (!existUser || existUser.refresh_token !== refresh_token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // generate 2 new tokens
    const tokens = await getTokenAndRefreshToken(existUser);
    setCookies(res, tokens.access_token, tokens.refresh_token);
    return res.json({
      message: "Access token refreshed",
      access_token: tokens.access_token,
    });
  }

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

      const data = await getTokenAndRefreshToken(foundUser);

      return res.status(200).json({ message: "Login successfully.", data });
    } catch (error) {
      next(error);
    }
  }

  googleLogin(req, res, next) {
    const state = "some_state";
    const GOOGLE_OAUTH_SCOPES = [
      "https%3A//www.googleapis.com/auth/userinfo.email",
      "https%3A//www.googleapis.com/auth/userinfo.profile",
    ];
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}&prompt=consent`;
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
  }

  async googleCallback(req, res, next) {
    try {
      const { code } = req.query; // authorization code trả về từ Google Auth Server

      const data = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      };

      // Gọi Google Auth Server đòi access_token
      const response = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const access_token_data = await response.json();

      const { id_token } = access_token_data;

      const token_info_response = await fetch(
        `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
      );
      const userInfo = await token_info_response.json();

      const { email, name, picture } = userInfo;
      const existUser = await User.findOne({ email });

      const userData = existUser
        ? existUser
        : await User.create({
            email: email,
            displayName: name,
            avatar: picture,
            role: "candidate",
            isVerifiedEmail: true,
          });

      const tokens = await getTokenAndRefreshToken(userData);
      setCookies(res, tokens.access_token, tokens.refresh_token);

      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.log(error);
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

  async logout(req, res, next) {
    const id = req.user.sub;
    await User.findByIdAndUpdate(id, { refresh_token: null });

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
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
