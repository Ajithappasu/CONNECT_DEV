const  express = require('express');

const app = express();

// creating server 

// use api will match all the type of users requests get post patch etc ....  

// using +,*, ? operator in  routes 

app.get("/about",(req,res)=>{
  console.log(req.query);
   res.send({firstname:"ajith_sai", lastName:"appasu"});
});
app.post("/about",(req,res)=>{
res.send("Data sent successully to the user ");
});
app.delete("/about",(req, res)=>{
    res.send("Data deleted succesfully");
});
// app.use("/users",(req,res)=>{
//     res.end("ajith is the uese..");
// })
// // always keep the home route at lsasrt
// app.use("/",(req,res)=>{
//     res.end("heloo eatch and every one bbbb ....");
// })
app.use("/about",(req,res)=>{
    res.end("this is ajith sai .");
})

app.listen(30000,()=>{
console.log("server successful listining on   ajith 3000.....");
});