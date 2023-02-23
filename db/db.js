// MongoDb Database Connections

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const MongoURI = process.env.MongoURI;
const LOCALURI = process.env.LOCALURI;

mongoose.connect(MongoURI, { useNewUrlParser: true });

// MySql Database Connectios

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();
