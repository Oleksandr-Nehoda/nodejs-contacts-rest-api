const {Schema, model} = require("mongoose");
const Joi = require('joi');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function() {
 if(this.isNew) {
  this.password = await bcrypt.hash(this.password, 8)
 }
})

// userSchema.methods.comparePassword =  function  (password) {
// return bcrypt.compareSync(password, this.password)
// }

const joiUserRegisterSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string()
})

const joiUserLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required()
})

const User = model('user', userSchema)

module.exports = {
    User,
    joiUserRegisterSchema,
    joiUserLoginSchema
}