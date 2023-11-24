const express = require('express');
const passport = require('passport');
const db = require('../../db');
const axios = require('axios');
const url = require('url');

const router = express.Router();

// Helper function to query database
function query(query, values, callback) {
    const conn = db.getConn();
    conn.query(query, values,
    function (err, results, fields) {
        if (err) throw err;
        conn.end();
        console.log("Connection broken.")
        callback(results, fields);
    });
}

// Helper function to safely verify the role of the user
function validRole(b2cObjectID, allowedRoles) {
    return new Promise((resolve, reject) => {
        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        const idOk = regex.test(b2cObjectID);
        if (!idOk) {
            reject();
        } else {
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
        }
    });
}

// Get the role of a user, if the user does not exist, create it
router.get('/getRole', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        query(
        `SELECT roles.ID, roles.title FROM users
        LEFT JOIN roles ON users.roleID = roles.ID
        WHERE users.b2cObjectID = ?;`,
        [req.authInfo['oid']],
        (results, fields) => {
            // If present, send corresponding role
            if (results[0]){
                res.status(200).send(results[0]);
            // Otherwise, check object id and add user to database
            } else{
                const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
                if (regex.test(req.authInfo['oid'])) {
                  query(
                    `INSERT INTO users (b2cObjectID, roleID)
                    VALUES (?, 1);`,
                    [req.authInfo['oid']],
                    (results, fields) => {
                        if (results.affectedRows = 1) {
                            res.status(200).json({ID: 1, title: 'Guest'});
                        } else {
                            res.status(500).send();
                        }
                        
                    }
                  )
                } else {
                  res.status(401).send()
                }
                // res.status(500).send();
            }
        });
    }
);

// Get a list of users
router.get('/getUsers', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // Check for Admin role
        validRole(req.authInfo['oid'], [2]).then(() => {
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

// Get a list of roles
router.get('/getRoles', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // Check for Admin role
        validRole(req.authInfo['oid'], [2]).then(() => {
            query(
                `SELECT * FROM roles;`,
                [],
                (results, fields) => {
                    if (results){
                        res.status(200).send(results);
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

// Get a list of suppliers
router.get('/getSuppliers', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // Check for Admin role
        validRole(req.authInfo['oid'], [2]).then(() => {
            query(
                `SELECT suppliers.ID, suppliers.name FROM suppliers;`,
                [],
                (results, fields) => {
                    if (results){
                        res.status(200).send(results);
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

// Update role and supplier of a user
router.post('/updateUser', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // Check for Admin role
        validRole(req.authInfo['oid'], [2]).then(() => {
            // Check if all given values are ok
            const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            const idOk = req.body.hasOwnProperty('id') && regex.test(req.body.id);
            const roleOk = req.body.hasOwnProperty('role') && (req.body.role === null || typeof req.body.role === 'number');
            const supplierOk = req.body.hasOwnProperty('supplier') && (req.body.supplier === null || typeof req.body.supplier === 'number');
            // If not, send code bad request
            if (!idOk || !roleOk || !supplierOk) {
                res.status(400).send();
            } else {
                // If the user is not a supplier anymore, break the link to a supplier
                if (req.body.role != 3) {
                    req.body.supplier = null;
                }

                // Update the user
                query(
                    `UPDATE users SET roleID = ?, supplierID = ?
                    WHERE b2cObjectID = ?;`,
                    [req.body.role, req.body.supplier, req.body.id],
                    ((results, fields) => {
                        if (results.affectedRows == 1) {
                            res.status(200).send();
                        } else {
                            res.status(500).send();
                        }
                    })
                );
            }
        }).catch(() => {
            res.status(401).send();
        });
    }
);

// Delete user
router.post('/deleteUser', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // Check for Admin role
        validRole(req.authInfo['oid'], [2]).then(async () => {
            // Check given b2c object id
            const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            // If not, send code bad request
            if (!req.body.id || !regex.test(req.body.id)) {
                res.status(400).send();
            } else {
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

                // Delete user in Azure
                await axios.delete(
                    `https://graph.microsoft.com/v1.0/users/${req.body.id}`,
                    { headers: { 'Authorization': `Bearer ${response.data.access_token}`} }
                ).catch(() => {
                    console.log("User deletion failed, user was probably already deleted (Azure)");
                });

                // Delete user in database
                query(
                    `DELETE FROM users WHERE users.b2cObjectID = ?;`,
                    [req.body.id],
                    ((results, fields) => {
                        if (results.affectedRows == 0) {
                            console.log("User deletion failed, user was probably already deleted (Database)");
                        }
                        res.status(200).send();
                    })
                );
            }
        }).catch(() => {
            res.status(401).send();
        });
    }
);

// Add mix with products in mix
router.post('/addMix', passport.authenticate('oauth-bearer', { session: false }),
    (req, res) => {
        // Check for Farmer role
        validRole(req.authInfo['oid'], [5]).then(() => {
            // Check if all given values are ok
            const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
            const dateTimeOk = req.body.hasOwnProperty('dateTime') && regex.test(req.body.dateTime);
            const notesOk = req.body.hasOwnProperty('notes') && (req.body.notes.length < 256 || req.body.notes === null);
            // If not, send code bad request
            if (!dateTimeOk || !notesOk) {
                res.status(400).send();
            } else {
                // Check if notes is empty or contains only spaces
                const emptyNotesRegex = /^$|^\s+$/;
                notesEmpty = emptyNotesRegex.test(req.body.notes);
                if (notesEmpty) {
                    req.body.notes = null;
                }

                // Add a mix
                query(
                    `INSERT INTO mixes (dateTime, notes)
                    VALUES (?, ?);`,
                    [req.body.dateTime, req.body.notes],
                    ((results, fields) => {
                        if (results.affectedRows == 1) {
                            console.log("respective id: ", results.insertId);
                            res.status(200).send();
                        } else {
                            res.status(500).send();
                        }
                    })
                );
            }
        }).catch(() => {
            res.status(401).send();
        });
    }
);

module.exports = router;