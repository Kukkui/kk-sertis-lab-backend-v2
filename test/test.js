/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const expect = require('chai').expect;
const proxyquire =require('proxyquire').noCallThru();
const sinon = require('sinon');
const app = require('../src/app').app;
const request = require('supertest');
const assert = require('chai').assert;


describe.only('authController test', () => {
  let req; let res; let next; let auth; let generator;

  beforeEach(() => {
    req = {};
    res = sinon.stub();
    next = sinon.spy();
    auth = {
      findOne: sinon.stub(),
      create: sinon.stub(),
    };
    generator = {
      generate: sinon.stub(),
    };

    mocks = proxyquire('../src/controllers/authController', {
      '../models/auth.model': auth,
      'generate-password': generator,
    });
  });

  it('Test', () => {
    console.log(auth.findOne);
  });
});
