const express=require("express");
const routers=express.Router();
const {addProducts,getMenFashionProducts,getWomenFashionProducts
,getMenFilterProducts}=require("../controller/fashionproduct");

routers.route("/addproduct").post(addProducts);
routers.route("/getMenFashionProducts").get(getMenFashionProducts);
routers.route("/getWomenFashionProducts").get(getWomenFashionProducts);
routers.route("/getMenFilterProducts").get(getMenFilterProducts);

module.exports=routers;