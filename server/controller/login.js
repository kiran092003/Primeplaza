const jwt=require("jsonwebtoken");
const loginSchema=require("../model/login");
const nodemailer = require('nodemailer');
const Verification =require("../model/verification");

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
        userId:userId
      };
  
      return res.status(200).json({ user: data });
    } catch (error) {
      console.error(error); // Log errors for debugging
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

const Signup =async(req,res) =>{
  try{
    const {username,email,password,confirmPassword,verificationCode} = req.body
     if (!username || !email || !password || !verificationCode || !confirmPassword) {
      return res.status(200).json({ msg: "Missing required fields" });
      }
      const checkdata= await loginSchema.find({email});
      if(checkdata.length>0){
        res.status(400).json({msg:"user already exist."});
      }
      else{
        const verification = await Verification.findOne({
          verificationCode:verificationCode,
          email:email,
        });
        if (!verification) {
          return res.status(200).json({ message: "Invalid verification code" });
        }
        if(password !== confirmPassword){
            return res.status(200).json({msg:"incorrect password"})
        }
        const user = await loginSchema.create(req.body)
        let id=user._id;
        const token=jwt.sign({id,email,username},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).json({msg:"successfull",token,userId:user._id});
      }
  }
  catch(err){
      console.log(err);
      res.status(400).json({ message: "failed to Sign up",err });
  }
}


const emailVerification = async (req, res) => {
  const { email } = req.body;
  if(!email){
    return res.status(200).json({message:"Please enter your email id"})
  }
  try {
    const existingUser1 = await loginSchema.findOne({ Email:email });
    if (existingUser1) {
      return res.status(200).json({ message: "Email already in use" });
    }
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const verificationCode = randomNumber.toString();
    const existingVerification = await Verification.findOne({ email });
    if (
      existingVerification &&
      hasExpired(existingVerification.expiresAt)
    ){
      const existingVerification = await Verification.findOneAndDelete({ email });
    }
    if (
      existingVerification &&
      !existingVerification.used &&
      !hasExpired(existingVerification.expiresAt)
    ) {
      // Reuse existing code if valid (optional)
      console.log("Reusing existing verification code for", email);
      await sendVerificationCodeEmail(
        email,
        existingVerification.verificationCode
      );
      return res
        .status(200)
        .json({ message: "Verification code sent successfully" });
    }

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    const newVerification = new Verification({
      verificationCode,
      email,
      expiresAt,
    });

    await newVerification.save();
    await sendVerificationCodeEmail(email, verificationCode);

    res.status(200).json({ message: "Verification code sent successfully" });
  } catch (err) {
    res.status(400).json({ message: "failed to send verification code",err });
  }
};

function hasExpired(expiresAt) {
  return expiresAt < Date.now();
}
const sendVerificationCodeEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SECRET_EMAIL, // Your Gmail address
      pass: process.env.SECRET_PASS, // Your Gmail password or an app-specific password
    },
  });

  const mailSuperAdmin = {
    from:{
      name: 'Primeplaza',
      address: "kiran092003@gmail.com",
    },
    to: email,
    subject: "Verification Code for SignUp",
    html: `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: grey;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Make body fill entire viewport height */
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: left; /* Align content within container to left */
    }
    h1, h4, p {
      margin: 0;
      padding: 0;
    }
    h1 {
      color: #333333;
      font-size: 36px;
      margin-bottom: 10px;
    }
    h4 {
      color: #4CAF50;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #555555;
      font-size: 18px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .code {
      display: flex;
      justify-content: center;
    }
    .digit {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 24px;
      margin: 0 5px;
      width: 10px;
      text-align: center;
    }
    .footer {
      font-style: italic;
      color: #888888;
      margin-top: 20px;
    }
    .logo {
      max-width: 100px;
      margin-bottom: 20px;
    }
    .timer {
      font-size: 20px;
      color: #4CAF50;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <img src="https://firebasestorage.googleapis.com/v0/b/primeplaza-b7db1.appspot.com/o/Logo%20maker%20project.png?alt=media&token=f97be178-05f3-4fb0-816b-a20817eb238c" alt="Company Logo" class="logo">
      <h1>Hello,</h1>
      <p>To approve the request, please use the verification code below:</p>
      <div class="code">
        <span class="digit">${String(verificationCode).charAt(0)}</span>
        <span class="digit">${String(verificationCode).charAt(1)}</span>
        <span class="digit">${String(verificationCode).charAt(2)}</span>
        <span class="digit">${String(verificationCode).charAt(3)}</span>
        <span class="digit">${String(verificationCode).charAt(4)}</span>
        <span class="digit">${String(verificationCode).charAt(5)}</span>
      </div>
      <p class="footer">For verification purposes only for the Primeplaza<br> Thank You</p>
    </div>
  </div>
</body>
</html>

  `,
  };

  try {
    await transporter.sendMail(mailSuperAdmin);
    console.log(`Verification code sent`);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send verification code to email.");
  }
};

module.exports={Login,Signup,getUserInfo,emailVerification};