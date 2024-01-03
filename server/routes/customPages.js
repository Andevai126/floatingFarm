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

// Send unified sign up or sign in page
router.get('/unified', (req, res) => {
    res.sendFile(path.join(__dirname, '/custom/unified.html'));
});

module.exports = router;