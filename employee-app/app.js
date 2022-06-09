const express = require('express');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// get MongoDB driver connection
const dbo = require('./db/conn');
const app = express();

app.use(logger('dev'));

//Swagger Configuration
//const swaggerOptions = {
//    swaggerDefinition: {
//        info: {
//            title:'Employee API',
//            version:'1.0.0'
//        }
//    },
//    apis:['app.js'],
//}
//
//const swaggerDocs = swaggerJSDoc(swaggerOptions);

//Openapi Configuration
const options = {
	definition: {
		openapi: '3.0.0',
		info : {
			title: 'Employee API',
			version: '1.0.0'
		},
	},
	apis:['app.js'],
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
 
/**
 * @swagger
 * /Employees:
 *   get:
 *     description: Get all Employee
 *     responses: 
 *       200:
 *         description: Success 
 *  
 */
app.get('/Employees',(req,res)=>{
    res.send([
        {
            id:1, Name:'Jk'
        },
        {
            id:2,Name:'Jay'
        }
    ])
});

/**
 * @swagger
 * /Employees:
 *   post:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: Create an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses: 
 *       201:
 *         description: Created 
 *  
 */
 app.post('/Employees',(req,res)=>{
   res.status(201).send();
});
/**
 * @swagger
 * /Employees:
 *   put:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: Create an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses: 
 *       201:
 *         description: Created 
 *  
 */
 app.put('/Employees',(req,res)=>{
    res.status(201).send();
 });
 /**
 * @swagger
 * /Employees:
 *   delete:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: Create an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses: 
 *       201:
 *         description: Created 
 *  
 */
  app.delete('/Employees',(req,res)=>{
    res.status(201).send();
 })
 
module.exports = app;
