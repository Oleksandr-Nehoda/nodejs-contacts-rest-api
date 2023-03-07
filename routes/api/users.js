const express = require('express');
const {register} = require ('../../controllers/usersController')
const validation = require ('../../middlewares/validation')
const {joiUserSchema} = require('../../db/userModel')

const router = express.Router();

router.post('/register', validation(joiUserSchema), register)

module.exports = router;