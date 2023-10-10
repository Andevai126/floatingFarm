const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');

const router = express.Router();

var db = require('./../../db')

function query(query, values, callback) {
    db.conn.query(query, values,
    function (err, results, fields) {
        if (err) throw err;
        callback(results, fields);
    });
}

function endConnection() {
    conn.end(function (err) { 
        if (err) throw err;
        else console.log('Done.') 
    });
}

// Get Post
router.get('/', (req, res) => {
    query('SELECT * FROM inventory;', [], (results, fields) => {
        res.send(results);
    });
    // res.send('hello!');
});

// Add Post
router.post('/', (req, res) => {
    query('INSERT INTO inventory (name, quantity) VALUES (?,?);', ['test', 7], (results, fields) => {
        res.status(201).send(req.body.text);
    });
});

// Delete Post
// router.delete('/:id', (req, res) => {
//     query('DELETE * FROM inventory WHERE name=\'test\';', [], (results, fields) => {
//         res.send(results);
//     });
// });

module.exports = router;