/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
'use strict';
const auth = require('../models/auth.model');
const generator = require('generate-password');
// Promise lab playground
exports.auth = async (req, res, next) =>{
  try {
    const {username, password} = req.body;
    const user = await auth.findOne({username: username});
    if (user) {
      return (await checkpassword(user, req, res, next));
    } else {
      createNewAccount(req, res);
    }
  } catch (err) {
    throw err;
  };
};

const checkpassword = async function(user, req, res, next) {
  try {
    user.comparePassword(req.body.password).then((isMatch)=>{
      showresponse(isMatch, req, res, next);
    }).catch((e)=>{
      console.log(e);
    });
  } catch (error) {
    console.log(error);
  }
};


const createNewAccount = async function(req, res) {
  try {
    const genPassword = generator.generate({length: 10, numbers: true});
    const username = req.body.username;
    const result = auth.create({username: username, password: genPassword});
    console.log(result);
    res.status(200).json({
      'message': `Created new account : ${req.body.username}`,
      'password': genPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

const showresponse = async function(isMatch, req, res, next) {
  try {
    if (isMatch) {
      const sess = req.session;
      sess.username = req.body.username;
      sess.password = req.body.password;
      console.log('Password correct :' + req.body.password, isMatch);
      res.status(200).json({'message': `Correct Password For Username : ${req.body.username}`});
    } else {
      console.log('Password incorrect : '+req.body.password, isMatch);
      res.status(401).json({'message': `Wrong Password For Username : ${req.body.username}`});
    }
  } catch (error) {
    console.log(error);
  }
};
