import mongoose from "mongoose";

const connection = {
  isConnected: 0,
};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://mavinese:mavikezogego@maviblog.voaf4zo.mongodb.net/";

  try {
    const db = await mongoose.connect(uri);
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected:", db.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default dbConnect;
