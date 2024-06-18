import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  content: string;
  authorId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  images?: string[];
  videos?: string[];
}

const blogPostSchema: Schema<IBlogPost> = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  images: [String],
  videos: [String],
});

const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", blogPostSchema);

export default BlogPost;
