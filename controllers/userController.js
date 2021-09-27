module.exports = {
    
    // If user is not authenticated, redirect to login and force authentication 
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', '<span>Please <a href="/login">log in</a> first to continue...</span>');
        res.redirect('/login');
    },
    
    // If user is already authenticated, redirect to landing page
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.flash('success', '<span>You are already logged in. If you want to sign in with a different email please <a href="/logout">logout</a> to continue...</span>');
        res.redirect('/');
    }
};