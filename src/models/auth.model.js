/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const accounts = new mongoose.Schema({
  username: String,
  password: String,
});
// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
accounts.pre('save', async function(next) {
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
accounts.methods.comparePassword = async function(candidatePassword) {
  return new Promise(async (resolve, reject) => {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    resolve(isMatch);
  });
};

// This is Instance Method that available on all documents
// in a certain collection
accounts.methods.correctPassword = async function(
    typedPassword,
    originalPassword,
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};
module.exports = mongoose.model('Auth', accounts);
