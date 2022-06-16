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

describe("GET /Employees", () => {
    
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
        
        test('GET /Employees should responds with 400 code when there is an error', async () => {
            const expectedErrorText = "mock error";
            listAllEmployees.mockRejectedValue(new Error(expectedErrorText));
            const response = await request(app).get('/Employees');
            expect(response.statusCode).toBe(400);
            expect(response.error.text).toEqual(expectedErrorText);
        });
        
    });

});

describe("POST /Employees", () => {

    describe("Given api server up", () => {
        
        beforeEach(() => {
            addOneEmployee.mockReset();
        });

        test('POST /Employees should responds with 201 code', async () => {
            const bodyData = [
                { id: 1, name: "name1" },
                { id: 2, name: "name2" },
                { id: 3, name: "name3" }
            ];

            for (const body of bodyData) {
                addOneEmployee.mockResolvedValue({ ops: [{ id: body.id }] });
                const response = await request(app).post('/Employees').send(body);
                expect(response.statusCode).toBe(201);
                expect(response.body.id).toBe(body.id);
            }
        });

        test('POST /Employees should responds with 404 code when there is an error', async () => {
            const expectedErrorText = "mock error";
            addOneEmployee.mockRejectedValue(new Error(expectedErrorText));
            const response = await request(app).post('/Employees').send({
                id: 1, name: "name1"
            });
            expect(response.statusCode).toBe(404);
            expect(response.error.text).toEqual(expectedErrorText);
        });
        
    });
});

describe("DELETE /Employees/delete/:id", () => {

    describe("Given api server up", () => {
        
        beforeEach(() => {
            deleteEmployeeById.mockReset();
        });

        test('DELETE /Employees should responds with 204 code', async () => {
            const employeeId = 1;
            deleteEmployeeById.mockResolvedValue({ id: employeeId });
            const response = await request(app).delete('/Employees/delete/'+employeeId);
            expect(response.statusCode).toBe(204);
        });

        test('DELETE /Employees should responds with 404 code when there is an error', async () => {
            const employeeId = 1;
            const expectedErrorText = "mock error";
            deleteEmployeeById.mockRejectedValue(new Error(expectedErrorText));
            const response = await request(app).delete('/Employees/delete/'+employeeId);
            expect(response.statusCode).toBe(404);
            expect(response.error.text).toEqual(expectedErrorText);
        });
        
    });
});