const { boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    refresh_token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },
    emailToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
