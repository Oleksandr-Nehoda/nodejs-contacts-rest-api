const { User } = require("../db/userModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new Error("Not authorized");
    }
    const { id } = await jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Error("Not authorized");
    }
    req.user = user;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

module.exports = verifyToken;
