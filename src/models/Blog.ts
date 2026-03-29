import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  content: string;
  authorId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  images?: string[];
  imageCaption?: string;
  videos?: string;
  like?: number;
  category: string;
  featured?: boolean;
  /** Detay sayfası görünümü: parşömen veya beyaz akışan düzen */
  detailVariant?: 'default' | 'clean';
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
  imageCaption: String,
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
  detailVariant: {
    type: String,
    enum: ['default', 'clean'],
    default: 'default',
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

// Next.js dev modunda schema değişikliklerini algılamak için cache temizle
if (process.env.NODE_ENV === 'development' && mongoose.models.BlogPost) {
  delete mongoose.models.BlogPost;
}

const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;
