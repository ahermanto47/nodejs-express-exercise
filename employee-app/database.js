const mongoCommon = require("../common-mongo-mod");

let dbConnection;

module.exports = {

  init: function() {
    mongoCommon.connectToServer("employees",function(){
        dbConnection = mongoCommon.getDb();
    });
  },


  listAllEmployees: function() {
    
    return dbConnection
      .collection('employee')
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
      .collection('employee')
      .insertOne(newEmployee);

  },

  deleteEmployeeById: function(employeeId) {

    return dbConnection
      .collection('employee')
      .deleteOne(employeeId);

    },
};
