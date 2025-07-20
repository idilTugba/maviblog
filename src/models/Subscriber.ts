import mongoose, { Schema } from "mongoose";

export interface ISubscriber extends mongoose.Document {
  email: string;
  subscribedAt: Date;
}   

const subscriberSchema : Schema<ISubscriber>  = new mongoose.Schema({
  email: { type: String, required: [true, "E-posta boş olamaz!"], unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;