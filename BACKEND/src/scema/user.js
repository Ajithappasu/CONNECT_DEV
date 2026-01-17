const mongoose = require("mongoose");
const validator= require("validator");

const userScema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        // by keeping this require as we are making it as  a minidate  (*)  must fill
    },
    lastName :{
        type:String,
        minLength:4,
    },
    emailId :{
        type: String,
        required : true,
        unique :true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("it is not a valid email");
            }
        }
    },
    password :{
        type:String,
        required :true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("not strong passwors");
            }
        }
    },
    age :{
        type:Number,
        min:18,
        max:50,
    },
    gender:{
        type: String,
  validate(value){
   if(!["male","female","others"].includes(value)){
      throw new Error("Gender data not valid");  
   }
  },
    },
    about:{
        type:String,
        default:"this is defalut about",
    },
    photo_url:{
        type:String,
        default:"https://icon-library.com/images/user-icon-jpg/user-icon-jpg-29.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("not valid URL");
            }
        }
    },
    skills :{
        type: [String],
    }

},{
    timestamps:true,
}) ;

const User = mongoose.model("user", userScema);
module.exports = User
