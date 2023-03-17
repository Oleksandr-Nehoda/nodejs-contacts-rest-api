const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription
} = require("../../controllers/usersController");
const { validation, verifyToken } = require("../../middlewares");
const {
  joiUserRegisterSchema,
  joiUserLoginSchema,
  joiSubscriptionSchema,
} = require("../../db/userModel");

const router = express.Router();

router.post("/register", validation(joiUserRegisterSchema), register);

router.get("/login", validation(joiUserLoginSchema), login);

router.post("/logout", verifyToken, logout);

router.get("/current", verifyToken, getCurrent);

router.patch("/", verifyToken, validation(joiSubscriptionSchema), updateSubscription)

module.exports = router;
