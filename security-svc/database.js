const mongoCommon = require("../common-mongo-mod");

module.exports = {
    init: function() {
        mongoCommon.connectToServer("users",function(){});
    },

    createUser: function(user) {
        
    }
}