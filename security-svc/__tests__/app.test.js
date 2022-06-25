const request = require("supertest");
const {jest} = require("@jest/globals")
const {describe} = require("@jest/globals")
const {test} = require("@jest/globals");
const {beforeEach} = require("@jest/globals");
const {afterEach} = require("@jest/globals");
const {expect} = require("expect");
const makeApp = require("../app.js");

// mock databas functions
const init = jest.fn();
const createUser = jest.fn();
const findUser = jest.fn();

// mock jwt functions
const isAdmin = jest.fn();
const generateToken = jest.fn();
const verifyToken = jest.fn();

const makeRoute = require("../routes/users");

const routes = makeRoute(    
    {
        init,
        createUser,
        findUser
    },
    {
        isAdmin,
        generateToken,
        verifyToken
    }
);

const app = makeApp(routes);

describe("POST /users/signup", () => {

    describe("given a username, password, email, and roles", () => {

        beforeEach(() => {
            createUser.mockReset();
        });

        test("should pass user data to database createUser function", async () => {
            const body = { username: "user1", password: "password1", email: "test@dev.com", roles: ["USER"]};
            createUser.mockResolvedValue({});
            const response = await request(app).post("/users/signup").send(body);
            expect(response.statusCode).toBe(200);
            expect(createUser).toHaveBeenCalled();
            expect(createUser.mock.calls.length).toBe(1);
            expect(createUser.mock.calls[0][0]).toStrictEqual(body);
        });

        test("response body should get same json passed in the request body", async () => {
            const body = { username: "user1", password: "password1", email: "test@dev.com", roles: ["USER"]};
            createUser.mockResolvedValue(body);
            const response = await request(app).post("/users/signup").send(body);
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual(body);
        });

        test("when there are some issues in createUser should respond with 400", async () => {
            const expectedErrorText = "mock error";
            const body = { username: "user1", password: "password1", email: "test@dev.com", roles: ["USER"]};
            createUser.mockRejectedValue(new Error(expectedErrorText));
            const response = await request(app).post("/users/signup").send(body);
            expect(response.statusCode).toBe(400);
        });
    });
});

describe("POST /users/signin", () => {

    describe("given body has a username and a password", () => {
        beforeEach(() => {
            findUser.mockReset();
            generateToken.mockReset();
        });

        test("should call findUser", async () => {
            const body = { username: "user1", password: "password1"};
            findUser.mockResolvedValue(body);
            generateToken.mockResolvedValue("test-token");
            const response = await request(app).post("/users/signin").send(body);
            expect(response.statusCode).toBe(200);
            expect(generateToken).toHaveBeenCalled();
        });
    
        test("when user found should call generateToken", async () => {
            const body = { username: "user1", password: "password1"};
            findUser.mockResolvedValue(body);
            generateToken.mockResolvedValue("test-token");
            const response = await request(app).post("/users/signin").send(body);
            expect(response.statusCode).toBe(200);
            expect(generateToken).toHaveBeenCalled();
        });

        test("when user not found responds with 401 code", async () => {
            const body = { username: "user1", password: "password1"};
            findUser.mockResolvedValue(null);
            generateToken.mockResolvedValue("test-token");
            const response = await request(app).post("/users/signin").send(body);
            expect(response.statusCode).toBe(401);
        });

        test("when there are some issues calling findUser then response should be 400", async () => {
            const expectedErrorText = "mock error";
            const body = { username: "user1", password: "password1"};
            findUser.mockRejectedValue(new Error(expectedErrorText));
            generateToken.mockResolvedValue("test-token");
            const response = await request(app).post("/users/signin").send(body);
            expect(response.statusCode).toBe(400);
        });
    });
});