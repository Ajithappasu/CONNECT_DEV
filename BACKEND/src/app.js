const express = require('express');
const app = express();
const connectDB = require("./config/DataBase")
const cookieParser = require("cookie-parser");
// we use this middleWare to  convert  json format request data to  java script object format. 
// we use use middleware because it can be used in all routes and all typres (get, post etc)
app.use(express.json());
// we use this middle ware so tha we can read cookie 
app.use(cookieParser());

const authRouter = require("./routes/routerAuth");
const profileRouter = require("./routes/profile");
const requestRouter= require("./routes/request");
const userRouter = require("./routes/user")
app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB()
    .then(() => {
        console.log("connection established ");
        // ew have to run the server only when the database is connected successfully .
        app.listen(30000, () => {
            console.log("server successful listining on   ajith 3000.....");
        });
    })
    .catch(() => {
        console.log("error not connected ");
    })
