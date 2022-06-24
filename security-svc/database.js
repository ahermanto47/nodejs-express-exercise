const mongoCommon = require("../common-mongo-mod");

let dbConnection;

module.exports = {

    init: function() {
        mongoCommon.connectToServer("users",function(){
            dbConnection = mongoCommon.getDb();
        });
    },

    createUser: function(user) {

        const newUser = {
            username: user.username,
            password: user.password,
            email: user.email
          };
      
          return dbConnection
            .collection('user')
            .insertOne(newUser);
      
    },

    findUser: async function(user) {

          return await dbConnection
          .collection('user')
          .findOne(user);

    }
}