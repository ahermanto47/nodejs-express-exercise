const makeApp = require('./app.js');
const database = require('./database.js');

const app = makeApp(database);
app.listen(8080, () => console.log("listening on port 8080"));