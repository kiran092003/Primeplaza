const express=require("express");
const routers=express.Router();
const {Login,Signup,getUserInfo}=require("../controller/login");

routers.route("/login").post(Login);
routers.route("/signup").post(Signup);
routers.route("/userinfo").get(getUserInfo);

module.exports=routers;