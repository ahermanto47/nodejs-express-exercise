const mongoCommon = require("../common-mongo-mod");

let dbConnection;

module.exports = {
  init: function(connectionString) {
    const db = mongoCommon.connect(connectionString);
    db.then((resolvedClient) => {
      dbConnection = resolvedClient.db("employees");
    }).catch((error) => {
      console.log(error.message);
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
