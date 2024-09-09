import dbConnect from './utils/dbconnect';

export async function register() {
  await dbConnect();
}
