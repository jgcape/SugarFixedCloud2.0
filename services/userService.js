const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
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

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};