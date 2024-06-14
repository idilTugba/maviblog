import dbConnect from "./utils/dbconnect";

export async function login() {
  await dbConnect();
}
