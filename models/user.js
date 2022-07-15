const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { token } = require("morgan");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiSignupSchema = Joi.object({
  password: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  subscription: Joi.string()
    .trim()
    .default("starter")
    .valid("starter", "pro", "business"),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiEmailSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

const schemas = {
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiEmailSchema,
};

module.exports = {
  User,
  schemas,
};
