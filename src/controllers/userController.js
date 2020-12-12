/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
'use strict';
const {deleteModel} = require('mongoose');
const auth = require('../models/auth.model');
const accounts = require('../models/user.model');
const userfn = require('../helper/user.helper');
// Async/Await lab playground
exports.myposts = async (req, res, next) => {
  try {
    const mode = 'view';
    const [username, password] = await userfn.sessionx();
    const user = await auth.findOne({username: username});
    const isMatched = await userfn.usernameCheck(user);
    const showResult = await userfn.finalResultFromMode(isMatched, mode);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};

exports.addposts = async (req, res, next) => {
  try {
    const mode ='add';
    const [username, password] = userfn.sessionx(req, res, next);
    const user = await auth.findOne({username: username});
    const isMatched = await userfn.usernameCheck(user, req, res, next);
    const showResult = await userfn.finalResultFromMode(isMatched, mode, req, res, next);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};

exports.allposts = async (req, res, next) => {
  try {
    const result = await accounts.find({});
    console.log(result);
    res.send(result);
  } catch (err) {
    throw err;
  }
};
exports.editposts = async (req, res, next) => {
  try {
    const mode = 'edit';
    const UsernamePassword = userfn.sessionx(req, res, next);
    const [username, password] = UsernamePassword;
    const user = await auth.findOne({username: username});
    const isMatched = await userfn.usernameCheck(user, req, res, next);
    const showResult = await userfn.finalResultFromMode(isMatched, mode, req, res, next);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};

exports.deleteposts = async (req, res, next) => {
  try {
    const mode = 'delete';
    const [username, password] = userfn.sessionx();
    const user = await auth.findOne({username: username});
    const isMatched = await userfn.usernameCheck(user);
    const showResult = await userfn.finalResultFromMode(isMatched, mode);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};
