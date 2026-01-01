const express = require('express');
const userRegister = require('../controllers/register');
const userLogin = require('../controllers/login');
const authMiddleware = require('../middlewares/authMiddleware');
const getUser = require('../controllers/getUser');
const userLogout = require('../controllers/logout');

const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);
userRouter.get('/getuser', authMiddleware, getUser)

module.exports = userRouter;