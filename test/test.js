
/* eslint-disable no-unused-vars */

/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-var */
'use strict';
const mocha = require('mocha');
const describe = mocha.describe;

const it = mocha.it;
const express = require('express');
const app=express();
const request = require('supertest');
const session = require('express-session');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const {RuleTester} = require('eslint');

// set router routes use,get,post,put,delete
app.use(express.json());
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

describe('/GET index home', function() {
  it('it should GET index home', function(done) {
    request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '31')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
  });
});
