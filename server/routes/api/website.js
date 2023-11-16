const express = require('express');
const passport = require('passport');
const db = require('../../db');
const axios = require('axios');
const url = require('url');

const router = express.Router();

// Helper function to query database
function query(query, values, callback) {
    db.getConn().query(query, values,
    function (err, results, fields) {
        if (err) throw err;
        callback(results, fields);
    });
}

// Helper function to safely verify the role of the user
function validRole(b2cObjectID, allowedRoles) {
    return new Promise((resolve, reject) => {
        query(
            `SELECT roles.ID, roles.title FROM users
            LEFT JOIN roles ON users.roleID = roles.ID
            WHERE users.b2cObjectID = ?;`,
            [b2cObjectID],
            (results, fields) => {
                if (results && allowedRoles.includes(results[0].ID)){
                    resolve();
                } else {
                    reject();
                }
            }
        );
    });
}

// Get the role of a user
router.get('/getRole', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        query(
        `SELECT roles.ID, roles.title FROM users
        LEFT JOIN roles ON users.roleID = roles.ID
        WHERE users.b2cObjectID = ?;`,
        [req.authInfo['oid']],
        (results, fields) => {
            if (results){
                res.status(200).send(results);
            } else{
                res.status(500).send();
            }
        });
    }
);

// Get list of users, if you have the admin role
router.get('/getUsers', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // Check if role is of Admin
        validRole(req.authInfo['oid'], [2]).then(async () => {
            // Get access token
            const response = await axios.post(
                `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
                new url.URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    scope: "https://graph.microsoft.com/.default"
                }).toString()
            );

            // Get list of users
            const secondResponse = await axios.get("https://graph.microsoft.com/v1.0/users",
            {
                headers: { 'Authorization': `Bearer ${response.data.access_token}`}
            });

            // only send specific values?

            // Send list
            res.status(200).send(secondResponse.data.value);
        }).catch(() => {
            res.status(401).send();
        });       
    }
);

module.exports = router;