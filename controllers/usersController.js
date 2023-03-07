const bcrypt = require('bcrypt');
const { add, findOne } = require("../services/userServices");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8)
    const result = await add({email, password: hashPassword});
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

module.exports = {
  register
};
