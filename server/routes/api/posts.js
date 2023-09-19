const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');

const router = express.Router();

var config = {
    host: 'foodstream.mysql.database.azure.com',
    user: 'sep',
    password: 'FloatingFarm01!',
    database: 'tetdatabase',
    port: 3306,
    ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    } else {
       console.log("Connection established.");
    }
});

function query(query, values, callback) {
    conn.query(query, values,
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