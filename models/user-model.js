const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }], 
    orders: {
        type: Array,
        default: [],
    },
    contect: Number,
    Picture: Buffer
})


module.exports = mongoose.model("user", userSchema);