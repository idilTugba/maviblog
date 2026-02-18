import mongoose from 'mongoose';

// MongoDB bağlantısını cache'le (Next.js App Router için)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  const url: string | undefined = process.env.MONGODB_URI;
  
  if (!url) {
    throw new Error('MONGODB_URI environment variable is not defined. Please check your .env file.');
  }

  mongoose.set('strictQuery', false);

  // Eğer zaten bağlıysa, mevcut bağlantıyı döndür
  if (cached.conn) {
    console.log('✅ Using existing MongoDB connection');
    return cached.conn;
  }

  // Eğer bağlantı kuruluyorsa, mevcut promise'i döndür (duplicate connection'ları önlemek için)
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(url, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error: any) => {
      cached.promise = null; // Hata durumunda promise'i temizle
      console.error('❌ MongoDB connection error:', error.message);
      throw new Error(`MongoDB bağlantı hatası: ${error.message}. Lütfen MongoDB'nin çalıştığından emin olun.`);
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default dbConnect;
