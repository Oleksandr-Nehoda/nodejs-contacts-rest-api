const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail
} = require("../../controllers/usersController");
const { validation, verifyToken, upload } = require("../../middlewares");
const {
  joiUserRegisterSchema,
  joiUserLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema
} = require("../../db/userModel");

const router = express.Router();

router.post("/register", validation(joiUserRegisterSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validation(joiVerifyEmailSchema), resendVerifyEmail)

router.get("/login", validation(joiUserLoginSchema), login);

router.post("/logout", verifyToken, logout);

router.get("/current", verifyToken, getCurrent);

router.patch("/", verifyToken, validation(joiSubscriptionSchema), updateSubscription)

router.patch("/avatars", verifyToken, upload.single("avatar"),  updateAvatar)

module.exports = router;
