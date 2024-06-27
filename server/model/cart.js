const mongoose=require("mongoose");

const CartProducts = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    quantityAvailable:{
        size:{
            type:String,
            required:true
        },
        quantity:{
            type:[Number],
            required:true
        }
    },
    imgUrl:{
        type:String,
        required:true
    },
    subCatogaries:{
        type:String,
        required:true
    },
    Catogarie:{
        type:String,
        required:true
    },
    brandName: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    rating:{
        type:[Number],
        default: [0, 0, 0, 0, 0],
    },
    averageRating: {
        type: Number,
        default: 0,
      },
      quan:{
        type:Number,
        default:1,
      }

});

module.exports=mongoose.model("Cart",CartProducts);