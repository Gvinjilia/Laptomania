const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");

const createSendToken = (user, statusCode, res) => {
    const token = user.signToken();

    const cookieOptions = {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'None',
        maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    };

    user.password = undefined;

    res.cookie('lg', token, cookieOptions);
    res.status(statusCode).json(user);
};

const signUp = catchAsync(async (req, res, next) => {
    const {email, fullname, password} = req.body;
    const newUser = await User.create({email, fullname, password});

    const code = newUser.createEmailVerificationToken();
    await newUser.save({ validateBeforeSave: false });
    
    const verificationUrl = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;

    const html = `
            <div style="display: flex; margin-left: 50px; flex-direction: column; gap: 5px">
                <h2 style="font-family: 'Brush Script MT', cursive;">Laptomania</h2>
                <h1 style="font-family: Arial, sans-serif;">Welcome to <br /> Laptomania! 💻🎉</h1>
                <p style="font-family: Arial, sans-serif; font-size: 14px">Your hub for everything laptops. <br /> From the latest models to timeless classics, <br /> Laptomania is where laptop stories come alive.</p>
                <p style="font-family: Arial, sans-serif; font-size: 14px">Click the button bellow to verify email</p>
                <button style="background-color: #8B3DFF; border: none; padding: 10px; width: 100px; border-radius: 5px"><a href='${verificationUrl}' 
                style="text-decoration: none; color: white">Verify Email</a></button>
            </div>
        `;

    try {
        await sendEmail({
            email: newUser.email,
            subject: 'Welcome to Laptomania - Verify Your Email Address',
            html
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully! Please check your email to verify your account.'
        });
    } catch (error) {
        newUser.emailVerificationToken = undefined;
        newUser.emailVerificationExpires = undefined;
        await newUser.save({ validateBeforeSave: false });

        return next(new AppError('There was an error sending the verification email. Please try again later.', 500));
    }
});

const verify = catchAsync(async (req, res, next) => {
    const { code } = req.params;

    const user = await User.findOne({ verificationCode: code });

    if(!user){
        return next(new AppError('The code is incorrect or has expired', 400))
    }

    user.isVerified = true;
    user.verificationCode = undefined;

    await user.save();

    res.status(200).send('<h1>User verified successfully</h1>');
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return next(new AppError('email or password is incorrect', 404));
    }

    const correctPassword = await user.comparePasswords(password, user.password);

    if(!correctPassword){
        return next(new AppError('email or password is incorrect', 404));
    }

    user.password = undefined;

    createSendToken(user, 201, res);
});

const logout = catchAsync(async (req, res) => { // ვქმნით logout ფუნქციას, რომელსაც გადავცემთ req, res ობიექტებს, catchAsync - ს ვიყენებთ ჩვენ იმისათვის, 
    // რომ დავიჭიროთ ასინქრონული error - ები
    res.clearCookie('lg', {
        sameSite: 'None'
    }); // res ობიექტს გააჩნია ერთი მეთოდი სახელად clearCookie რომელიც გადაცემული სახელით წაშლის token - ს cookie - ს სექციიდან

    res.status(200).send(); // მომხმარებელს ვუბრუნებთ პასუხს statusCode - ით 200
});

module.exports = { signUp, login, logout, verify, createSendToken };