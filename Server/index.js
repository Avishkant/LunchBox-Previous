const database = require("./config/database");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const orderRoutes = require('./routes/order');
const cookieParser = require("cookie-parser");
const cors = require("cors");
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

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);


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