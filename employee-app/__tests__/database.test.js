const { expect } = require('expect');
const { jest } = require('@jest/globals');
const { describe } = require('@jest/globals');
const { test } = require('@jest/globals');
const { beforeAll } = require('@jest/globals');
const { afterEach } = require('@jest/globals');
const { beforeEach } = require('@jest/globals');
const mongoCommon = require("../../common-mongo-mod");
const database = require("../database");

let dbConnectionMock;
let dbCollection;
// let dbFind;
// let dbLimit;
// let dbToArray;

function setupMongoMocks() {
    dbCollection = jest.fn();
    // dbFind = jest.fn();
    // dbLimit = jest.fn();
    // dbToArray = jest.fn();

    dbConnectionMock = {
        collection: dbCollection,
        // find: dbFind,
        // limit: dbLimit,
        // toArray: dbToArray
    }
}

describe("Database functions", () => {
    describe("Function init", () => {
        test("Given connectString function should invoke MongoCommon connect function", async () => {
            const connectString = "mongodb://localhost:27017";
            const client = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
            const connectSpy = jest.spyOn(mongoCommon, "connect").mockResolvedValueOnce(client);
            database.init(connectString);
            expect(connectSpy).toBeCalledWith(connectString);
        });

        test('Given connectString function should print error when there is any problem', async () => {
            const connectString = "mongodb://localhost:27017";
            const expectedError = new Error("mock error");
            const connectSpy = jest.spyOn(mongoCommon, "connect").mockRejectedValue(expectedError);
            database.init(connectString);
            expect(connectSpy).rejects.toEqual(expectedError);
        });
    });

    describe("Function listAllEmployees", () => {
        beforeAll(setupMongoMocks);

        afterEach(() => {
            jest.restoreAllMocks();
        });
        
        beforeEach(() => {
            dbCollection.mockReset();
        });

        test("Should return list of employees", async () => {
            const employeeList = [];

            dbCollection.mockImplementation(() => {
                return employeeList;
            });

            const listAllEmployeesMock = jest.spyOn(database,"listAllEmployees").mockImplementation(function() {
                return dbConnectionMock.collection();
            });
            
            const employees = listAllEmployeesMock();
            expect(employees).toBe(employeeList);
        });
    });

    describe("Function addOneEmployee", () => {
        beforeAll(setupMongoMocks);
        
        afterEach(() => {
            jest.restoreAllMocks();
        });

        beforeEach(() => {
            dbCollection.mockReset();
        });

        test("Should return result", async () => {
            const employee = {id: 0, name: "Cat"};
            const expectedResult = {};

            dbCollection.mockImplementation(() => {
                return expectedResult;
            });

            const addOneEmployeeMock = jest.spyOn(database,"addOneEmployee").mockImplementation(function() {
                return dbConnectionMock.collection();
            });

            const result = addOneEmployeeMock(employee);
            expect(result).toBe(expectedResult);
        });

    });
});