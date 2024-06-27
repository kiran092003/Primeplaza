const express=require("express");
const routers=express.Router();
const {addProducts,getMenFashionProducts,getWomenFashionProducts
,getMenFilterProducts,getWomenFilterProducts,getKidsFashionProducts,getKidsFilterProducts
 ,getSingleProduct,getproductidbyName}=require("../controller/fashionproduct");

routers.route("/addproduct").post(addProducts);
routers.route("/getMenFashionProducts").get(getMenFashionProducts);
routers.route("/getWomenFashionProducts").get(getWomenFashionProducts);
routers.route("/getKidsFashionProducts").get(getKidsFashionProducts);
routers.route("/getMenFilterProducts").get(getMenFilterProducts);
routers.route("/getWomenFilterProducts").get(getWomenFilterProducts);
routers.route("/getKidsFilterProducts").get(getKidsFilterProducts);
routers.route("/getSingleProduct").get(getSingleProduct);
routers.route("/getproductidbyName").post(getproductidbyName);

module.exports=routers;