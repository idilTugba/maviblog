import mongoose from 'mongoose';

const dbConnect = async () => {
  console.log(process.env.MONGODB_URI);
  const url: string | undefined = process.env.MONGODB_URI;
  mongoose.set('strictQuery', false);

  if (url) {
    try {
      await mongoose.connect(url);
      console.log('connected');
    } catch (error: any) {
      console.log('error to connection on MongoDB ', error.message);
    }
  } else {
    console.log('Mongodb connection is missing');
  }
};

export default dbConnect;
