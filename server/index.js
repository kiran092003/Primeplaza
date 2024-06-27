const express=require("express");
const cors=require("cors");
const LoginRouter=require("./router/login");
const ConnectDB = require("./db/connect");
const body_parser=require("body-parser");
const FashionRouter=require("./router/fashionproduct");
const CartRouter = require("./router/cart");
require("dotenv").config();


const app=express();

app.use(express.json());
app.use(body_parser.json());
app.use(cors());
app.use("/api/v1",LoginRouter);
app.use("/api/v1",FashionRouter);
app.use("/api/v1",CartRouter);

app.get("/",(req,res)=>{
    res.send("hello")
})
const port = process.env.PORT || 8000;
const start = async()=>{
    try {
        await ConnectDB(process.env.MONGO_URI);
        console.log("db-connected");
        app.listen(port,(req,res)=>{
            console.log("server is listening at port 8000.");
        })
    } catch (error) {
        console.log(error);
    }
}

start();