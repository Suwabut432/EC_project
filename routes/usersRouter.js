const express = require("express");
const Router = express.Router();

Router.get("/", function(req, res){
    res.send("hey its working.");
})

module.exports = Router;