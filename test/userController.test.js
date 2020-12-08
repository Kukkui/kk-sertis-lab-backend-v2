/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const {deleteOne} = require('../src/models/auth.model');
describe('userController: BLOGPOST tests', () => {
  let authMock; let accountsMock; let postioMock;
  let comparePasswordStub;
  let userController;
  let user; let req; let res; let next; let post; let jsonStub;
  let initUserController;
  let result;
  let showResult;

  beforeEach(() => {
    post = 'res.send.done';
    showResult = {message: 'hiResult'};
    authMock = {
      findOne: sinon.stub(),
    };
    postioMock = {
      sessionx: sinon.stub(),
      usernameCheck: sinon.stub().returns(true),
      viewModeResult: sinon.stub(),
      editModeResult: sinon.stub(),
      addModeResult: sinon.stub(),
      deleteModeResult: sinon.stub(),
      finalResultFromMode: sinon.stub().returns(showResult),
    };
    jsonStub = {message: 'json_test'},
    accountsMock = {
      create: sinon.stub(),
      find: sinon.stub(),
      findOneAndUpdate: sinon.stub(),
      deleteOne: sinon.stub(),
    };
    user = {
      comparePassword: sinon.stub(),
    };
    req = {
      body: {},
    };
    res = {
      send: sinon.stub().returns(post),
      status: sinon.stub(),
      json: sinon.stub().returns(jsonStub),
    };
    next = {};
    initUserController = () => {
      userController = proxyquire('../src/controllers/userController', {
        '../models/auth.model': authMock,
        '../models/user.model': accountsMock,
        '../models/postio.model': postioMock,
      });
    };
    initUserController();
  });
  afterEach(() => userController = {});

  describe('myposts()', () => {
    it('should call myposts() if the account is Authorized', async () => {
      // let result, error,usernamepassword,user,isMatch;
      req.body={
        username: 'test',
        password: 'test',
      };
      userController.myposts(req, res, next);
      const one = postioMock.sessionx.yields(req, res, next);
      const username = one.args[0][0].body.username;
      const password = one.args[0][0].body.password;
      const user = await authMock.findOne.returns({
        username: 'test', password: 'test',
      });
      console.log(user.args[0]);
      const two = await authMock.findOne.yields(user);
      postioMock.usernameCheck.yields(true, req, res, next);
      const testResult = postioMock.finalResultFromMode.yields(true, 'view', req, res, next);
      assert.equal(testResult, showResult);
    });
  });

  describe('addpost()', () => {
    it('should call addposts() if the account is Authorized', () => {
      req.body={
        username: 'test2',
        password: 'test2',
      };
      userController.addposts(req, res, next);
      authMock.findOne.yields(null, user);
      user.comparePassword(null, true);
      accountsMock.create.yields(null, result);
      assert.deepEqual(authMock.findOne.getCall(0).args[0], {username: 'test2'});
      assert.deepEqual(res.send(result), 'res.send.done');
    });

    it('Test', async () => {
      const mode = 'add';
      postioMock.sessionx.returns(['user', 'pass']);
      await authMock.findOne.returns({user: 'user'});

      await userController.addposts(req, res, next);
      assert.deepEqual(postioMock.sessionx.args[0], req);
    });
  });

  describe('allpost()', () => {
    it('should call allposts() if the account is Authorized', () => {
      userController.allposts(req, res, next);
      accountsMock.find.yields(null, result);
      assert.deepEqual(res.send(result), 'res.send.done');
    });
  });

  describe('editposts()', () => {
    it('should call editposts() if the account is Authorized', () => {
      req.body={
        username: 'test3',
        password: 'test3',
        content: 'req.body.content',
        cardName: 'req.body.cardName',
        cardStatus: 'req.body.cardStatus',
        cardContent: 'req.body.cardContent',
        cardCategory: 'req.body.cardCategory',
      };
      userController.editposts(req, res, next);
      authMock.findOne.yields(null, user);
      user.comparePassword(null, true);
      accountsMock.findOneAndUpdate.yields(null, result);
      assert.deepEqual(authMock.findOne.getCall(0).args[0], {username: 'test3'});

      // How to stub .JSON for...
      // res.status(200).json({
      //   'message': `Complete edit post id : ${req.params.id}`,
      // });
      assert.deepEqual(res.send(result), 'res.send.done');
    });
  });

  describe('deleteposts()', () => {
    it('should call deleteposts() if the account is Authorized', () => {
      req.body={
        username: 'test4',
        password: 'test4',
      };
      req.params = {
        id: 1,
      };
      userController.deleteposts(req, res);
      authMock.findOne.yields(null, user);
      user.comparePassword(null, true);
      accountsMock.deleteOne(null, user);
      // How to stub .JSON for...
      // res.status(200).json({
      //   'message': `Complete delete post id : ${req.params.id}`,
      // });
      assert.deepEqual(res.send(result), 'res.send.done');
    });
  });
});
