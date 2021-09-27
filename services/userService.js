const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
TwitterStrategy = require('passport-twitter').Strategy,
FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
    TWITTER_API_KEY,
    TWITTER_API_KEY_SECRET,
    TWITTER_CALLBACK_URL,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    FACEBOOK_CALLBACK_URL
} = process.env;

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
    
    // Local login strategy
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {

            // Match user email with database
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: '<span>That email is not registered. Please try again or <a href="/register">create an account</a> to continue...</span>'
                        });
                    }

                    // Match password with database
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err || !isMatch) {
                            return done(null, false, {
                                message: 'The password you have entered is incorrect. Please try again...'
                            });
                        } else {
                            return done(null, user);
                        }
                    });
                })
                .catch(err => {
                    return done(err, null, {
                        message: 'A connection error has occurred. Please try again later...'
                    });
                });
        })
    );

    // Google OAuth2.0 login strategy
    passport.use(
        new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL
        }, (accessToken, refreshToken, profile, done) => {

            // Check if the email address already exists in the database and create an authenticated session
            User.findOne({
                    email: profile.emails[0].value
                })
                .then((user) => {
                    if (user) {
                        done(null, user);
                    } else {

                        // Create new user with Google email and profile details
                        const newUser = new User({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            provider: 'google',
                            providerId: profile.id
                        });

                        newUser.save().then((user) => {
                            done(null, user);
                        });
                    }
                })
        })
    );

    // Twitter login strategy
    passport.use(
        new TwitterStrategy({
            consumerKey: TWITTER_API_KEY,
            consumerSecret: TWITTER_API_KEY_SECRET,
            callbackURL: TWITTER_CALLBACK_URL,
            includeEmail: true
        }, (token, tokenSecret, profile, done) => {

            // Check if the email address already exists in the database and create an authenticated session
            User.findOne({
                    email: profile.emails[0].value
                })
                .then((user) => {
                    if (user) {
                        done(null, user);
                    } else {

                        // Create new user with Twitter registered email and profile details
                        const newUser = new User({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            provider: 'twitter',
                            providerId: profile.id
                        });

                        newUser.save().then((user) => {
                            done(null, user);
                        });
                    }
                })
        })
    );

    // Facebook login strategy
    passport.use(
        new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: FACEBOOK_CALLBACK_URL,
            enableProof: true,
            profileFields: ['id', 'email', 'displayName']
        }, (accessToken, refreshToken, profile, done) => {
            console.log(profile)

            // Check if the email address already exists in the database and create an authenticated session
            // Might have to handle profile.emails == undefined for unverified emails
            User.findOne({
                    email: profile.emails[0].value
                })
                .then((user) => {
                    if (user) {
                        done(null, user);
                    } else {

                        // Create new user with Facebook registered email and profile details
                        const newUser = new User({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            provider: 'facebook',
                            providerId: profile.id
                        });

                        newUser.save().then((user) => {
                            done(null, user);
                        });
                    }
                })
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};