const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const { models } = require("mongoose");


module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "please logged in.")
        res.redirect("/");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password")

        if (!user) {
            return res.status(401).send("User not found");
        }

        req.user = user

        next()
    } catch (err) {
        req.flash("error", "somthing went rwrong")
        res.redirect("/");
    }
}