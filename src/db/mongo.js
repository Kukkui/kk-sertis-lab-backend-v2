/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
'use strict';
const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please fill your name'],
  },
  password: {
    type: String,
    required: [true, 'Please fill your password'],
    minLength: 6,
    select: false,

  },
});
const auth = mongoose.model('auth', authSchema);
module.exports = {
  auth: auth,
};
