const jwt = require("../common-jwt-mod");
const makeApp = require("./app.js");
const database = require("./database.js");

const app = makeApp(database,jwt);
app.listen(4000, () => {
    database.init();
    console.log("listening on port 4000");
});