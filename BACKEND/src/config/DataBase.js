const mongoose = require("mongoose");

// const URL ="mongodb+srv://appasuajithsai111_db_user:H3gyD9SP6eVM0ysg@nodejs.gbkvb2j.mongodb.net/";

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://appasuajithsai111_db_user:lQXmGrAJMfz8Iayt@nodejs.gbkvb2j.mongodb.net/dev_user");
};
module.exports =connectDB;
