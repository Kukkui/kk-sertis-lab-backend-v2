'use strict';
const auth = require('../models/auth.model');
const accounts = require('../models/user.model');
// view my posts via mongoose model
exports.myposts = async (req, res, next) => {
  try {
    const sess = req.session;
    const username = sess.username;
    const password = sess.password;
    // check for authenticated
    auth.findOne({username: username}, function(err, user) {
      if (err) throw err;
      if (user) {
        // compare password from session username and password
        user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          // username and password was found(authenticted isMatch)
          if (isMatch) {
            //
            accounts.find({username: username}, function(err, posts) {
              if (err) return next(err);
              console.log(posts);
              res.send(posts);
            });
          } else {
            console.log('Password incorrect : '+password, isMatch);
            res.status(401).json({
              'message': `Wrong Password For Username : ${username}`,
            });
          }
        });
      } else {
        res.status(200).json({
          'message': `Can't authorization : ${username}`,
          'hint': 'please try to login and authorized again',
        });
      }
    });
  } catch (err) {
    throw err;
  };
};
// add posts via mongoose model
exports.addposts = async (req, res, next) => {
  try {
    const sess = req.session;
    const username = sess.username;
    const password = sess.password;
    auth.findOne({username: username}, function(err, user) {
      if (err) throw err;
      if (user) {
        user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            const postobj = {
              'username': req.body.username,
              'content': req.body.content,
              'cardName': req.body.cardName,
              'cardStatus': req.body.cardStatus,
              'cardContent': req.body.cardContent,
              'cardCategory': req.body.cardCategory,
            };
            accounts.create(postobj, function(err, result) {
              if (err) return next(err);
              console.log(result);
              res.send(result);
            });
          } else {
            console.log('Password incorrect : '+password, isMatch);
            res.status(401).json({
              'message': `Wrong Password For Username : ${username}`,
            });
          }
        });
      } else {
        res.status(200).json({
          'message': `Can't authorization : ${username}`,
          'hint': 'please try to login and authorized again',
        });
      }
    });
  } catch (err) {
    throw err;
  };
};
// list all posts via mongoose model
exports.allposts = async (req, res, next) => {
  try {
    accounts.find({}, function(err, result) {
      if (err) return next(err);
      console.log(result);
      res.send(result);
    });
  } catch (err) {
    throw err;
  }
};
// edit posts via mongoose model req.params.id
exports.editposts = async (req, res, next) => {
  try {
    const sess = req.session;
    const username = sess.username;
    const password = sess.password;
    auth.findOne({username: username}, function(err, user) {
      if (err) throw err;
      if (user) {
        user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            const postobj = {
              'username': req.body.username,
              'content': req.body.content,
              'cardName': req.body.cardName,
              'cardStatus': req.body.cardStatus,
              'cardContent': req.body.cardContent,
              'cardCategory': req.body.cardCategory,
            };
            accounts.findOneAndUpdate({
              _id: req.params.id,
              username: username,
            }, postobj, function(err, user) {
              if (err) console.log(err);
              console.log('Successful edit');
              res.status(200).json({
                'message': `Complete edit post id : ${req.params.id}`,
              });
            });
          } else {
            console.log('Password incorrect : '+password, isMatch);
            res.status(401).json({
              'message': `Wrong Password For Username : ${username}`,
            });
          }
        });
      } else {
        res.status(200).json({
          'message': `Can't authorization : ${username}`,
          'hint': 'please try to login and authorized again',
        });
      }
    });
  } catch (err) {
    throw err;
  };
};
// delete post via mongoose model req.params.id
exports.deleteposts = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  try {
    const sess = req.session;
    const username = sess.username;
    const password = sess.password;
    auth.findOne({username: username}, function(err, user) {
      if (err) throw err;
      if (user) {
        user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            accounts.deleteOne({
              _id: req.params.id,
              username: username,
            }, function(err, user) {
              if (err) console.log(err);
              console.log('Successful deletion');
              res.status(200).json({
                'message': `Complete delete post id : ${req.params.id}`,
              });
            });
          } else {
            res.status(401).json({
              'message': `Wrong Password For Username : ${username}`,
            });
          }
        });
      } else {
        res.status(200).json({
          'message': `Can't authorization : ${username}`,
          'hint': 'please try to login and authorized again',
        });
      }
    });
  } catch (err) {
    throw err;
  };
};
