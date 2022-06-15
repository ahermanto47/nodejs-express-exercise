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

  listAllEmployees: function() {
    
    return dbConnection
      .collection('employee')
      .find({})
      .limit(50)
      .toArray();
      
  },

  addOneEmployee: function(employee) {

    const matchDocument = {
      id: employee.id,
      name: employee.name,
    };

    return dbConnection
      .collection('employee')
      .insertOne(matchDocument);

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
