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

// Get all mixes with VEM and DVE - version one
router.post('/getMixesV1', (req, res) => {
    if (req.body.key === process.env.API_KEY){
        query(`
            SELECT pim.mixID, m.dateTime, pim.productID, p.name, pim.kilos, pim.kilos*p.vemPerKilo AS vem, pim.kilos*p.dvePerKilo AS dve
            FROM productsinmix AS pim
            LEFT JOIN mixes AS m ON pim.mixID = m.ID
            LEFT JOIN products AS p ON pim.productID = p.ID;`,
        [], (results, fields) => {
            res.status(200).send(results);
        });
    } else {
        res.status(401).send();
    }
});

// Get all mixes with VEM and DVE - version two
router.post('/getMixesV2', (req, res) => {
    if (req.body.key === process.env.API_KEY){
        query(`
            SELECT pim.mixID, m.dateTime, pim.productID, p.name, pim.kilos, pim.kilos*p.vemPerKilo AS vem, pim.kilos*p.dvePerKilo AS dve
            FROM productsinmix AS pim
            LEFT JOIN mixes AS m ON pim.mixID = m.ID
            LEFT JOIN products AS p ON pim.productID = p.ID;`,
        [], (results, fields) => {
            const condensedData = results.reduce((acc, current) => {
                const existingMix = acc.find(item => item.mixID === current.mixID);
            
                if (existingMix) {
                    // MixID already exists, update the existing mix
                    existingMix.nutrients.vemTotal += current.vem;
                    existingMix.nutrients.dveTotal += current.dve;

                    existingMix.products.push({
                        productID: current.productID,
                        name: current.name,
                        kilos: current.kilos
                    });
                } else {
                    // MixID doesn't exist, create a new mix
                    acc.push({
                        mixID: current.mixID,
                        dateTime: Math.floor(new Date(current.dateTime).getTime() / 1000),
                        nutrients: {
                            vemTotal: current.vem,
                            dveTotal: current.dve,
                        },
                        products: [
                            {
                                productID: current.productID,
                                name: current.name,
                                kilos: current.kilos
                            }
                        ]
                    });
                }
                return acc;
            }, []);
            res.status(200).send(condensedData);
        });
    } else {
        res.status(401).send();
    }
});

module.exports = router;