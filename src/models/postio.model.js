/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
'use strict';
const {deleteModel} = require('mongoose');
const auth = require('../models/auth.model');
const accounts = require('../models/user.model');
// Async/Await lab playground
// Sub functions listed here...

const sessionx = function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  const sess = req.session;
  if (sess.username && sess.password) {
    username = sess.username;
    password = sess.password;
  }
  return [username, password];
};


const usernameCheck = async function(user, req, res, next) {
  try {
    const UsernamePassword = sessionx(req, res, next);
    const [username, password] = UsernamePassword;
    if (user) {
      const isMatch = await user.comparePassword(password);
      return isMatch;
    }
    return false;
  } catch (error) {
    throw error;
  }
};


const viewModeResult = async function(req, res, next) {
  try {
    const UsernamePassword = sessionx(req, res, next);
    const [username, password] = UsernamePassword;
    return await accounts.find({username: username});
  } catch (error) {
    throw error;
  }
};
const editModeResult = async function(req, res, next) {
  try {
    const UsernamePassword = sessionx(req, res, next);
    const [username, password] = UsernamePassword;
    const obj = {
      username: req.body.username,
      content: req.body.content,
      cardName: req.body.cardName,
      cardStatus: req.body.cardStatus,
      cardContent: req.body.cardContent,
      cardCategory: req.body.cardCategory,
    };
    const result = await accounts.findOneAndUpdate(
        {
          _id: req.params.id,
          username: username,
        },
        obj,
    );
    console.log('Successful edit');
    return ({message: `Complete edit post id : ${req.params.id}`});
  } catch (error) {
    throw error;
  }
};
const addModeResult = async function(req, res, next) {
  try {
    const UsernamePassword = sessionx(req, res, next);
    const [username, password] = UsernamePassword;
    const postobj = {
      username: req.body.username,
      content: req.body.content,
      cardName: req.body.cardName,
      cardStatus: req.body.cardStatus,
      cardContent: req.body.cardContent,
      cardCategory: req.body.cardCategory,
    };
    const result = await accounts.create(postobj);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteModeResult = async function(req, res, next) {
  try {
    const UsernamePassword = sessionx(req, res, next);
    const [username, password] = UsernamePassword;
    accounts.deleteOne(
        {
          _id: req.params.id,
          username: username,
        },
        function(err, user) {
          if (err) console.log(err);
        },
    );
    console.log('Succesful delete');
    return ({message: `Complete delete post id : ${req.params.id}`});
  } catch (error) {
    throw error;
  }
};
const finalResultFromMode = async function(isMatch, mode, req, res, next) {
  try {
    const UsernamePassword = sessionx(req, res, next);
    const [username, password] = UsernamePassword;
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


