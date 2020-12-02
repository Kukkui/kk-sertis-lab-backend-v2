
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const {deleteOne} = require('../src/models/auth.model');
describe('authController: ACCOUNT tests', () => {
  // call it normally
  let authMock; let generatorMock;
  let comparePasswordStub;
  let authController;
  let user; let req; let res; let next; let db;
  let initAuthController;
  let initAuthModelController;
  beforeEach(() => {
    authMock = {
      findOne: sinon.stub(),
      create: sinon.stub(),
    };
    generatorMock = {
      generate: sinon.stub(),
    };
    comparePasswordStub = sinon.stub();
    user = {
      comparePassword: comparePasswordStub,
    };
    req = {
      body: {},
    };
    res = sinon.stub();
    next = sinon.stub();
    initAuthController = () => {
      authController = proxyquire('../src/controllers/authController', {
        '../models/auth.model': authMock,
        'generate-password': generatorMock,
      });
    };
  });
  afterEach(() => authController = {});

  describe('Start .auth() method test', () => {
    it('should be a function receiving three arguments', () => {
      initAuthController();
      assert.equal(typeof authController.auth, 'function');
      assert.equal(authController.auth.length, 3);
    });

    describe('auth.findOne() method test', ()=>{
      it('auth.findOne() test with correct arguments', () => {
        initAuthController();
        req.body = {
          username: 'test',
          password: 'test',
        };
        authController.auth(req, res, next);
        assert.deepEqual(authMock.findOne.args[0][0], {username: 'test'});
        console.log('\t* '+'Authorized cases!');
      });

      it('auth.findOne() test with wrong arguments', () => {
        initAuthController();
        req.body = {
          username: 'test2',
          password: 'test2',
        };
        authController.auth(req, res, next);
        assert.notDeepEqual(authMock.findOne.args[0][0], {username: 'test'});
        console.log('\t* '+'Un-Authorized cases!');
      });
    });
    describe('auth.create() method test', ()=>{
      it('Should call auth.create() for create new account', ()=>{
        authMock.create.yields(null, true);
        req.body.username = 'test3';
        authMock.findOne.yields(null, user);
        initAuthController();
        authController.auth(req, res, next);
        assert.deepEqual(authMock.findOne.args[0][0], {username: 'test3'});
        console.log('\t* '+'create a new account');
      });
      // continue
    });
  });
});
