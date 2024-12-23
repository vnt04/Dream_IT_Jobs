const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const hashPassword = (password) => {
  const saltRound = Number(process.env.SALT_ROUND);

  const hashedPassword = bcrypt.hashSync(password, saltRound);
  return hashedPassword;
};

const comparePassword = (enterPassword, hashedPassword) => {
  const result = bcrypt.compareSync(enterPassword, hashedPassword);
  return result;
};

const generateToken = async (payload) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not found in .env");
    }
    const access_token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.ACCESS_TOKEN_LIVE || "60",
    });

    const refresh_token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.REFRESH_TOKEN_LIVE || "1d",
    });

    await User.findByIdAndUpdate(payload.sub, { refresh_token });

    return { access_token, refresh_token };
  } catch (error) {
    next(error);
  }
};

module.exports = { hashPassword, comparePassword, generateToken };
