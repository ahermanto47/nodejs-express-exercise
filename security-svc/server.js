const jwt = require("../common-jwt-mod");
const makeApp = require("./app.js");
const database = require("./database.js");
const makeRoute = require("./routes/users");

const routes = makeRoute(database,jwt);
const app = makeApp(routes);

app.listen(4000, () => {
    database.init();
    console.log("listening on port 4000");
});