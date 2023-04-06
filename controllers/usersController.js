const path = require("path");
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../helpers/sendEmail");
const { add, findOne, updateById } = require("../services/userServices");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();
    const result = await add({ email, password, avatarURL, verificationToken });
    const mail = {
      to: email,
      subject: "Confirm your email",
      html: `<a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Click on this link to finish registration </a>`,
    };
    await sendEmail(mail);

    res.status(201).json({
      user: {
        email,
        subscription: "starter",
        avatarURL,
      },
    });
  } catch (err) {
    console.log(`err in Controller111`, err.message);
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await findOne({ verificationToken });
    if (!user) {
      res.status(404).json({
        ResponseBody: {
          message: "User not found",
        },
      });
    }

    await updateById(user._id, { verify: true, verificationToken: null });
    res.json({
      ResponseBody: {
        message: "Verification successful",
      },
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findOne({ email });
    if (!user) {
      res.status(404).json({
        ResponseBody: {
          message: "User not found",
        },
      });
    }
    if (user.verify) {
      throw new Error("Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Confirm your email",
      html: `<a href="http://localhost3001//users/verify/:${user.verificationToken}" target="_blank">Click on this link to finish registration </a>`,
    };
    await sendEmail(mail);
    res.json({
      ResponseBody: {
        message: "Verification email sent",
      },
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    err.status = 400;
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findOne({ email });
    if (!user) {
      throw new Error("Email or password is wrong");
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      throw new Error("Email or password is wrong");
    }
    if (!user.verify) {
      res.status(403).json({
        message: "Email not verify",
      });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
    await updateById(user._id, { token });
    res.json({
      token: token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    err.status = 401;
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await updateById(_id, { token: null });
    res.status(204).json();
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const body = req.body;
    const { subscription } = await updateById(_id, body);
    res.json({
      subscription,
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const imageName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    const jimpAvatar = await Jimp.read(tmpUpload);
    await jimpAvatar.resize(250, 250).write(resultUpload);
    await fs.unlink(tmpUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await updateById(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (err) {
    await fs.unlink(tmpUpload);
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
