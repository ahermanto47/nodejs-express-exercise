const express = require('express');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

module.exports = function(routes, apiPath) {

	const app = express();

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
	
	return app;
}
