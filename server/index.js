// Packages
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const config = require('./passportConfig');

const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const bearerStrategy = new BearerStrategy({
    identityMetadata: `https://${config.credentials.tenantName}.b2clogin.com/${config.credentials.tenantName}.onmicrosoft.com/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID,
    policyName: config.policies.policyName,
    isB2C: config.settings.isB2C,
    validateIssuer: config.settings.validateIssuer,
    loggingLevel: config.settings.loggingLevel,
    passReqToCallback: config.settings.passReqToCallback
}, (token, done) => {
    // Send user info using the second argument
    done(null, { }, token);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(bearerStrategy);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/custom', express.static(path.join(__dirname, 'routes/custom')));

// Routes
const website = require('./routes/api/website');
app.use('/api/website', website);
const ms = require('./routes/api/ms');
app.use('/api/ms', ms);
const customPages = require('./routes/customPages');
app.use('/custom', customPages);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));