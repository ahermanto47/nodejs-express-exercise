const request = require('supertest');
const makeApp = require('./app.js');

describe("POST /users/signup", () => {

    describe("given a username and password", () => {
        test("should pass the username and password to the database createUser function", async () => {
            const body = { username: "user1", password: "password1"};
            await request(app).post("/users/signup").send(body);
            expect(createUser).toHaveBeenCalled();
        })
    })

});