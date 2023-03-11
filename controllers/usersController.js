const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { add, findOne } = require("../services/userServices");

const {SECRET_KEY} = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await add({email, password});
    res.status(201).json({
      user: { 
        email,
        subscription: "starter"
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
      return res.status(401).json({
        message: "Email or password is wrong"
      })
    }
  const passCompare = await bcrypt.compare(password, user.password);
    if(! passCompare) {
      return res.status(401).json({
        message: "Email or password is wrong"
      })
    }
    const payload = { id: user._id};
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "2h"});
    res.json({
      token: token,
      user: { 
        email,
        subscription: user.subscription
      },
    })
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
}

module.exports = {
  register,
  login
};
