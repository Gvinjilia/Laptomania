const express = require('express');
const { signUp, login, logout, verify } = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.get('/verify/:code', verify);

authRouter.post('/auto-login', protect, async (req, res, next) => { // auto-login - ის დროს ვიყენებთ protect - ს რომელიც შეამოწმებს token - ის ვალიდურობას
    res.status(200).json(req.user); // პასუხად ვაბრუნებთ მომხმარებელის ინფორმაციას რომელიც არის შენახული token - ში 
});

module.exports = authRouter;