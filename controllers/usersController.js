const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const { add, findOne, updateById } = require("../services/userServices");

const {SECRET_KEY} = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email);
    const result = await add({email, password, avatarURL});
    res.status(201).json({
      user: { 
        email,
        subscription: "starter",
        avatarURL
      },
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findOne({email});
    if(!user) {
      throw new Error("Email or password is wrong")
    }
  const passCompare = await bcrypt.compare(password, user.password);
    if(! passCompare) {
      throw new Error("Email or password is wrong")
    }
    const payload = { id: user._id};
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "8h"});
    await updateById(user._id, {token})
    res.json({
      token: token,
      user: { 
        email,
        subscription: user.subscription
      },
    })
  } catch (err) {
    console.log(`err in Controller`, err.message);
    err.status = 401
    next(err);
  }
}

const logout = async (req, res, next) => {
  try {
    const {_id} = req.user;
    await updateById(_id, {token: null});
    res.status(204).json();
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
}

const getCurrent = async (req, res, next) => {
try {
 const{email, subscription} = req.user
  res.json({
    email,
    subscription
  })
} catch (err) {
  console.log(`err in Controller`, err.message);
    next(err);
}
}

const updateSubscription = async (req, res, next) => {
try {
  const {_id} = req.user;
  const body = req.body;
  const {subscription} = await updateById(_id, body);
  res.json({
    subscription
  })
} catch (err) {
  console.log(`err in Controller`, err.message);
  next(err);
}
}


module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription
};
