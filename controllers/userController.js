/* eslint-disable key-spacing */
/* eslint-disable new-cap */
/* eslint-disable prefer-const */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable eol-last */
/* eslint-disable max-len */
var async = require('async');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const url = 'mongodb://localhost:27017/kukkui';
// const Accounts = require('./../models/user.model'); In case... who want to switch to mongoose
exports.myposts = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  try {
    //   Set value and session done

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log('Database on auth');

      const dbo = db.db('kukkui');
      const acc = dbo.collection('accounts');
      const blg = dbo.collection('blogposts');
      const _idx = acc.count()+1;
      const sess = req.session;
      // const username = sess.username;
      const username = sess.username;
      const password = sess.password;
      const query = {username: username};
      acc.find(query).toArray(function(err, result) {
        if (result.length === 0) {
        // check if username correct or not, if not show error username input
          res.status(401).json({'message':'Wrong username input, please try again.'});
        } else {
        // check if username and password correct for view blogs post or not
          const query2 = {username: username, password: password};
          acc.find(query2).toArray(function(err, result) {
            if (result.length === 0) {
              res.status(401).json({'message':`Wrong Password For Username : ${username}`}); // Please login with your password that we assigned to you at the first time.")
            } else {
              if (err) throw err;
              const query3 = {username: username};
              blg.find(query3).toArray(function(err, result) {
                if (result.length === 0) {
                  res.status(204).json({'message':`No Blog Posts For Username : ${username}`}); // Please login with your password that we assigned to you at the first time.")
                } else {
                  if (err) throw err;
                  res.status(200).json(result);
                }
              });
            }
          });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

exports.addposts = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  try {
    const {
      content,
      cardName,
      cardStatus,
      cardContent,
      cardCategory,
    } = req.body;
    //   Set value and session done

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log('Database on auth');
      const dbo = db.db('kukkui');
      const acc = dbo.collection('accounts');
      const blg = dbo.collection('blogposts');
      const _idx = acc.count()+1;
      const _idx2 = blg.count()+1;
      const sess = req.session;
      // const username = sess.username;
      const username = sess.username;
      const password = sess.password;
      const query = {username: username};
      acc.find(query).toArray(function(err, result) {
        if (result.length === 0) {
        // check if username correct or not, if not show error username input
          res.status(401).json({'message':`Wrong username input, please try again.`});
        } else {
        // check if username and password correct for view blogs post or not
          const query2 = {username: username, password: password};
          acc.find(query2).toArray(function(err, result) {
            if (result.length === 0) {
              res.status(401).json({'message':`Wrong Password For Username : ${username}`}); // Please login with your password that we assigned to you at the first time.")
            } else {
              if (err) throw err;
              var postObj = {
                username: username,
                content: content,
                cardName: cardName,
                cardStatus: cardStatus,
                cardContent: cardContent,
                cardStatus: cardStatus,
                cardCategory: cardCategory,
              };
              // const query3 = {username: username};
              blg.insertOne(postObj, function(err, result) {
                if (err) throw err;
                res.status(200).json(postObj);
                // res.status(200).json('Already add new post for username name: '+username+' \nWith Content: '+content+'\nWith cardName: '+cardName+'\nWith cardStatus: '+cardStatus+'\nWith cardContent: '+cardContent+'\nWith cardCategory: '+cardCategory);
              });
            }
          });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

exports.allposts = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  try {
    //   Set value and session done

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log('Database on auth');
      const dbo = db.db('kukkui');
      const acc = dbo.collection('accounts');
      const blg = dbo.collection('blogposts');
      const _idx = acc.count()+1;
      const sess = req.session;
      // const username = sess.username;
      const username = sess.username;
      const password = sess.password;
      const query = {username: username};
      blg.find({}).toArray(function(err, result) {
        if (result.length === 0) {
        // console.log("Wrong Password For Username : " + username);
          res.status(204).json({'message':'No Blog Posts'}); // Please login with your password that we assigned to you at the first time.")
        } else {
          if (err) throw err;
          res.status(200).json(result);
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

exports.editposts = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  try {
    //   Set value and session done
    const {
      content,
      cardName,
      cardStatus,
      cardContent,
      cardCategory,
    } = req.body;
    let idedit= req.params.id;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log('EditNowPass0');
      const dbo = db.db('kukkui');
      const acc = dbo.collection('accounts');
      const blg = dbo.collection('blogposts');
      const _idx = acc.count()+1;
      const _idx2 = blg.count()+1;
      const sess = req.session;
      // const username = sess.username;
      const username = sess.username;
      const password = sess.password;
      const query = {username: username};
      acc.find(query).toArray(function(err, result) {
        if (result.length === 0) {
        // check if username correct or not, if not show error username input
          // console.log('EditNowPass1');
          res.status(401).json({'message':'Wrong username input, please try again.'});
        } else {
          console.log('EditNowPass1');
          // check if username and password correct for view blogs post or not
          const query2 = {username: username, password: password};
          acc.find(query2).toArray(function(err, result) {
            if (result.length === 0) {
              console.log('Wrong Password For Username : ' + username);
              res.status(401).json({'message':`Wrong Password For Username : ${username}`}); // Please login with your password that we assigned to you at the first time.")
            } else {
              console.log('EditNowPass2');
              if (err) throw err;
              var postObj = {
                content: content,
                cardName: cardName,
                cardStatus: cardStatus,
                cardContent: cardContent,
                cardStatus: cardStatus,
                cardCategory: cardCategory,
              };
              const query3 = {username: username};
              blg.updateMany({ _id: new mongodb.ObjectID(req.params.id)}, { $set: postObj }, function(err, result) {
                if (err) throw err;
                console.log('EditNowPass3');

                res.status(200).json(postObj);
                // res.status(204).json('Edit Process Completed \n!!Note : If you still see the record even you\'ve edited its\nPlease remind that you have edit the post that\'s not belong to you!');
              },
              );
            }
          });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

exports.deleteposts = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  try {
    //   Set value and session done
    const {
      content,
      cardName,
      cardStatus,
      cardContent,
      cardCategory,
    } = req.body;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log('Database on auth');
      const dbo = db.db('kukkui');
      const acc = dbo.collection('accounts');
      const blg = dbo.collection('blogposts');
      const _idx = acc.count()+1;
      const _idx2 = blg.count()+1;
      const sess = req.session;
      // const username = sess.username;
      const username = sess.username;
      const password = sess.password;
      const query = {username: username};
      acc.find(query).toArray(function(err, result) {
        if (result.length === 0) {
          // check if username correct or not, if not show error username input
          res.status(401).json({'message':'UnAuthorized!! \nplease try again via POST at localhost:[Port]/auth.'});
        } else {
        // check if username and password correct for view blogs post or not
          const query2 = {username: username, password: password};
          acc.find(query2).toArray(function(err, result) {
            if (result.length === 0) {
              console.log('Wrong Password For Username : ' + username);
              res.status(401).json({'message':'Wrong Password For Username : ' + username}); // Please login with your password that we assigned to you at the first time.")
            } else {
              if (err) throw err;
              blg.deleteOne({ _id: new mongodb.ObjectID(req.params.id)}, function(err, result) {
                if (err) throw err;
                res.status(200).json({'message': `delete process done for id #${req.params.id}`});
                // res.status(204).json({'message':'Edit Process Completed \n!!Note : If you still see the record even you\'ve edited its\nPlease remind that you have edit the post that\'s not belong to you!');
              },
              );
            }
          });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};
