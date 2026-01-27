const express = require("express");
const userRouter = express.Router();
const { userAuth}= require("../middlewares/auth")
const  {ConnectionRequestModel} = require("../scema/connectionRequest")

//   to see the all the request for the user 
userRouter.get("/user/request/recevied", userAuth,async(req, res)=>{

    try{
const loggedInUser = req.user;

const connectionRequest = await ConnectionRequestModel.find({
    toUserId : loggedInUser._id,
    status: "intrested",
}).populate(
    "fromUserId",
    ["firstName", "lastName"]
);


res.json({
Message : "data fetched successfully",
data : connectionRequest,
});
    }catch(err){
        res.send("error occured "+err);
    }
})

module.exports= userRouter;