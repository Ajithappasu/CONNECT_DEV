const  express = require('express');

const app = express();
const connectDB= require("./config/DataBase")
const User = require("./scema/user");

// we use this middleWare to  convert  json format request data to  java script object format. 
app.use(express.json());
// we use use middleware because it can be used in all routes and all typres (get, post etc).




// to display the data of the users
app.get("/getdata", async (req,res)=>{
    // this User is the one we iported from above 
  const allUsers = await User.find({});
  res.send(allUsers);

});

// display dat of single user by emaild 
app.get("/getone", async (req, res)=>{
    const oneUser = await User.findOne({emailId: "appasuajithsai111@gmail.com"})
    res.send(oneUser);
})
/// to delete use by id 
app.delete("/delete",  async (req, res)=>{
    const id = req.body.id;
    console.log(id);
    await User.findByIdAndDelete({_id:id });
    res.send("deleted successfully ");
})

// to update user by id 
app.patch("/update",async (req, res)=>{
    const  ID = req.body.Id;
    const data = req.body;
    await User.findByIdAndUpdate({_id:ID}, data );
    res.send("updated succesfully");

})






app.post("/signup", async(req,res)=>{
    // we are getting data in   raw formmt in the request body  
const user = new User(req.body);
// geting data from body ;
try{
await user.save();
res.send("data saved successfully");
}catch(err){
    res.send("error oucered ");
}
})

connectDB()
.then(()=>{
    console.log("connection established ");
// ew have to run the server only when the database is connected successfully .
    app.listen(30000,()=>{
console.log("server successful listining on   ajith 3000.....");
});
})
.catch(()=>{
    console.log("error not connected ");
})
