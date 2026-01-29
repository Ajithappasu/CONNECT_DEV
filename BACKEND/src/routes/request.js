const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {ConnectionRequestModel}= require("../scema/connectionRequest");
const User = require("../scema/user"); 

// to send a request to user 
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req, res)=>{
try{
    const fromUserId= req.user._id;
    const  toUserId = req.params.toUserId.trim();
    const status = req.params.status;


    
    const isAllowed =["ignored", "intrested"];
    if(!isAllowed.includes(status)){
     throw new Error("in valid status type");
    }
    const toUser = await User.findById(toUserId);
      if(!toUser){
return res.json({
    messsage :"the user you are trying to send the request doesnot exists",
})
      }

    const exestingConnectionRequest = await ConnectionRequestModel.findOne(
        {
            $or:[
                {fromUserId, toUserId},
                {
                    fromUserId:toUserId, toUserId:fromUserId
                },
            ],
        });
        if(exestingConnectionRequest){
            return res.status(404).send("connection already  exsists ");
        }


        const connectionRequestModel = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status
    }) 

    const data =  await connectionRequestModel.save();
    res.json({
        messsage: (req.user.firstName+" is "+status+"in "+toUser.firstName),
        data
    })

}catch(err){
    res.status(404).send("error occured "+err);
}
})

// accept or rejected   request
requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
// in this request we  are  basically the toUser 
// the from user had sent the  request  and  can review it and accept it or reject
try{
    const loggedInUser = req.user;
    const { status, requestId} = req.params;
       const isAllowed =["accepted", "rejected"];

const connectionRequest = await  ConnectionRequestModel.findOne({
    fromUserId:requestId,
   toUserId: loggedInUser._id,
   status:"intrested",
});
if(!connectionRequest){
    return res.status(404).json({
        message : "connection request not valid "
    })
}

connectionRequest.status= status;
const data =  await connectionRequest.save();

res.json({
    message: "connection request" + status,
    data 
})
}catch(err){
    res.status(404).send("error occured "+err);
}
})

module.exports = requestRouter;