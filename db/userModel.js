const {Schema, model} = require("mongoose");
const Joi = require('joi');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const joiUserSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string()
})

const User = model('user', userSchema)

module.exports = {
    User,
    joiUserSchema
}