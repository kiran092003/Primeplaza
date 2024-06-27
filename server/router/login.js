const express=require("express");
const routers=express.Router();
const {Login,Signup,getUserInfo,emailVerification}=require("../controller/login");

routers.route("/login").post(Login);
routers.route("/signup").post(Signup);
routers.route("/userinfo").get(getUserInfo);
routers.route("/emailVerification").post(emailVerification);

module.exports=routers;