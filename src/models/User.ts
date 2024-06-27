import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  fullname: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password") && this.password) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error as mongoose.CallbackError);
    }
  } else {
    next();
  }
});

const User = mongoose.models.User || mongoose.model<IUser>("user", userSchema);

export default User;
