const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../controllers/userController');

// Landing Page
router.get('/', forwardAuthenticated, (req, res) => res.render('landing'));

// Sugars result page
router.get('/result', ensureAuthenticated, (req, res) =>
    res.render('result', {
        user: req.user
    })
);


module.exports = router;