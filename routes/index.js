/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-var */
'use strict';
const express = require('express');
const routes = require('express').Router();
const session = require('express-session');
const db = require('./../db/dbconnect');
const generator = require('generate-password');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const {RuleTester} = require('eslint');

routes.use(express.json());
routes.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));


routes.get('/', (req, res) => {
  res.json({'message': 'Kukkui Sertis Lab'});
});
routes.post('/auth', authController.auth);
routes.get('/posts/me', userController.myposts);
routes.post('/posts/new', userController.addposts);
routes.get('/posts/all', userController.allposts);
routes.put('/posts/edit/:id', userController.editposts);
routes.delete('/posts/delete/:id', userController.deleteposts);


module.exports = routes;
