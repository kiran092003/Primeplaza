const CartSchema = require("../model/cart");
const Checkout =require("../model/checkout");


const addCartProducts = async(req,res)=>{
    try {
       const { name, price, description, quantity, imgUrl, brandName, color,userId} = req.body;
       const existingProduct = await CartSchema.findOne({ name:name,userId:userId });
        const reqdata =req.body;
        if (existingProduct) {
        return res.status(200).json({ message: 'Product with this name already exists in the cart' });
        }
            const data=await CartSchema.create(reqdata);
            res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

const getCartProducts =async (req,res)=>{
  try {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    const products = await CartSchema.find({ userId: userId });
    res.status(200).json({ products });   
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching cart products" });
}
}

const deleteSingleProduct =async (req,res)=>{
    try {
        const {id}=req.params;
        const products = await CartSchema.findOneAndDelete({_id:id});
        if (!products) {
            res.send(`No task with id : ${id}`);
          }
          res.status(200).json('sucess')          
    } catch (error) {
        console.log(error);
    }
}

const deleteAllProduct =async (req,res)=>{
    try {
        const products = await CartSchema.deleteMany({});
        res.status(200).json({products});   
    } catch (error) {
        console.log(error);
    }
}

const updatequantity = async (req,res)=>{
    try {
        const { id } = req.params;
        const { action } = req.body;
    
        const product = await CartSchema.findById(id);
    
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        if (action === 'increment') {
          product.quan += 1;
        } else if (action === 'decrement') {
          if (product.quan > 1) {
            product.quan -= 1;
          }
          else{
            const products = await CartSchema.findOneAndDelete({_id:id});
          }
        } else {
          return res.status(400).json({ message: 'Invalid action' });
        }
    
        await product.save();
    
        res.status(200).json({ quan: product.quan });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
}


const checkoutSession = async (req, res) => {
  const { FirstName, LastName, phoneNumber, Address, userId } = req.body;

  try {
      const userCart = await CartSchema.find({ userId: userId });

      if (userCart.length === 0) {
          return res.status(400).json({ error: "Cart is empty" });
      }

      const tax = 20;
      const deliveryCharge = 100;
      const items = userCart.map(item => ({
          name: item.name,
          price: item.price,
          discription: item.discription,
          quantityAvailable: item.quantityAvailable,
          imgUrl: item.imgUrl,
          subCatogaries: item.subCatogaries,
          Catogarie: item.Catogarie,
          brandName: item.brandName,
          color: item.color,
          rating: item.rating,
          averageRating: item.averageRating,
          quan: item.quan,
      }));

      const subTotal = items.reduce((acc, item) => acc + item.price * item.quan, 0);
      const total = subTotal + tax + deliveryCharge;

      const response = await Checkout.create({
          userId: userId,
          FirstName: FirstName,
          LastName: LastName,
          phoneNumber: phoneNumber,
          Address: Address,
          items: items,
          subTotal: subTotal,
          tax: tax,
          total: total,
      });

      // Optionally, you can clear the user's cart after checkout
      // await CartSchema.deleteMany({ userId: userId });

      res.status(200).json(response);
  } catch (e) {
      res.status(500).json({ error: e.message });
  }
}


module.exports={addCartProducts,getCartProducts,deleteSingleProduct,deleteAllProduct,updatequantity,checkoutSession};