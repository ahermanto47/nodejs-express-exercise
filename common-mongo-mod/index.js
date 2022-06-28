const { MongoClient } = require("mongodb");

let dbClient;

module.exports = {
      connect: function (url) {
        dbClient = MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        return dbClient;
      }      
}