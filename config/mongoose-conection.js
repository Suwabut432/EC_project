require("dotenv").config();
const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");


mongoose.connect(process.env.MONGO_URL)
    .then(function () {
        console.log("✅ MongoDB Connected");
    }).catch(err => console.error("❌ MongoDB connection error:", err))



