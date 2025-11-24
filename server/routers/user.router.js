const express = require('express');
const protect = require('../middlewares/auth.middleware');
const allowedTo = require('../middlewares/roles.middlewars');
const { getUsers } = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.route('/').get(protect, allowedTo('admin'), getUsers);

module.exports = userRouter;