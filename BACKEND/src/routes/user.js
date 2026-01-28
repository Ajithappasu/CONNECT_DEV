const express = require("express");
const userRouter = express.Router();
const { userAuth}= require("../middlewares/auth");
const  {ConnectionRequestModel} = require("../scema/connectionRequest");


const UserSafeData = "firstName  lastName  age  gender  about skills"
//   to see the all the request(pending) for the user 
userRouter.get("/user/request/recevied", userAuth,async(req, res)=>{

    try{
const loggedInUser = req.user;

const connectionRequest = await ConnectionRequestModel.find({
    toUserId : loggedInUser._id,
    status: "intrested",
}).populate(
    "fromUserId",UserSafeData
);


res.json({
Message : "data fetched successfully",
data : connectionRequest,
});
    }catch(err){
        res.send("error occured "+err);
    }
})

// to see the  total connection(accepted) of the logined  user 
userRouter.get("/user/connections",userAuth, async(req, res)=>{
    try{
     const loggedInUser = req.user;

     const connectionRequest= await ConnectionRequestModel.find({
     $or :    [{toUserId: loggedInUser._id,  status :"accepted"},
          {toUserId: loggedInUser._id,  status :"accepted"}
     ]
     }).populate("fromUserId",UserSafeData);


     const data = connectionRequest.map((row)=>{
        if(row.fromUserId == loggedInUser._id){
           return row.toUserId;
        }
     return row.fromUserId;
    });
res.json({
    message : " the total accepted requests are ",
    data : data
})
    }catch(err){
        res.status(404).send("error occured"+err);
    }
})
module.exports= userRouter;