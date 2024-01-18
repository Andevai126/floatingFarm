const mysql = require('mysql2');
const fs = require('fs');

// Setup database connection
var config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")},
  multipleStatements: false
};

function getConn() {
  // Create new connection
  var conn = new mysql.createConnection(config);

  // Connect
  conn.connect(function (err) { 
    if (err) {
      console.log("!!! Cannot connect !!! Error:");
      throw err;
    } else {
      console.log("Connection established.");
    }
  });

  // Return connection
  return conn;
}

module.exports = {
  getConn
};