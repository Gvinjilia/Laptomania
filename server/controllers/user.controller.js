const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

const getUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json(users);
});

module.exports = { getUsers };