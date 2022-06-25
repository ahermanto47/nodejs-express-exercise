const express = require('express');
const cors = require("cors");
const logger = require("morgan");

module.exports = function(routes) {
    const app = express();
    
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(logger("dev"));
    app.use("/", routes);

    return app;    
}