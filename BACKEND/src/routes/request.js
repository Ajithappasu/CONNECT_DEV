const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {ConnectionRequestModel}= require("../scema/connectionRequest");
const User = require("../scema/user"); 


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
        messsage:req.body.firstName+" is "+status+"in "+toUser.firstName,
        data,
    })

}catch(err){
    res.status(404).send("error occured "+err);
}
})

module.exports = requestRouter;