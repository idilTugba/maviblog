/**
 * MongoDB'ye kullanıcı oluşturma scripti
 * 
 * Kullanım:
 * node scripts/create-user.js <username> <fullname> <password>
 * 
 * Örnek:
 * node scripts/create-user.js mavinese "Mavi Neşe" gogekezomavi
 */

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User modeli
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 5 },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createUser() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Kullanım: node scripts/create-user.js <username> <fullname> <password>');
    console.error('Örnek: node scripts/create-user.js mavinese "Mavi Neşe" gogekezomavi');
    process.exit(1);
  }

  const [username, fullname, password] = args;

  if (username.length < 5) {
    console.error('Hata: Kullanıcı adı en az 5 karakter olmalıdır');
    process.exit(1);
  }

  if (password.length < 6) {
    console.error('Hata: Şifre en az 6 karakter olmalıdır');
    process.exit(1);
  }

  try {
    // MongoDB bağlantısı
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Hata: MONGODB_URI environment variable tanımlı değil');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB bağlantısı başarılı');

    // Kullanıcı zaten var mı kontrol et
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error(`Hata: "${username}" kullanıcı adı zaten kullanılıyor`);
      await mongoose.disconnect();
      process.exit(1);
    }

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      fullname,
      password, // pre-save hook otomatik olarak hash'leyecek
    });

    await newUser.save();
    console.log('✅ Kullanıcı başarıyla oluşturuldu!');
    console.log(`   Kullanıcı Adı: ${username}`);
    console.log(`   Tam Ad: ${fullname}`);
    console.log(`   Şifre: ${password} (hash'lenmiş olarak kaydedildi)`);
    console.log('\n📝 Login bilgileri:');
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createUser();

