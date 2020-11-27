
/* eslint-disable no-unused-vars */

/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-var */
'use strict';
const mocha = require('mocha');
const describe = mocha.describe;
const bodyParser = require('body-parser');
const it = mocha.it;
const express = require('express');
const app=express();
const request = require('supertest');
const session = require('express-session');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const {RuleTester} = require('eslint');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
// set router routes use,get,post,put,delete
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.get('/', (req, res) => {
  res.json({'message': 'Kukkui Sertis Lab'});
});
app.post('/auth', authController.auth);
app.get('/posts/me', userController.myposts);
app.post('/posts/new', userController.addposts);
app.get('/posts/all', userController.allposts);
app.put('/posts/edit/:id', userController.editposts);
app.delete('/posts/delete/:id', userController.deleteposts);
module.exports = {app};
