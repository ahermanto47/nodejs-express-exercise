const jwt = require("jsonwebtoken");
const secretToken = process.env.SECRET_TOKEN;

module.exports = {

    verifyToken: function (req, res, next) {
        let token = req.get("Authorization");

        if (token) {
          token = token.substring(7);
        }
            
        if (!token) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
      
        jwt.verify(token, secretToken, (err, decoded) => {
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