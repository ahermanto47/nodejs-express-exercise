const express = require('express');

module.exports = function(database,jwt) {

    const app = express();
    app.use(express.json());
    app.post('/users/signup', async (req, res) => {
        const newUser = req.body;
        database.createUser(newUser);
        res.json(newUser);
    });

    return app;
    
}