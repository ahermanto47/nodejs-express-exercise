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

  deleteEmployeeById: function(employeeId) {

    return dbConnection
      .collection('employee')
      .deleteOne(employeeId);

    },
};
