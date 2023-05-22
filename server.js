const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//import routes

const authRoute = require("./routes/auth");
const commentRoute = require("./routes/commentRoute");



dotenv.config();

//connect to db

mongoose.connect(process.env.DB_CONNECT,
    () => console.log("connected to db"));



//MiddleWares
app.use(express.json())



//Route Middlewares

app.use("/api/comment", commentRoute);
app.use("/api/user", authRoute);


app.listen(3000, () => console.log("Server Up And Running"));


// app.set("view-engine", "ejs")
// app.use(express.urlencoded({extended: false}))

// app.get("/", (req, res) => {
//     res.render("index.ejs", { name: "Burak" },)
// })

// app.get("/login", (req, res) => {
//     res.render("login.ejs")
// })

// app.post("/login", (req, res) => {
//     res.render("register.ejs")
// })


// app.get("/register", (req, res) => {
//     res.render("register.ejs")
// })

// app.post("/register", (req, res) => {
//     req.body.email
// })