const mongoose=require("mongoose");

const FashionProducts = new mongoose.Schema({
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
            type:[String],
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

});

module.exports=mongoose.model("Fashion",FashionProducts);