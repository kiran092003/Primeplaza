const express=require("express");
const routers=express.Router();
const {addCartProducts,getCartProducts,deleteSingleProduct,deleteAllProduct,updatequantity,checkoutSession}=require("../controller/cart");
const auth = require("../middleware/auth");

routers.route("/addCartproduct").post(addCartProducts);
routers.route("/getCartProducts").post(getCartProducts);
routers.route("/deleteSingleProduct/:id").delete(deleteSingleProduct);
routers.route("/deleteAllProduct").delete(deleteAllProduct);
routers.route("/updatequantity/:id").post(updatequantity);
routers.route("/checkoutSession").post(auth.authenticationMiddleware,checkoutSession);

module.exports=routers;