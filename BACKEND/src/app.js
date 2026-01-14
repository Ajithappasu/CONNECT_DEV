const  express = require('express');

const app = express();
// route handler 
// multiple route handlers  , array of route handlers  
app.use("/users",[(req, res,next)=>{
 // res.send("hello everyone ");
  next();
},
(req,res, next)=>{
 //res.send("2 nd response");
 next();
},(req, res, next )=>{
 // res.send(" 3 responce ");
  next();
}], (req, res , next)=>{
 //res.send(" 4 th responce ");
 next();
},(req, res, next) =>{
 res.send("5 th rewsponce ");
}
)


app.listen(30000,()=>{
console.log("server successful listining on   ajith 3000.....");
});