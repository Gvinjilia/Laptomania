const axios = require('axios');
const User = require('../models/user.model');
const AppError = require('../utils/appError');

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const FACEBOOK_AUTH_URL = "https://www.facebook.com/v22.0/dialog/oauth";
const FACEBOOK_TOKEN_URL = "https://graph.facebook.com/v22.0/oauth/access_token";
const FACEBOOK_USERINFO_URL = "https://graph.facebook.com/v22.0/me";

const createSendToken = (user, res) => {
    const token = user.signToken();

    const cookieOptions = {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'None',
        maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    };

    res.cookie('lg', token, cookieOptions);

    res.redirect(`${process.env.CLIENT_URL}/profile`);
};

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

        const { sub, name, picture, email, email_verified } = userInfo.data;

        let user = await User.findOne({ email });

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

        createSendToken(user, res);
    } catch (err){
        console.log(err);
        res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }
};

const getGithubAuthUrl = (req, res) => {
    const rootUrl = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        scope: 'read:user user:email',
    });

    res.redirect(`${rootUrl}?${params.toString()}`);
};

const githubCallback = async (req, res, next) => {
    try {
        const { code } = req.query;

        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GITHUB_REDIRECT_URI
        }, {
            headers: {
                Accept: 'application/json'
            }
        });

        const { access_token } = tokenResponse.data;

        if (!access_token) {
            return next(new AppError('Failed to get access token from GitHub', 400));
        }

        const userInfo = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        let { id, name, email, avatar_url } = userInfo.data;

        // GitHub users can keep email private, so fetch from emails endpoint if not available
        if (!email) {
            const emailResponse = await axios.get('https://api.github.com/user/emails', {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            // Find primary verified email
            const primaryEmail = emailResponse.data.find(e => e.primary && e.verified);
            if (primaryEmail) {
                email = primaryEmail.email;
            }
        }

        if (!email) {
            return next(new AppError('Unable to retrieve email from GitHub account', 400));
        }

        // First, check if user exists with this specific GitHub account
        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({
                fullname: name || 'GitHub User',
                email,
                avatar: avatar_url,
                oauthId: id.toString(),
                oauthProvider: 'github',
                isVerified: true,
            });
        }

        createSendToken(user, res);
    } catch(err) {
        console.log(err);
        res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }
}

const getFacebookAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.FACEBOOK_CLIENT_ID,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        scope: "public_profile",
    });

    res.redirect(`${FACEBOOK_AUTH_URL}?${params.toString()}`);
};

const facebookCallback = async (req, res, next) => {
    try {
        const { code } = req.query;

        const tokenResponse = await axios.post(FACEBOOK_TOKEN_URL, {
            code,
            client_id: process.env.FACEBOOK_CLIENT_ID,
            client_secret: process.env.FACEBOOK_CLIENT_SECRET,
            redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        });
        
        const { access_token } = tokenResponse.data;

        const userInfo = await axios.get(FACEBOOK_USERINFO_URL, {
            params: {
                fields: "id,name,email,picture",
                access_token
            },
        });

        console.log(userInfo.data)
    } catch (err){
        console.log(err);
    }
};

module.exports = {getGoogleAuthUrl, googleCallback, getFacebookAuthUrl, facebookCallback, getGithubAuthUrl, githubCallback};