
// /* eslint-disable no-unused-vars */

// /* eslint-disable max-len */
// /* eslint-disable new-cap */
// /* eslint-disable no-var */
// 'use strict';
// const mocha = require('mocha');
// const describe = mocha.describe;

// const it = mocha.it;
// const express = require('express');
// const app=express();
// const request = require('supertest');
// const session = require('express-session');
// const authController = require('../src/controllers/authController');
// const userController = require('../src/controllers/userController');
// const {RuleTester} = require('eslint');
// const assert = require('assert');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// // set router routes use,get,post,put,delete
// app.use(express.json());
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.get('/', (req, res) => {
//   res.json({'message': 'Kukkui Sertis Lab'});
// });
// app.post('/auth', authController.auth);
// app.get('/posts/me', userController.myposts);
// app.post('/posts/new', userController.addposts);
// app.get('/posts/all', userController.allposts);
// app.put('/posts/edit/:id', userController.editposts);
// app.delete('/posts/delete/:id', userController.deleteposts);


// describe('blogpost-app-test-CRUD', function() {
//   describe('/GET index home', function() {
//     it('it should GET index home', (done) => {
//       request(app)
//           .get('/')
//           .expect('Content-Type', /json/)
//           .expect('Content-Length', '31')
//           .expect(200)
//           .end((err, res) => {
//             if (err) return done(err);
//             done();
//           });
//     });
//   });
//   describe('POST /login', function() {
//     it('responds with json', (done) => {
//       request(app)
//           .post('/auth')
//           .send({username: 'kukkui', password: 'kukkui'}
//               .set('Accept', 'application/json'))
//           .expect('Content-Type', /json/)
//           .expect(200)
//           .end(function(err, res) {
//             if (err) return done(err);
//             console.log(res);
//             done();
//           });
//     });
//   });

//   describe('show all posts', function(res) {
//     it('should fetch all posts from all posts listed in Mongoose', (done)=>{
//       request(app)
//           .get('/posts/all')
//           .expect('Content-Type', /json/)
//           .expect(200)
//           .end((err, res) => {
//             if (err) return done(err);
//             done();
//           });
//     });
//   });
// });
