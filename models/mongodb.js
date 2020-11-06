/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/kukkui';

// 1
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log('Database created!');
//   db.close();
// });

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db('kukkui');
  let query = {username: 'kukkui'};
  //   let myobj = [
  //     {username: 'kukkui', password: 'kukkui'},
  //     {username: 'kk', password: 'kk'},
  //     {username: 'punyawee', password: 'punyawee'},
  //   ];
  // 2
  //   dbo.createCollection('accounts', function(err, res) {
  //     if (err) throw err;
  //     console.log('Accounts collection created!');
  //     db.close();
  //   });

  // 3
  //   dbo.collection('accounts').insertMany(myobj, function(err, res) {
  //     if (err) throw err;
  //     console.log('3 account inserted');
  //     db.close();
  //   });

  // 4
  //    dbo.collection('accounts').findOne({}, function(err, result) {
  //     if (err) throw err;
  //     console.log(result.username);
  //     db.close();
  //   });

  // 5
  //    dbo.collection('accounts').find({}).toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });

//   dbo.collection('accounts').find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log('/////////////');
//     console.log(result);
//     db.close();
//   });
});
