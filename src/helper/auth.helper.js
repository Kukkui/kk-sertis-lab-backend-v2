/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
'use strict';
const auth = require('../models/auth.model');
// Async/Await lab playground
// Sub functions listed here...
const _checkpassword = async function(founduser, user, pass) {
  try {
    const checkMatch = await founduser.comparePassword(pass);
    if (checkMatch) {
      return await _showresponse(checkMatch, user, pass);
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const _createNewAccount = function(username) {
  try {
    const password = generator.generate({length: 10, numbers: true});
    auth.create({username, password});
    console.log({
      message: `Created new account : ${username}`,
      password,
    });

    return true;
  } catch (error) {
    throw error;
  }
};

const _setsession = async function(sess, setUser, setPass) {
  try {
    sess.username = setUser;
    sess.password = setPass;
    return true;
  } catch (error) {
    throw error;
  }
};
const _showresponse = async function(isMatch, username, password) {
  try {
    if (isMatch) {
      console.log('Password correct :' + password, isMatch);
      return ({
        message: `Correct Password For Username : ${username}`,
      });
    }
    console.log('Password incorrect : ' + password, isMatch);
    return ({
      message: `Wrong Password For Username : ${username}`,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  '_checkpassword': _checkpassword,
  '_createNewAccount': _createNewAccount,
  '_setsession': _setsession,
  '_showresponse': _showresponse,
};
