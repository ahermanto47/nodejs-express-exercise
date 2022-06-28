const mongoCommon = require("../common-mongo-mod");

let dbConnection;

module.exports = {

    init: function(connectionString) {
        const db = mongoCommon.connect(connectionString);
        db.then((resolvedClient) => {
          dbConnection = resolvedClient.db("users");
        }).catch((error) => {
          console.log(error.message);
        });
    },

    createUser: function(user) {

        const newUser = {
            username: user.username,
            password: user.password,
            email: user.email,
            roles: user.roles
          };
      
          return dbConnection
            .collection("user")
            .insertOne(newUser);
      
    },

    findUser: async function(user) {

          return await dbConnection
          .collection("user")
          .findOne({username: user.username, password: user.password});

    }
}