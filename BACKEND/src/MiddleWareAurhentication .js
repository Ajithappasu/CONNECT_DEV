const  express = require('express');

const app = express();
// why we use middleware and  next 
// it is used for authentication   
app.use("/user",(req,res, next)=>{
  const authentication =true;
  if(!authentication){
    console.log("from error")
  res.status(404).send("error tocken missing ");
  }else{
 next();
  }
});
app.get("/user", (req, res, next)=>{
  next();
});
app.get("/user", (req, res, next)=>{
  next();
});
app.get("/user", (req, res, next)=>{

  res.send("hello  from request handler");
});
app.listen(30000,()=>{
console.log("server successful listining on   ajith 3000.....");
});