const { expect } = require('expect');
const { jest } = require('@jest/globals');
const { describe } = require('@jest/globals');
const { test } = require('@jest/globals');
const { MongoClient } = require("mongodb");
const mongoCommon = require("../index");

describe('Common mongodb module', () => {
    describe('Function connect', () => {
      test('Given connectString function should invoke MongoClient connect function', async () => {
        const connectSpy = jest.spyOn(MongoClient, 'connect').mockReturnValueOnce({});
        const actual = await mongoCommon.connect('mongodb://localhost:27017');
        expect(actual).toEqual({});
        expect(connectSpy).toBeCalledWith('mongodb://localhost:27017', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      });
    });
});