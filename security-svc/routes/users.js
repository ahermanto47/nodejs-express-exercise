const express = require('express');

module.exports = function(database,jwt) {

    const routes = express.Router();

    routes.post("/users/signup", async (req, res) => {
        const newUser = req.body;
        const result = database.createUser(newUser);
        result.then((resolve) => {
            res.json(resolve);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
    });

    routes.post("/users/signin", async (req, res) => {
        const user = req.body;
        const result = database.findUser(user);
        result.then((validUser) => {
            if (validUser) {
                console.log(validUser);
                const token = jwt.generateToken(validUser);
                console.log(token);
                res.status(200).send(token);
            } else {
                res.status(401).send("Unauthorized");
            }
        }).catch((error) => {
            res.status(400).send(error.message);
        });
     });

    return routes;

};