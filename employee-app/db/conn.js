const { MongoClient } = require('mongodb');
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('employees');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },

  listAllEmployees: function(res) {
    
    dbConnection
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

  },

  addOneEmployee: function(req, res) {

    console.log(req.body);
    
    const matchDocument = {
      id: req.body.id,
      name: req.body.name,
    };

    dbConnection
      .collection('employee')
      .insertOne(matchDocument, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting matches!');
        } else {
          console.log(`Added a new employee document with id ${result.insertedId}`);
          res.status(204).send();
        }
      });

    },

  deleteEmployeeById: function(req, res) {

    const listingQuery = { id : parseInt(req.params.id) };

    console.log(listingQuery);
    
    dbConnection
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

    },
};
