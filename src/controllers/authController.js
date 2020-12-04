/* eslint-disable max-len */
'use strict';
const auth = require('../models/auth.model');
const generator = require('generate-password');
exports.auth = async (req, res, next) =>{
  try {
    const {username, password} = req.body;
    user = auth.findOnePromise({username: username});
    {
      return new Promise((resolve, reject)=>{
        if (reject) throw err;
        if (user) {
          resolve(
          user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              const sess = req.session;
              sess.username = username;
              sess.password = password;
              console.log('Password correct :' + password, isMatch);
              res.status(200).json({'message': `Correct Password For Username : ${req.body.username}`});
            } else {
              console.log('Password incorrect : '+password, isMatch);
              res.status(401).json({'message': `Wrong Password For Username : ${req.body.username}`});
            }
          })
          );
        } else {
          const genPassword = generator.generate({
            length: 10,
            numbers: true,
          });
          auth.create({username: username, password: genPassword}, function(err, result) {
            if (err) return next(err);
            console.log(result);
            console.log(genPassword);
            res.status(200).json({
              'message': `Created new account : ${req.body.username}`,
              'password': genPassword,
            });
          });
        }
      });
    };
  } catch (err) {
    throw err;
  };
};
