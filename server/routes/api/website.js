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
            query(
                `SELECT users.b2cObjectID AS id, roleID, roles.title AS roleTitle, supplierID, suppliers.name AS supplierName FROM users
                LEFT JOIN roles ON users.roleID = roles.ID
                LEFT JOIN suppliers ON users.supplierID = suppliers.ID;`,
                [],
                async (results, fields) => {
                    if (results){
                        // Retrieve users from database
                        const databaseUsers = results;



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

                        // Retrieve users from Azure
                        const secondResponse = await axios.get(
                            "https://graph.microsoft.com/v1.0/users",
                            { headers: { 'Authorization': `Bearer ${response.data.access_token}`} }
                        );
                        const azureUsers = secondResponse.data.value;
                        


                        // Make array of unique id's, combining the two sets of users
                        const uniqueIDs = [...new Set(databaseUsers.map(item => item.id).concat(azureUsers.map(item => item.id)))]

                        // Add as much available information as possible from the two sets of users
                        const combinedUsers = uniqueIDs.map(uniqueID => {
                            const databaseItem = databaseUsers.find(item => item.id === uniqueID);
                            const azureItem = azureUsers.find(item => item.id === uniqueID);
                            return {
                                id: uniqueID,
                                displayName: azureItem ? azureItem.displayName : null,
                                roleID: databaseItem ? databaseItem.roleID : null,
                                roleTitle: databaseItem ? databaseItem.roleTitle : null,
                                supplierID: databaseItem ? databaseItem.supplierID : null,
                                supplierName: databaseItem ? databaseItem.supplierName : null,
                                isInAzure: !!azureItem,
                                isInDatabase: !!databaseItem
                            };
                        });
                        
                        // Send users
                        res.status(200).send(combinedUsers);
                    } else{
                        res.status(500).send();
                    }
                }
            );
        }).catch(() => {
            res.status(401).send();
        });       
    }
);

module.exports = router;