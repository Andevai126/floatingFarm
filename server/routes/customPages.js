const express = require('express');
const path = require('path');

const router = express.Router();

// Send FF logo
router.get('/favicon', (req, res) => {
    res.sendFile(path.join(__dirname, '/custom/favicon.ico'));
});

// Send image of a cow
router.get('/cowimage', (req, res) => {
    res.sendFile(path.join(__dirname, '/custom/Cow.png'));
});

// Send js to fix password order
// router.get('/external', (req, res) => {
//     res.sendFile(path.join(__dirname, '/custom/external.js'));
// });

// Send unified sign up or sign in page
router.get('/unified', (req, res) => {
    res.sendFile(path.join(__dirname, '/custom/unified.html'));
});

// Send local sign up page
router.get('/local', (req, res) => {
    res.sendFile(path.join(__dirname, '/custom/local.html'));
});

// Send edit profile page
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '/custom/profile.html'));
});

module.exports = router;