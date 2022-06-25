const express = require('express');
const authJwt = require("../../common-jwt-mod");

module.exports = function(dbo) {

  // recordRoutes is an instance of the express router.
  // We use it to define our routes.
  // The router will be added as a middleware and will take control of requests starting with path /Employees.
  const routes = express.Router();

  /**
   * @openapi
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   *   schemas:
   *     employee:
   *       title: Employee record
   *       required:
   *       - id
   *       - name
   *       type: object
   *       properties:
   *          id:
   *             type: integer
   *          name:
   *             type: string
   */

  /**
   * @openapi
   * /Employees:
   *   get:
   *     description: Get all Employee
   *     responses: 
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               title: List of Employee records
   *               items:
   *                 $ref: '#/components/schemas/employee'
   *            
   *       400:
   *         description: Fail
   *       401:
   *         description: Unauthorized
   *     security:
   *       - bearerAuth: [ ]
   */
   routes.get('/Employees', [authJwt.verifyToken], async function (req, res, next) { 

      const employees = dbo.listAllEmployees();
      // the returning object is a promise
      employees.then((resolve) => {
        res.json(resolve);
      }).catch((error) => {
        res.status(400).send(error.message);
      });  

  });

  /**
   * @openapi
   * /Employees:
   *   post:
   *     description: Create an Employee
   *     requestBody:
   *       description: Request to create an Employee
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/employee'
   *     responses: 
   *       201:
   *         description: Created
   *       404:
   *         description: Not found
   *     security:
   *       - bearerAuth: [ ]
   * 
   */
   routes.post('/Employees', [authJwt.verifyToken, authJwt.isAdmin], async function (req, res) {

    const employee = req.body;
    // the returning object is a promise
    const result = dbo.addOneEmployee(employee);
    result.then((resolve) => {
      // const resultEmployee = resolve.ops[0];
      // res.status(201).json(resultEmployee);
      res.status(201).json(resolve);
    }).catch((error) => {
      res.status(404).send(error.message);
    });

  });

  /**
   * @openapi
   * /Employees/delete/{id}:
   *   parameters:
   *     - in: path
   *       name: id
   *       required: true
   *       schema:
   *         type: integer
   *   delete:
   *     description: Delete an Employee by id
   *     responses: 
   *       204:
   *         description: Deleted 
   *     security:
   *       - bearerAuth: [ ]
   *  
   */
   routes.delete('/Employees/delete/:id',  [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {

    const employeeId = { id : parseInt(req.params.id) };
    // the returning object is a promise
    const result = dbo.deleteEmployeeById(employeeId);
    result.then((resolve) => {
      console.log(resolve);
      res.status(204).send();
    }).catch((error) => {
      res.status(404).send(error.message);
    });
    
  });


  return routes;

}
