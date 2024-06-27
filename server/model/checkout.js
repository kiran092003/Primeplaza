const mongoose=require("mongoose");

const CheckoutProducts = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    FirstName: {
      type: String,
      required:true
    },
    LastName: {
      type: String,
      required:true
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    tax:{
        type:Number,
        require:true,
    },
    subTotal:{
        type:Number,
        required:true,
        default:0
    },
    total:{
        type:Number,
        required:true
    },
    items:[
      {
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
  
      }
    ],
      Address: {
        pinCode: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        Town: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
});

module.exports=mongoose.model("Checkout",CheckoutProducts);