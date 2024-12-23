const Joi = require("joi");

const userSignUpSchema = Joi.object({
  displayName: Joi.string().min(1),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(32),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8).max(32),
});

module.exports = { userSignUpSchema, userLoginSchema };
