const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const emailRegExp = /^\w+@\w+\.\w+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
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
    avatarURL: String,
    verify: {
      type: Boolean,
      defaulte: false,
    },
    varificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const joiUserRegisterSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(emailRegExp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiUserLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().required()
})

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserRegisterSchema,
  joiUserLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema
};
