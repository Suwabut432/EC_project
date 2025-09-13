const express = require("express");
const IsLoggedIn = require("../middlewares/IsLoggedIn");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
    res.render("admin");
})


router.post("/create", upload.single("image"), async function (req, res) {
    try {
        let { name, price, discount, textcolor, bgcolor, panelcolor } = req.body;
        const Products = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            textcolor,
            bgcolor,
            panelcolor
        })
        req.flash("success", "Product Create Successsfully.")
        res.redirect("/shop")
    } catch (err) {
        res.send(err.message);
    }
})



module.exports = router;