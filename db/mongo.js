/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
'use strict';
const mongoose = require('mongoose');
const mysql = require('mysql');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/kukkui';


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
