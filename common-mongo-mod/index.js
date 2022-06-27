const { MongoClient } = require("mongodb");

let dbClient;

module.exports = {
      connect: function (url) {
        dbClient = MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Successfully connected to MongoDB.");
        return dbClient;
      }      
}