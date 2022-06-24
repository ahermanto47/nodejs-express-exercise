const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

module.exports = commonJwtMod = {

    verifyToken: function (req, res, next) {
        let token = req.get("Authorization");
        token = token.substring(7);
            
        if (!token) {
          return res.status(403).send({
            message: "No token provided!"
          });
        }
      
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: "Unauthorized!"
            });
          }
          req.userId = decoded.id;
          next();
        });
      }

}