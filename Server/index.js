const database = require("./config/database");
const express = require("express");
const app = express();
const dotenv = require("dotenv");

//loading environment variables
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Database connection establishment
const conectDB = async() =>{
    try{
        database.connect();
    }catch(err){
        console.log(err.message);
    }
}
conectDB();


//Testing the server
app.get("/", (req,res) =>{
    return res.json({
        success : true,
        message : "Your server is up and running ...",
    });
});

//Listening the port
app.listen(PORT, () =>{
    console.log(`App is listening at port: ${PORT}`);
});