/* eslint-disable keyword-spacing */
/* eslint-disable new-cap */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable eol-last */
/* eslint-disable max-len */
const db = require('../db/dbconnect');
const mysql = require('mysql');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/kukkui';
const generator = require('generate-password');
exports.auth = async (req, res) => {
  // eslint-disable-next-line no-unused-vars


  try {
    const {
      username,
      password,
    } = req.body;
    // if non req body recieved
    let query = {username: username};
    if (!username || !password) {
      return next(new AppError(404, 'fail', 'Please provide email or password'), req, res, next);
    }
    var accountbody = req.body.username;

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log('Database on auth');
      const dbo = db.db('kukkui');
      const acc = dbo.collection('accounts');
      let _idx = acc.count()+1;
      // //   Set value and session done
      // const account = req.body.username;
      // const password = req.body.password;
      const sess = req.session;
      sess.username = username;
      sess.password = password;
      acc.find(query).toArray(function(err, result) {
        if (result.length === 0) {
          const genPassword = generator.generate({
            length: 10,
            numbers: true,
          });
          acc.insertOne({username: username, password: genPassword}, function(err, result) {
            if (err) throw err;
            res.status(200).json({
              'message': `Create new account`,
              'username': username,
              'password': genPassword,
            });
          });// end insert one
          console.log(genPassword);
        }else {
          let query2 = {username: username, password: password};
          acc.find(query2).toArray(function(err, result) {
            if (result.length === 0) {
              console.log('Wrong Password For Username : ' + username);
              res.status(401).send('Wrong Password For Username : ' + username); // Please login with your password that we assigned to you at the first time.")
            } else {
              if (err) throw err;
              const data = JSON.stringify(result[0].username);
              console.log('Record Exist, Correct auth acc name: ' + data);
              res.status(200).json({
                'message': `account authorized`,
              }); // Correct
            }
          });
        }// end else
      }); // end fine one
    });
  } catch (err) {
    throw err;
  }
};