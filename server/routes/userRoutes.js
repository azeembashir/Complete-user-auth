const express = require('express');
const userRegister = require('../controllers/register');
const userLogin = require('../controllers/login');

const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);

module.exports = userRouter;