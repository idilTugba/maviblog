const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

async function testDbConnection() {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://mavi:mavikezogoge@zulal.dndcvtu.mongodb.net/";

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

testDbConnection();
