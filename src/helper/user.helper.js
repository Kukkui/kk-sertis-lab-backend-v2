/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
'use strict';
const accounts = require('../models/user.model');
// Async/Await lab playground
// Sub functions listed here...

const sessionx = async function() {
  let username = req.body.username;
  let password = req.body.password;
  const sess = req.session;
  if (sess.username && sess.password) {
    username = sess.username;
    password = sess.password;
  }
  return [username, password];
};


const usernameCheck = async function(user) {
  try {
    const [username, password] = sessionx();
    if (await user.comparePassword(password)) {
      return true;
    } return false;
  } catch (error) {
    throw error;
  }
};


const viewModeResult = async function() {
  try {
    const [username, password] = sessionx();
    return await accounts.find({username});
  } catch (error) {
    throw error;
  }
};
const editModeResult = async function() {
  try {
    console.log('Successful edit');
    return ({message: `Complete edit post id : ${req.params.id}`});
  } catch (error) {
    throw error;
  }
};
const addModeResult = async function(req, res, next) {
  try {
    const result = await accounts.create(req.body);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteModeResult = async function(req, res, next) {
  try {
    const [username, password] = sessionx(req, res, next);
    accounts.deleteOne(
        {
          _id: req.params.id,
          username: username,
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        },
    );
    console.log('Succesful delete');
    return ({message: `Complete delete post id : ${req.params.id}`});
  } catch (error) {
    throw error;
  }
};
const finalResultFromMode = async function(isMatch, mode) {
  try {
    const UsernamePassword = sessionx(req, res, next);
    const [, password] = UsernamePassword;
    if (isMatch && mode=='view') {
      return viewModeResult(req, res, next);
    } else if (isMatch && mode=='add') {
      return addModeResult(req, res, next);
    } else if (isMatch && mode =='edit') {
      return editModeResult(req, res, next);
    } else if (isMatch && mode =='delete') {
      return deleteModeResult(req, res, next);
    }
    console.log(`Wrong isMatch/Password/Mode : ${isMatch}/${password}/${mode}`);
    return {
      message: `Wrong isMatch/Password/Mode : ${isMatch}/${password}/${mode}`,
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  'sessionx': sessionx,
  'usernameCheck': usernameCheck,
  'viewModeResult': viewModeResult,
  'editModeResult': editModeResult,
  'addModeResult': addModeResult,
  'deleteModeResult': deleteModeResult,
  'finalResultFromMode': finalResultFromMode,
};


