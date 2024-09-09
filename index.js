const dotenv = require("dotenv");
const mongoose = require("mongoose")

dotenv.config();

async function dbConnect(){
    const url = process.env.MONGODB_URI
    console.log(url)
    try{
        await mongoose.connect(url)
        console.log("connected successfully")
        mongoose.connection.close();
    }catch (error){
        console.error('db connection is fail ', error )
    }
}

dbConnect();