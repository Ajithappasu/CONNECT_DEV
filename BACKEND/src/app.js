const  express = require('express');

const app = express();
const connectDB= require("./config/DataBase")
const User = require("./scema/user");

app.use(express.json());


app.post("/signup", async(req,res)=>{
const user = new User(req.body);
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
