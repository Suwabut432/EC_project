const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const genratetoken = require("../utils/genratetoken");



module.exports.outhorized = async function (req, res) {
    try {
        let { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            req.flash("error", "user Already created.")
            res.redirect("/");
        } else {

            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUser = await userModel.create({
                name,
                email,
                password: hashedPassword
            })

            const token = genratetoken(createdUser);

            res.cookie("token", token);

            req.flash("error", "Sign Up Successfully.")
            res.redirect("/")
        }
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/");
    }
}


module.exports.logincontrollers = async function (req, res) {
    try {

        if (req.cookies.token) {
            req.flash("error", "You are already login")
            res.redirect("/");
        } else {

            let { email, password } = req.body;
            const existingUser = await userModel.findOne({ email });
            if (!existingUser) {
                return res.status(401).send("email or password incorrect");
            }
            bcrypt.compare(password, existingUser.password, function (err, result) {
                if (result) {
                    const token = genratetoken(existingUser);
                    res.cookie("token", token);
                    req.flash("message", "login Successfully")
                    res.redirect("/shop");
                } else {
                    return res.status(401).send("email or password incorrect");
                }
            })
        }
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.logout = async function (req, res) {
    res.cookie("token", "")
    res.redirect("/");
};
