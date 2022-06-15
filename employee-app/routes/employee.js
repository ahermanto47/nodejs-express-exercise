const express = require('express');

module.exports = function(dbo) {

  // recordRoutes is an instance of the express router.
  // We use it to define our routes.
  // The router will be added as a middleware and will take control of requests starting with path /Employees.
  const routes = express.Router();

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
   routes.route('/Employees').get(async function (req, res) {

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
   routes.route('/Employees').post(function (req, res) {

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
   routes.route('/Employees/delete/:id').delete((req, res) => {

    dbo.deleteEmployeeById(req, res);
    
  });


  return routes;

}
