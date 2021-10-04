const express = require('express');
const router = express.Router();
var logStatus = false;
const {
    ensureAuthenticated
} = require('../controllers/userController');

// Landing Page
router.get('/', (req, res) => res.render('landing'));

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        logStatus = true;

    } else {
        logStatus = false;
    }
});



// Sugars result page
router.get('/result', ensureAuthenticated, (req, res) =>
    res.render('result', {
        user: req.user
    })
);

module.exports = router;