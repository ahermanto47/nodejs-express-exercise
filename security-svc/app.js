const express = require('express');

module.exports = function(database,jwt) {

    const app = express();
    app.use(express.json());
    app.post('/users/signup', async (req, res) => {
        const newUser = req.body;
        database.createUser(newUser);
        res.json(newUser);
    });

    app.post('/users/signin', async (req, res) => {
        const user = req.body;
        const validUser = await database.findUser(user);
        if (validUser) {
            const token = jwt.generateToken(validUser);
            console.log(token);
            res.status(200).send(token);
            return; 
        }
        res.status(401).send("Unauthorized");
    });

    return app;
    
}