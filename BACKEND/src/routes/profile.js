const  express = require("express");

const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const {validEditProfileData}= require("../utils/validation");



// to see profile of the user 
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user;
    res.send(user);
    }catch(err){
        res.status(404).send("error occured"+err);
    }
})
// to deit the details 
profileRouter.patch("/profile/edit",userAuth, async(req, res)=>{
    try{
    if(validEditProfileData(req)){
        throw new Error("edit not allowed");
    }
const loggedInUser = req.user;
Object.keys(req.body).forEach((key)=>(loggedInUser[key]= req.body[key]));

await loggedInUser.save();

res.json({
    message:"your profile updated successfully",
    data: loggedInUser,
})

    }catch(err){
 res.status(400).send("error occured"+err);
    }
})

module.exports= profileRouter;
