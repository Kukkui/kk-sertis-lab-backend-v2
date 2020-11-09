/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
'use strict';
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const blogposts = new mongoose.Schema({
  username: String,
  content: String,
  cardName: String,
  cardStatus: String,
  cardContent: String,
  cardCategory: String,
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
blogposts.pre('save', async function(next) {
  // check the password if it is modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
blogposts.methods.correctPassword = async function(
    typedPassword,
    originalPassword,
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

module.exports = mongoose.model('User', blogposts);
