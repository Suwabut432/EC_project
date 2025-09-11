const express = require("express");
const app = express();
const routes = express.Router();
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-conection");
const session = require("express-session");
const flash = require("connect-flash");
const userModel = require("./models/user-model");
const productModel = require("./models/product-model");

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.use(session({
    secret: "mySecretKey", // apna secret rakho
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

const ownerRouter = require("./routes/ownerRouter");
const userRouter  = require("./routes/userRouter");
const productsRouter = require("./routes/productRouter");
const index = require("./routes/index");


app.use("/owner", ownerRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/", index);



app.listen(3000);