const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/IsLoggedIn");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
    const error = req.flash("error");
    res.render("index", { error, isLoggedIn : false });
})


router.get("/shop",async function(req, res) {
    const products = await productModel.find();
    res.render("shop", {products})
})

module.exports = router;