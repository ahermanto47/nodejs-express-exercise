const jwt = require("jsonwebtoken");
const makeApp = require("./app.js");
const database = require("./database.js");

const app = makeApp(database,jwt);
app.listen(8080, () => {
    database.init();
    console.log("listening on port 8080");
});