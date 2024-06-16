const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req,res,next) =>{
  const authHeader= req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer')){
   return res.status(401).json({msg:"NO token provided"})
  }

  const token =authHeader.split(' ')[1]

  try {
    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    next()
  } catch (error) {
    return res.status(401).json({msg:"NO authorization to access this route"}); 
  }
}

module.exports=authenticationMiddleware;