import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  content: string;
  authorId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  images?: string[];
  videos?: string;
  like?: number;
  category: string;
  featured?: boolean;
}

const blogPostSchema: Schema<IBlogPost> = new mongoose.Schema({
  title: { type: String, required: [true, 'Server Error! Başlık boş olamaz!'] },
  content: {
    type: String,
    required: [true, 'Server Error! İçerik boş olamaz! '],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [false, 'Kullanıcı girişi yapınız.'],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  images: [String],
  videos: String,
  like: { type: Number, default: 0 },
  category: {
    type: String,
    required: [true, 'Server Error! Kategori belirtilmeli.'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
},{ collection: 'blogposts' });

blogPostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // Like alanı undefined veya null ise 0 yap
    if (returnedObject.like === undefined || returnedObject.like === null) {
      returnedObject.like = 0;
    }
  },
});

const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;
