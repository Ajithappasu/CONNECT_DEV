const mongoose = require("mongoose");
const validator= require("validator");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");


const userScema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        // by keeping this require as we are making it as  a minidate  (*)  must fill
    },
    lastName :{
        type:String,
        minLength:4,
        maxLength:20,
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
// by creating index we  can acces the elements very faster 
userScema.index({firstName:1,lastName:1});

userScema.methods.getJWT = async function (){
    const user = this;
   const token = await jwt.sign({_id: user._id},"Dev_connect",{
        expiresIn:"1d",
    });
    return token;
}

userScema.methods.validatePassword = async function(passworInputByUser){
    const user = this ;
    const passwordHash= user.password;


    const isPasswordValid= await bcrypt.compare(
        passworInputByUser,
        passwordHash

    );
    return isPasswordValid;
}
const User = mongoose.model("user", userScema);
module.exports = User
