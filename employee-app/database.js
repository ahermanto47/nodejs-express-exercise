const mongoCommon = require("../common-mongo-mod");

let dbConnection;

module.exports = {
  init: function(connectionString) {
    const db = mongoCommon.connect(connectionString);
    db.then((resolvedClient) => {
      dbConnection = resolvedClient.db("employees");
      console.log("Successfully connected to MongoDB.");
    }).catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
  },

  listAllEmployees: function() {
    
    return dbConnection
      .collection("employee")
      .find({})
      .limit(50)
      .toArray();
      
  },

  addOneEmployee: function(employee) {

    const newEmployee = {
      id: employee.id,
      name: employee.name,
    };

    return dbConnection
      .collection("employee")
      .insertOne(newEmployee);

  },

  deleteEmployeeById: function(employeeId) {

    return dbConnection
      .collection("employee")
      .deleteOne(employeeId);

  }
};
