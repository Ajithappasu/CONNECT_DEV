const express = require("express");
const authRouter = express.Router();

const {validateSignUpData}  = require("../utils/validation");
const User = require("../scema/user");
const bcrypt= require("bcrypt");

// sign up route 
authRouter.post("/signup", async (req, res) => {
    // we are getting data in   raw formmt in the request body  
       try{
validateSignUpData(req)
 const {firstName,lastName,emailId,password,age,gender,about,photo_url,skills}=req.body;
// we are encrypting password and storing the encrypted password in it 
 const passwordHash =  await bcrypt.hash(password,10);


    const user = new User( {firstName,lastName,emailId,password : passwordHash,age,gender,about,photo_url,skills});
    // geting data from body ;
    
        await user.save();
        res.send("data saved successfully");
    } catch (err) {
        res.send("error oucered " + err);
    }
})


// login route// login api  user logined in 
authRouter.post("/login", async(req,res)=>{
    try{
        const{ emailId,password} = req.body;
  /// it will find the user with the email id.
        const ValidUser =  await User.findOne({emailId:emailId});
        if(!ValidUser){
             throw new Error("invalid email address");
        }
 const isPasswordValid = await  ValidUser.validatePassword(password);
 if(isPasswordValid){
    // create a jwt token 
    const token = await ValidUser.getJWT();
     // create A jwt token
      //add the token to cokiee  and send the responce back to the user
     res.cookie("token",token);

res.send("login successful");

   
 }else{
    throw new Error("incorrect password");
 }
    }catch(err){
      res.status(404).send("error oucered " + err);
    }
})

module.exports = authRouter