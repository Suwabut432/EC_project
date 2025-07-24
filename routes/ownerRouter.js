const express = require("express");
const Router = express.Router();
const ownerModel = require("../models/owner-model");

Router.get("/", function (req, res) {
    res.send("hey its working.");
})
if (process.env.NODE_ENV === "development") {
    Router.post("/create", async function (req, res) {
        const owner = await ownerModel.find();
        if (owner.length > 0) {
            return res.status(500).send("owner already created so not create the owner because only one owner alowed")
        }
        let { fullname, email, password } = req.body;
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        console.log(createdOwner);
    })

}



module.exports = Router;