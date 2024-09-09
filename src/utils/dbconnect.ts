import mongoose from 'mongoose';

const dbConnect = async () => {
  console.log(process.env.MONGODB_URI);
  const url: string | undefined = process.env.MONGODB_URI;
  mongoose.set('strictQuery', false);
  if (url) {
    mongoose
      .connect(url)
      .then((result) => {
        console.log('connected');
      })
      .catch((err) => {
        console.log('error to connection on MongoDB ', err.message);
      });
  } else {
    console.log('Mongodb connection is missing');
  }
};

export default dbConnect;
