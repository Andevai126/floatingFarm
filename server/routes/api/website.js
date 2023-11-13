const express = require('express');
const passport = require('passport');
const db = require('../../db')

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
        WHERE users.b2cObjectID = \"` + req.authInfo['oid'] + '\";', // Add SQLI protection (single statement, placeholders, input validation)
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

// Get products of a mix
// router.get('/getProductsInMix', passport.authenticate('oauth-bearer', { session: false }),
//     (req, res) => {
//         query(
//         `SELECT roles.ID FROM users
//         LEFT JOIN roles ON users.roleID = roles.ID
//         WHERE users.b2cObjectID = \"` + req.authInfo['oid'] + '\";', // Add SQLI protection (single statement, placeholders, input validation)
//         [],
//         (results, fields) => {
//             if (results){
//                 if (results[0].ID === 5){
//                     query(
//                         `SELECT ProductsInMix.ID FROM ProductsInMix
//                         WHERE ProductsInMix.ID = \"` + req.body.mixID + '\";', // Add SQLI protection (single statement, placeholders, input validation)
//                     [],
//                     (results, fields) => {
//                         res.status(200).send(results);
//                     });
//                 } else {
//                     res.status(500).send();
//                 }
//             } else{
//                 res.status(500).send();
//             }
//         });
//     }
// );