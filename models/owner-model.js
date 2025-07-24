const mongoose = require("mongoose");


const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minlength: 3
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    phone: Number
})


module.exports = mongoose.model("owner", ownerSchema);