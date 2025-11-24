const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userShema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        lowercase: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        validate: [validator.isEmail, 'Email should be valid'],
        lowercase: true
    },

    role: {
        enum: ['user', 'moderator', 'admin'],
        default: 'user',
        type: String
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    },
    verificationCode: String
}, { timestamps: true });

userShema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userShema.methods.comparePasswords = async (candidate, password) => {
    return await bcrypt.compare(candidate, password);
};

userShema.methods.signToken = function (){
    return jwt.sign({ id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

userShema.methods.createEmailVerificationToken = function (){
    const code = crypto.randomBytes(12).toString('hex');

    this.verificationCode = code;

    return code;
};

const User = mongoose.model('user', userShema);

module.exports = User;