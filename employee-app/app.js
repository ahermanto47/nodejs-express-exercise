const express = require('express');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require("cors");

module.exports = function(routes, apiPath) {

	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(logger('dev'));
	app.use('/',routes);
	
	//Openapi Configuration
	const options = {
		definition: {
			openapi: '3.0.0',
			info : {
				title: 'Employee API',
				version: '1.0.0'
			},
		},
		apis:[apiPath],
	};
	
	const swaggerDocs = swaggerJSDoc(options);
	app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

	app.get('/api-docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerDocs);
	});
	
	return app;
}
