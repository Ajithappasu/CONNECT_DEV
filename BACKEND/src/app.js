const express = require('express');
const app = express();
const connectDB = require("./config/DataBase")
const User = require("./scema/user");
const validator = require("validator");
const {validateSignUpData}  = require("./utils/validation");
const bcrypt= require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")



// we use this middleWare to  convert  json format request data to  java script object format. 
// we use use middleware because it can be used in all routes and all typres (get, post etc)
app.use(express.json());

// we use this middle ware so tha we can read cookie 
app.use(cookieParser());


app.post("/signup", async (req, res) => {
    // we are getting data in   raw formmt in the request body  
       try{
validateSignUpData(req)
 const {firstName,lastName,emailId,password,age,gender,about,photo_url,skills}=req.body;
// we are encrypting password and storing the encrypted password in it 
 const passwordHash =  await bcrypt.hash(password,10);
 console.log(passwordHash);

    const user = new User( {firstName,lastName,emailId,password : passwordHash,age,gender,about,photo_url,skills});
    // geting data from body ;
    
        await user.save();
        res.send("data saved successfully");
    } catch (err) {
        res.send("error oucered " + err);
    }
})

// login api  user logined in 
app.post("/login", async(req,res)=>{
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
// to see profile of the user 
app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
    res.send(user);
    }catch(err){
        res.status(404).send("error occured"+err);
    }
})

app.post("/sendConnectionRequest",userAuth,async(req, res)=>{
// sending connection request
const user = req.user;

res.send("sending connection request"+user.firstName);
})


connectDB()
    .then(() => {
        console.log("connection established ");
        // ew have to run the server only when the database is connected successfully .
        app.listen(30000, () => {
            console.log("server successful listining on   ajith 3000.....");
        });
    })
    .catch(() => {
        console.log("error not connected ");
    })
