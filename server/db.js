const mysql = require('mysql2');
const fs = require('fs');
var crypto = require('crypto');

var config = {
  host: 'foodstream.mysql.database.azure.com',
  user: 'sep',
  password: 'FloatingFarm01!',
  database: 'tetdatabase',
  port: 3306,
  ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
};

function getConn() {
  var conn = new mysql.createConnection(config);

  conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    } else {
      console.log("Connection established.");
    }
  });

  return conn;
}

function createUserDatabase() {
  console.log("init user db started");
  // var conn = getConn();
  // create the database schema for the todos app
  getConn().query("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY(255), \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER \
  )");
  
  getConn().query("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )");
  
  getConn().query("CREATE TABLE IF NOT EXISTS todos ( \
    id INTEGER PRIMARY KEY, \
    owner_id INTEGER NOT NULL, \
    title TEXT NOT NULL, \
    completed INTEGER \
  )");
  
  // create an initial user (username: alice, password: letmein)
  var salt = crypto.randomBytes(16);
  getConn().query('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    'alice', crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'), salt
  ]);

  console.log('alice', '\n', crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'), '\n', salt);

  console.log("init user db finished");
};

createUserDatabase();

module.exports = {
  getConn,
  config
};
