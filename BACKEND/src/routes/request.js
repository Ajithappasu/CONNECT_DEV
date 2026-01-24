const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest",userAuth,async(req, res)=>{
// sending connection request
const user = req.user;

res.send("sending connection request"+user.firstName);
})

module.exports = requestRouter;