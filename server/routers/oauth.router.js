const express = require('express');
const { getGoogleAuthUrl, googleCallback, getFacebookAuthUrl, facebookCallback, githubCallback, getGithubAuthUrl } = require('../controllers/oauth.controller');

const oauthRouter = express.Router();

oauthRouter.get('/google', getGoogleAuthUrl);
oauthRouter.get('/google/callback', googleCallback);

oauthRouter.get('/facebook', getFacebookAuthUrl);
oauthRouter.get('/facebook/callback', facebookCallback);

oauthRouter.get('/github', getGithubAuthUrl);
oauthRouter.get('/github/callback', githubCallback);

module.exports = oauthRouter;