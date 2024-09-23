import dbConnect from './utils/dbconnect';

async function register() {
  await dbConnect();
}

register();
