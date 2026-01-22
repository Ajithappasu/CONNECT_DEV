const express = require('express');

const app = express();
const connectDB = require("./config/DataBase")
const User = require("./scema/user");
const validator = require("validator");
const {validateSignUpData}  = require("./utils/validation");
const bcrypt= require("bcrypt");


// we use this middleWare to  convert  json format request data to  java script object format. 
app.use(express.json());
// we use use middleware because it can be used in all routes and all typres (get, post etc).



// to display the data of the users
app.get("/getdata", async (req, res) => {

    try {   // this User is the one we iported from above 
        const allUsers = await User.find({});
        res.send(allUsers);
    } catch (err) {
      return   res.send("someting went woring  error occured " + err);
    }
});

// display dat of single user by emaild 
app.get("/getone", async (req, res) => {
    try {
        const oneUser = await User.findOne({ emailId: "appasuajithsai111@gmail.com" })
        res.send(oneUser);
    } catch (err) {
        res.send("someting went woring  error occured " + err);
    }
})
/// to delete use by id 
app.delete("/delete", async (req, res) => {
    const id = req.body.id;
    console.log(id);
    try {
        await User.findByIdAndDelete({ _id: id });
        res.send("deleted successfully ");
    } catch (err) {
        res.send("someting went woring  error occured " + err);
    }
})

// to update user by id 
app.patch("/update/:Id", async (req, res) => {
   
    try {
         const ID = req.params?.Id;
    const data = req.body;
    // we declare the  parametes that are  allowd for updating
    const AllowedUpdates =["firstName", "lastName", "password","age", "about","skills"]
    const isUpdatesAllowed = Object.keys(data).every((k)=>{
        return AllowedUpdates.includes(k);
    });
    if(!isUpdatesAllowed){
        throw new Error("update not allowed");
    }
    if(data?.skills.length>10){
        throw new Error("skills must not be grater than 10");
    }
        await User.findByIdAndUpdate({ _id: ID }, data);
        res.send("updated succesfully");
    } catch (err) {
        res.send("someting went woring  error occured " + err);
    }
})

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

        const isEmailIdValid =  await User.findOne({emailId:emailId});
        if(!isEmailIdValid){
             throw new Error("invalid email address");
        }
 const isPasswordValid = await bcrypt.compare(password, isEmailIdValid.password);
 if(isPasswordValid){
    res.send("login successful");
 }else{
    throw new Error("incorrect password");
 }
    }catch(err){
      res.status(404).send("error oucered " + err);
    }
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
