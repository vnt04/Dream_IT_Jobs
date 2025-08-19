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
      expiresIn: process.env.ACCESS_TOKEN_LIVE || "1m",
    });

    const refresh_token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.REFRESH_TOKEN_LIVE || "1d",
    });

    await User.findByIdAndUpdate(payload.sub, { refresh_token });

    return { access_token, refresh_token };
  } catch (error) {
    console.log(error);
  }
};

const setCookies = (res, accessToken, refreshToken) => {
  // set tokens to http-only cookies
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 900000, // 15p
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 604800000, // 7d
  });
};

const getTokenAndRefreshToken = async (user) => {
  const payload = { sub: user.id, role: user.role };
  const data = await generateToken(payload);
  return data;
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  getTokenAndRefreshToken,
  setCookies,
};
