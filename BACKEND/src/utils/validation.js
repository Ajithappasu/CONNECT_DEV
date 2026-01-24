const validator = require("validator");


const validateSignUpData = (req)=>{
    const {firstName, lastName, emailId, password} =req.body;
     if(!firstName || !lastName){
        throw new Error("name is not valid ");
     }
     if(!validator.isEmail(emailId)){
        throw new Error("not a valid email");
     }
     if(!validator.isStrongPassword(password)){
        throw new Error("not a strong password");
     }
}
const validEditProfileData =(req)=>{
   const allowedFileds =[
      "firstName","lastName","password","age","gender","about","photo_url","skills"
   ]   
   const isEditAllowed = Object.keys(req.body).every((field)=>{
      allowedFileds.includes(field);
   })
   return isEditAllowed;

}
module.exports= {validateSignUpData, validEditProfileData};