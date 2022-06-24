const express = require('express');

module.exports = function() {

    const app = express();
    app.use(express.json());
    app.post('/users/signup', async (req, res) => {

    })

    return app;
    
}