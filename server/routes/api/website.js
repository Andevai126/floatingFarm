const express = require('express');
const passport = require('passport');
const db = require('../../db')

const router = express.Router();

const conn = db.getConn();

// Helper function
function query(query, values, callback) {
    conn.query(query, values,
    function (err, results, fields) {
        if (err) throw err;
        callback(results, fields);
    });
}

// Get the role of a user
router.get('/getRole', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // <-- calculate something on this line...
        query(
        `SELECT roles.ID, roles.title FROM users
        LEFT JOIN roles ON users.roleID = roles.ID
        WHERE users.b2cObjectID = \"` + req.authInfo['oid'] + '\";', // still a bit unsecure
        [],
        (results, fields) => {
            if (results){
                res.status(200).send(results);
            } else{
                res.status(500).send();
            }
        });
    }
);

module.exports = router;