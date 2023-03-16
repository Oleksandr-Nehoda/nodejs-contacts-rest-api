const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
} = require("../../controllers/usersController");
const { validation, verifyToken } = require("../../middlewares");
const {
  joiUserRegisterSchema,
  joiUserLoginSchema,
} = require("../../db/userModel");

const router = express.Router();

router.post("/register", validation(joiUserRegisterSchema), register);

router.get("/login", validation(joiUserLoginSchema), login);

router.post("/logout", verifyToken, logout);

router.get("/current", verifyToken, getCurrent);

module.exports = router;
