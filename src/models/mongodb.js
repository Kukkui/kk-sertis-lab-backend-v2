/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
'use strict';
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/kukkui';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db('kukkui');
  let query = {username: 'kukkui'};
});
