const { expect } = require('expect');
const { jest } = require('@jest/globals');
const { describe } = require('@jest/globals');
const { test } = require('@jest/globals');
const mongoCommon = require("../../common-mongo-mod");
const database = require("../database");

describe("Database functions", () => {
    describe("Function init", () => {
        test("Given connectString function should invoke MongoCommon connect function", async () => {
            const connectString = "mongodb://localhost:27017";
            const client = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
            const connectSpy = jest.spyOn(mongoCommon, 'connect').mockResolvedValueOnce(client);
            database.init(connectString);
            expect(connectSpy).toBeCalledWith(connectString);
        });

        test('Given connectString function should print error when there is any problem', async () => {
            const connectString = "mongodb://localhost:27017";
            const expectedError = new Error("mock error");
            const connectSpy = jest.spyOn(mongoCommon, 'connect').mockRejectedValue(expectedError);
            database.init(connectString);
            expect(connectSpy).rejects.toEqual(expectedError);
        });
    });
});