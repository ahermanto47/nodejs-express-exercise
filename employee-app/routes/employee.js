const express = require('express');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

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
		
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('employee')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
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
recordRoutes.route('/Employees').post(function (req, res) {
	console.log(req.body);
  const dbConnect = dbo.getDb();
  const matchDocument = {
    id: req.body.id,
    name: req.body.name,
  };

  dbConnect
    .collection('employee')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new employee document with id ${result.insertedId}`);
        res.status(204).send();
      }
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
 *  
 */
 recordRoutes.route('/Employees/delete/:id').delete((req, res) => {

  const dbConnect = dbo.getDb();
  const listingQuery = { id : parseInt(req.params.id) };

  console.log(listingQuery);
  
  dbConnect
    .collection('employee')
    .deleteOne(listingQuery, function (err, result) {
      if (err) {
        res
          .status(404)
          .send(`Error deleting listing with id ${listingQuery.id}!`);
      } else {
        console.log(`Deleted employee count ${result.deletedCount}`);
        res.status(204).send();
      }
    });
});


module.exports = recordRoutes;
