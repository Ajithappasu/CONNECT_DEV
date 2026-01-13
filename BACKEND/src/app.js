const  express = require('express');

const app = express();

// creating server 


app.use("/about",(req,res)=>{
    res.end("this is ajith sai .");
})

app.use("/users",(req,res)=>{
    res.end("ajith is the uese..");
})
// always keep the home route at lsasrt
app.use("/",(req,res)=>{
    res.end("heloo eatch and every one bbbb ....");
})

app.listen(30000,()=>{
console.log("server successful listining on   ajith 3000.....");
});