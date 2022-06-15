const request = require('supertest');

// the code we are testing
const makeApp = require('../server.js');

// dependent objects required
const makeRoutes = require('../routes/employee');
const apiPath = './routes/employee.js';

// mock dbo functions
const connectToServer = jest.fn();
const getDb = jest.fn();
const listAllEmployees = jest.fn();
const addOneEmployee = jest.fn();
const deleteEmployeeById = jest.fn();

// create our app
const routes = makeRoutes({
    connectToServer,
    getDb,
    listAllEmployees,
    addOneEmployee,
    deleteEmployeeById
});

const app = makeApp(routes,apiPath);

describe("Employees endpoint /Employees", () => {
    
    describe("Given api server up", () => {
        
        beforeEach(() => {
            listAllEmployees.mockReset();
        });

        test('GET /Employees should responds with 200 code', async () => {
            listAllEmployees.mockResolvedValue([]);
            const response = await request(app).get('/Employees');
            expect(response.statusCode).toBe(200);
        });

        test('GET /Employees response should have a json array', async () => {
            const expectedBody = [{"id": 1, "name": "John"}];
            listAllEmployees.mockResolvedValue(expectedBody);
            const response = await request(app).get('/Employees');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.arrayContaining(expectedBody));
        });
        
        test('GET /Employees should responds with 400 code when dbo.listAllEmployees throws an error', async () => {
            const expectedErrorText = "mock error";
            listAllEmployees.mockRejectedValue(new Error(expectedErrorText));
            const response = await request(app).get('/Employees');
            expect(response.statusCode).toBe(400);
            expect(response.error.text).toEqual(expectedErrorText);
        });
        
    });

});