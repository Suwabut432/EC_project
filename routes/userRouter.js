const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const dbgr = require("debug")("development:mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const genratetoken = require("../utils/genratetoken");
const { outhorized, logincontrollers, logout } = require("../controllers/outhcontrollers");
const IsLoggedIn = require("../middlewares/IsLoggedIn");




router.get("/", function (req, res) {
    res.send("hey it's working");
})

router.get("/cart/:id", IsLoggedIn, async function (req, res) {
    try {
        // Find the logged-in user
        const user = await userModel.findById(req.user._id);

        // Add product to user's cart
        user.cart.push(req.params.id);
        await user.save();

        // Find the product by ID
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Render cart with product
        res.render("cart", { product });
        console.log(product.name);

    } catch (err) {
        console.log("Error!", err.message);
        res.status(500).send("Something went wrong!");
    }
});


router.post("/register", outhorized)

router.post("/login", logincontrollers)

router.get("/logout", logout);


module.exports = router;