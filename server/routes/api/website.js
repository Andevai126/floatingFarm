const express = require('express');
const db = require('../../db')
const passport = require('passport');

const router = express.Router();

// Helper function
function query(query, values, callback) {
    db.getConn().query(query, values,
    function (err, results, fields) {
        if (err) throw err;
        callback(results, fields);
    });
}

// Get the role of a user
router.get('/getRole', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        query(
        `SELECT roles.ID, roles.title FROM users
        LEFT JOIN roles ON users.roleID = roles.ID
        WHERE users.b2cObjectID = ` + req.authInfo['oid'] + ';', // still a bit unsecure
        [],
        (results, fields) => {
            // if (results){
                res.status(200).send(results);
            // } else{
            //     res.status(401).send();
            // }
        });
    }
);

module.exports = router;