const mongoos = require("mongoose");

// const URL ="mongodb+srv://appasuajithsai111_db_user:H3gyD9SP6eVM0ysg@nodejs.gbkvb2j.mongodb.net/";

const connectDB = async ()=>{
    await mongoos.connect("mongodb+srv://appasuajithsai111_db_user:H3gyD9SP6eVM0ysg@nodejs.gbkvb2j.mongodb.net/");
};

connectDB()
.then(()=>{
    console.log("connection established ");
})
.catch(()=>{
    console.log("error not connected ");
})