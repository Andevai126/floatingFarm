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

// Get all mixes with average nutrients per cow
router.post('/getMixes', (req, res) => {
    if (req.body.key === process.env.API_KEY){
        query(`
            SELECT
                pim.mixID,
                m.dateTime,
                pim.productID,
                p.name,
                pim.kilos,
                pim.kilos*(p.dsPerKilo/1000)*p.vemPerKilo AS vem,
                pim.kilos*(p.dsPerKilo/1000)*p.dvePerKilo AS dve
            FROM productsinmix AS pim
            LEFT JOIN mixes AS m ON pim.mixID = m.ID
            LEFT JOIN products AS p ON pim.productID = p.ID;`,
        [], (results, fields) => {
            // Average number of cows present
            var nCows = 33;

            const condensedData = results.reduce((acc, current) => {
                const existingMix = acc.find(item => item.mixID === current.mixID);
            
                if (existingMix) {
                    // MixID already exists, update the existing mix
                    existingMix.nutrients.vemTotal += current.vem/nCows;
                    existingMix.nutrients.dveTotal += current.dve/nCows;

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
                            vemTotal: current.vem/nCows,
                            dveTotal: current.dve/nCows,
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

            // Round sums of nutrients
            condensedData.forEach(mix => {
                mix.nutrients.vemTotal = Math.round(mix.nutrients.vemTotal);
                mix.nutrients.dveTotal = Math.round(mix.nutrients.dveTotal);
            });
            res.status(200).send(condensedData);
        });
    } else {
        res.status(401).send();
    }
});

module.exports = router;