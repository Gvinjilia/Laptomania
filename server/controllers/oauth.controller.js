const axios = require('axios');
const User = require('../models/user.model');
const AppError = require('../utils/appError');

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const getGoogleAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
    });


    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
};

const googleCallback = async (req, res, next) => {
    try {
        const { code } = req.query;

        const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        });
        
        const { access_token } = tokenResponse.data;

        const userInfo = await axios.get(GOOGLE_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        console.log(userInfo.data)

        const { sub, name, picture, email, email_verified } = userInfo.data;

        let user = await User.findOne({oauthId: sub, email});

        if(!user){
            if(!email_verified){
                return next(new AppError('google account not verified', 400));
            };

            user = await User.create({
                fullname: name,
                email,
                oauthProvider: 'google',
                oauthId: sub,
                avatar: picture,
                isVerified: true
            });
        };

        const token = user.signToken();

        const cookieOptions = {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'prod',
            sameSite: 'None',
            maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        };

        res.cookie('lg', token, cookieOptions);

        res.redirect(`${process.env.CLIENT_URL}/profile`);
    } catch (err){
        console.log(err);
        res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }
};

module.exports = {getGoogleAuthUrl, googleCallback};