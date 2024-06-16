const jwt=require("jsonwebtoken");
const loginSchema=require("../model/login");

const Login =async(req,res) =>{
   const reqdata =req.body;
   const {username,email,password,confirmPassword}=reqdata;
   const data=await loginSchema.find(reqdata);
   const incorrectPass= await loginSchema.find({email:email});
   try {
    if(!email&&!password){
        res.status(400).json({msg:"enter required details"});
        }
    else if(incorrectPass.length>0&&password!=incorrectPass[0].password){
        res.status(401).json({msg:"incorrect password"});
        }
    else if(data.length>0){
        const {id,email,username}=data[0];
        const token=jwt.sign({id,email,username},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).json({msg:"loged-in sucessfully",token,userId:id});
        }
    else{
         res.status(200).json({msg:"sign-up"});
        }   
   } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
   }
}

const getUserInfo = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Missing or invalid token" });
      }
      const token = authHeader.split(" ")[1];
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid or expired token" });
      }
  
      const userId = decodedToken.id;
  
      const userData = await loginSchema.findById(userId);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const data = {
        username: userData.username,
        email: userData.email,
      };
  
      return res.status(200).json({ user: data });
    } catch (error) {
      console.error(error); // Log errors for debugging
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

const Signup =async(req,res) =>{
   const reqdata=req.body;
   const checkdata=await loginSchema.find(reqdata);
   if(checkdata.length>0){
    res.status(200).json({msg:"user already exist"});
   }
   else{
   const {username,email,password,confirmPassword}=reqdata;
    if(password!=confirmPassword){
        res.status(200).json({msg:"password does not match"});
    }
    else{
        const data=await loginSchema.create(reqdata);
        const token=jwt.sign({email,username},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(200).json({msg:"user created",token});
    }
   }
}

module.exports={Login,Signup,getUserInfo};