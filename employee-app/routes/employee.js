const express = require('express');

module.exports = function(dbo) {

  // recordRoutes is an instance of the express router.
  // We use it to define our routes.
  // The router will be added as a middleware and will take control of requests starting with path /Employees.
  const recordRoutes = express.Router();

  /**
   * @openapi
   * /Employees:
   *   get:
   *     description: Get all Employee
   *     responses: 
   *       200:
   *         description: Success 
   *  
   */
  recordRoutes.route('/Employees').get(async function (req, res) {

    dbo.listAllEmployees(res);

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
   *             employee:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *     responses: 
   *       201:
   *         description: Created 
   *  
   */
  recordRoutes.route('/Employees').post(function (req, res) {

    dbo.addOneEmployee(req, res);

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
   *  
   */
  recordRoutes.route('/Employees/delete/:id').delete((req, res) => {

    dbo.deleteEmployeeById(req, res);
    
  });


  return recordRoutes;

}
