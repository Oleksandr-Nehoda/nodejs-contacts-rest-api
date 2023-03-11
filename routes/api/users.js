const express = require('express');
const {register, login} = require ('../../controllers/usersController')
const validation = require ('../../middlewares/validation')
const {joiUserRegisterSchema, joiUserLoginSchema} = require('../../db/userModel')

const router = express.Router();

router.post('/register', validation(joiUserRegisterSchema), register)

router.get('/login', validation(joiUserLoginSchema), login)

module.exports = router;