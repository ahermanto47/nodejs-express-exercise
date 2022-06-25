const jwt = require("jsonwebtoken");
const secretToken = process.env.SECRET_TOKEN;

module.exports = {

    isAdmin: function(req, res, next) {
      let roles = req.roles;
      console.log(roles.length);
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        console.log(role);
        if (role == "ADMIN") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    },

    generateToken: function (user, callback) {
      // token with expiration time 24 hours
      let token = jwt.sign(
        { id: user.id , roles: user.roles }, 
        secretToken, 
        { expiresIn: 86400 },
        callback
      );
      return token;
    },

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
        req.roles = decoded.roles;
        next();
      });
    }

}