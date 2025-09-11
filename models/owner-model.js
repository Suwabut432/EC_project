const mongoose = require("mongoose");




const ownerSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String, 
    password: String,
    product: {
        type: Array,
        default: []
    }, 
    gstin: String,
    Picture: Buffer

})


module.exports = mongoose.model("owner", ownerSchema);