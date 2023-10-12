const express = require('express');
const router = express.Router();
var db = require('../../db')

function query(query, values, callback) {
    db.getConn().query(query, values,
    function (err, results, fields) {
        if (err) throw err;
        callback(results, fields);
    });
}

// function endConnection() {
//     db.getConn().end(function (err) { 
//         if (err) throw err;
//         else console.log('Done.') 
//     });
// }

// Get Post
router.post('/', (req, res) => {
    if (req.body.key === ""){
        query('SELECT * FROM inventory;', [], (results, fields) => {
            res.send(results);
        });
    } else {
        res.status(401).send();
    }
    // res.send('hello!');
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