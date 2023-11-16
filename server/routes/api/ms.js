const express = require('express');
const db = require('../../db');

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

// Get all different roles (test query)
router.post('/getRoles', (req, res) => {
    if (req.body.key === process.env.API_KEY){
        query('SELECT * FROM roles;', [], (results, fields) => {
            res.status(200).send(results);
        });
    } else {
        res.status(401).send();
    }
});

// Add Post
// router.post('/', (req, res) => {
//     query('INSERT INTO inventory (name, quantity) VALUES (?,?);', ['test', 7], (results, fields) => {
//         res.status(201).send(req.body.text);
//     });
// });

// Delete Post
// router.delete('/:id', (req, res) => {
//     query('DELETE * FROM inventory WHERE name=\'test\';', [], (results, fields) => {
//         res.send(results);
//     });
// });

module.exports = router;