const mongoose = require("mongoose");
const User = require("../scema/user");

const sendConnectionRequestScema = new mongoose.Schema({
 fromUserId :{
    type: mongoose.Schema.ObjectId,   
    required:true,
     ref:"user",
 },
  status :{
type: String,
required : true,
enum:{
values:["ignored", "requested","accepted","rejected","intrested"],
message :"incorrect data entry value ",
},
 },
 toUserId:{
    type: mongoose.Schema.ObjectId,
    required:true,

 },

},{
    timestamps:true,
});

sendConnectionRequestScema.index({fromUserId:1, toUserId:1});

sendConnectionRequestScema.pre("save", async function (){

if(this.toUserId.equals(this.fromUserId)){
    throw new Error("you cannot send connection request to yourself ");
}
});

const ConnectionRequestModel =  new mongoose.model(
    "connectionRequest", sendConnectionRequestScema
);

module.exports = {ConnectionRequestModel};