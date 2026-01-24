const  express = require("express");

const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth")



// to see profile of the user 
profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
    res.send(user);
    }catch(err){
        res.status(404).send("error occured"+err);
    }
})

module.exports= profileRouter;
