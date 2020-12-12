/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
'use strict';
const auth = require('../models/auth.model');
const authfn = require('../helper/auth.helper');
const generator = require('generate-password');
// Promise lab playground
exports.auth = async (req, res, err) => {
  const sess = req.session;
  const uu = req.body.username;
  const pp = req.body.password;
  try {
    const founduser = await auth.findOne({username: uu});
    console.log(founduser);
    if (founduser) {
      const a = await authfn._checkpassword(founduser, uu, pp);
      const b = await authfn._setsession(sess, uu, pp);
      console.log('next is aaaaaaaaaaaaaaaaaaaaaa');
      console.log(a);
      console.log(b);

      return res.send(a);
    }authfn._createNewAccount(uu);
  } catch (err) {
    return res.send('JOB_ERROR');
  }
};
