/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const mysql = require('mysql');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/kukkui';
const con = MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log('Database created!');
  const dbo = db.db('kukkui');
});


module.exports = {
  con: con,
};
