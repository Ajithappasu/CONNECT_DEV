const express = require("express");
const userRouter = express.Router();
const { userAuth}= require("../middlewares/auth");
const  {ConnectionRequestModel} = require("../scema/connectionRequest");
const User = require("../scema/user")


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

userRouter.get("/feed",userAuth, async(req, res)=>{
    // in feed we only send new users to loggined user 
    // we will not send  accepted , ignored or  intrested ones and him self 
    try{
        const loggedInUser =  req.user;
        // we are finding the users  who are  who are already in connection with user
      const connectionRequests =  await ConnectionRequestModel.find({
        $or:[{fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}],
      }).select("fromUserId   toUserId");
   // adding the  user to set for uniqness 
      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((req) => {
        hideUsersFromFeed.add(req.toUserId),
        hideUsersFromFeed.add(req.fromUserId)
      });
// from all the users we are finding the users   witch are not includde in set 
      const users = await User.find({  
       $and :[
      {  _id:{$nin: Array.from(hideUsersFromFeed)}},
      { _id :{ $ne : loggedInUser._id}}
      ]}).select(UserSafeData);

 res.send(users);

    }catch(err){
        res.status(404).send("error occured "+err);
    }
})
module.exports= userRouter;