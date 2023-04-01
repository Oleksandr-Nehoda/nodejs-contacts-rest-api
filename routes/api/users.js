const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar 
} = require("../../controllers/usersController");
const { validation, verifyToken, upload } = require("../../middlewares");
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

router.patch("/avatars", verifyToken, upload.single("avatar"),  updateAvatar)

module.exports = router;
