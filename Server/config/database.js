const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () =>{
    mongoose
    .connect(MONGODB_URL)
    .then((res) => {
        console.log("Database Connection Succesful...!!");
    })
    .catch((err) => {
        console.log(`DB Connection Failed`);
        console.log(err);
        process.exit(1);
    });
};