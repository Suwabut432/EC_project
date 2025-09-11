const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const IsLoggedIn = require("../middlewares/IsLoggedIn");
const dbgr = require("debug")("development : mongoose")

router.get("/", function (req, res) {
    res.render("owner-login");
    console.log(process.env.NODE_ENV);
})




if (process.env.NODE_ENV === "development") {
    try {
        router.post("/create", async function (req, res) {
            const owners = await ownerModel.find()
            if (owners.length > 0) {
                return res.
                    status(401)
                    .send("you have not permission create to new owners");
            }
            let { name, email, password } = req.body;


            const createdOwner = await ownerModel.create({
                name,
                email,
                password
            })
            res.send(createdOwner);
        })
    } catch (err) {
        dbgr(err.message);
    }
}

router.get("/admin", IsLoggedIn, function(req, res) {
    const success = req.flash("success");
    res.render("createproducts", {success})
})

module.exports = router;