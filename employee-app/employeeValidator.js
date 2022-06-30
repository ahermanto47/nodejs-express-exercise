const express = require("express");
require("isomorphic-fetch");
const redis = require("redis")
const client = redis.createClient({
    socket: {
        host: "192.168.1.240",
        port: 30379   
    }
})

let sourceURL = 'http://localhost:7000/departments';

let clientConnected = false;

module.exports = {
    isValidEmployee: async function(req, res, next) {
        const employee = req.body;
        let departments;

        if (!clientConnected) {
            await client.connect();
            clientConnected = true;
        }
 
        departments = await client.get('departments');
 
        if (departments) {
            departments = JSON.parse(departments);
            console.log("from cached data", departments);
        } else {
            const resp = await fetch(sourceURL)
               .then((response) => response.json());
            await client.set('departments', JSON.stringify(resp));
            departments = resp;
            console.log("from source data", departments);
        }
        //await client.disconnect();

        if (departments) {
            for (department of departments){
                if(department.code == employee.departmentCode) {
                    next();
                    return;
                }
            }
        }

        return res.status(404).send({
            message: "Not found!"
        });
    }
}