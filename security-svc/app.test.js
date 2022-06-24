const request = require("supertest");
const {jest} = require("@jest/globals")
const {describe} = require("@jest/globals")
const {test} = require("@jest/globals");
const {expect} = require("expect");
const makeApp = require("./app.js");

const createUser = jest.fn();

const app = makeApp(
    {
        createUser
    }
);

describe("POST /users/signup", () => {

    describe("given a username, password, and email", () => {
        test("should pass user data to database createUser function", async () => {
            const body = { username: "user1", password: "password1", email: "test@dev.com"};
            await request(app).post("/users/signup").send(body);
            expect(createUser).toHaveBeenCalled();
            expect(createUser.mock.calls.length).toBe(1);
            expect(createUser.mock.calls[0][0]).toBe(body.username);
            expect(createUser.mock.calls[0][1]).toBe(body.password);
            expect(createUser.mock.calls[0][2]).toBe(body.email);
        })
    })

});