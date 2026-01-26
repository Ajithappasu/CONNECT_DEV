const jwt = require("jsonwebtoken");
const User = require("../scema/user");
const userAuth = async (req, res, next)=>{
    try{
 const{token}= req.cookies;
 if(!token){
    throw new Error("invalid token");
 }
 const decodedMessage = await jwt.verify(token,"Dev_connect");
  const{_id}= decodedMessage;
   
  const user = await User.findById(_id);
  if(!user){
    throw new Error("user not exits ");
  }
// we are  giving the value of the user to the request user 
  req.user=user
 next();
    }catch(err){
        res.status(404).send("error occured"+err);
    }

}

module.exports={
    userAuth,
};