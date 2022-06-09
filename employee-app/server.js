const express = require('express');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// get MongoDB driver connection
const dbo = require('./db/conn');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/',require('./routes/employee'));

//Openapi Configuration
const options = {
	definition: {
		openapi: '3.0.0',
		info : {
			title: 'Employee API',
			version: '1.0.0'
		},
	},
	apis:['./routes/employee.js'],
};

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});
 
 
module.exports = app;
