/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const {deleteOne} = require('../src/models/auth.model');
const authx = require('../src/controllers/authController');
describe('authController: ACCOUNT tests', () => {
  let sandbox = null;

  // call it normally
  let authMock;
  let generatorMock;
  let _setsession;
  let comparePasswordStub;
  let _createNewAccountStub;
  let _checkpasswordStub;
  let _showresponseStub;
  let authController;
  let initAuthController;
  let foundUserStub;
  let founduser;
  let authfnMock;
  let user; let req; let res; let next; let err;
  beforeEach(() => {
    authMock = {
      findOne: sinon.stub(),
      create: sinon.stub(),
    };
    generatorMock = {generate: sinon.stub()};
    comparePasswordStub = sinon.stub();
    authfnMock={
      _checkpassword: sinon.stub(),
      _createNewAccount: sinon.stub(),
      _showresponse: sinon.stub(),
      _setsession: sinon.stub(),
    };
    user = {
      comparePassword: comparePasswordStub,
    };
    req = {
      body: {},
      session: {},
    };
    res = {
      send: sinon.stub().returns('HI'),
    };
    err = null;
    // Proxyquire here...
    initAuthController = () => {
      authController = proxyquire(
          '../src/controllers/authController',
          {
            '../models/auth.model': authMock,
            '../helper/auth.helper': authfnMock,
            'generate-password': generatorMock,
          });
    };
    sandbox = sinon.createSandbox();
  });

  // After each here...
  afterEach(() => {
    sandbox.restore();
  });

  describe('Start .auth() method test', () => {
    it('should be a function receiving three arguments', () => {
      initAuthController();
      assert.equal(typeof authController.auth, 'function');
      // assert.equal(authController.auth.length, 3);
    });

    describe('.auth() method test', ()=>{
      it('.auth() function', async () => {
        initAuthController();
        req.body = {
          _id: 0,
          username: 'test',
          password: 'test',
          __v: 0,
        };
        await authMock.findOne.resolves({
          _id: 0,
          username: 'test',
          password: 'test',
          __v: 0,
        });
        await authfnMock._showresponse.resolves('pass');
        await authfnMock._checkpassword.resolves('passAuth');
        await authfnMock._setsession.resolves(true);
        const aaa = await authController.auth(req, res, err);
        console.log('hello hihihihihi');
        console.log('HIHI', aaa);
        assert.deepEqual(await authController.auth(req, res, err), ('HI'));
      });

      // continue
    });
  });
});
