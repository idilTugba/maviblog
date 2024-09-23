import mongoose, { Document, Schema } from 'mongoose';

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
  title: { type: String, required: [true, 'Başlık boş olamaz!'] },
  content: { type: String, required: [true, 'İçerik boş olamaz! '] },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [false, 'Kullanıcı girişi yapınız.'],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  images: [String],
  videos: [String],
});

blogPostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;
