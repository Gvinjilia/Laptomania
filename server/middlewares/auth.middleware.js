const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');

const protect = catchAsync(async (req, res, next) => {
    const token = req.cookies.lg;

    if(!token){
        return next(new AppError('You are not logged in', 401))
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
        return next(new AppError('Your token is invalid', 401))
    }

    const user = await User.findById(decoded.id);

    if(!user){
        return next(new AppError('User does not exist', 401))
    };

    req.user = user;

    next();
});

module.exports = protect;