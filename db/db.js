// MongoDb Database Connections

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);
const MongoURI = process.env.MongoURI;
const LOCALURI = process.env.LOCALURI;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// MySql Database Connectios

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'username',
//   password: 'password',
//   database: 'database_name',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// const promisePool = pool.promise();
