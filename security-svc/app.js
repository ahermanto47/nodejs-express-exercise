const express = require('express');

module.exports = function(database) {

    const app = express();
    app.use(express.json());
    app.post('/users/signup', async (req, res) => {
        const { username, password, email } = req.body;
        database.createUser(username, password, email);
        res.json({});
    })

    return app;
    
}