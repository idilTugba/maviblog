/**
 * MongoDB'deki kullanıcıları listeleme scripti
 *
 * Kullanım:
 * npm run list-users
 */

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

// User modeli
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 5 },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function listUsers() {
  try {
    // MongoDB bağlantısı
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Hata: MONGODB_URI environment variable tanımlı değil');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB bağlantısı başarılı\n');

    // Tüm kullanıcıları getir
    const users = await User.find({})
      .select('username fullname createdAt')
      .lean();

    if (users.length === 0) {
      console.log('📭 Henüz kullanıcı kaydı yok.');
      console.log('\nYeni kullanıcı oluşturmak için:');
      console.log('npm run create-user <username> "<fullname>" <password>');
    } else {
      console.log(`📋 Toplam ${users.length} kullanıcı bulundu:\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. Kullanıcı Adı: ${user.username}`);
        console.log(`   Tam Ad: ${user.fullname}`);
        console.log(
          `   Oluşturulma: ${
            user.createdAt
              ? new Date(user.createdAt).toLocaleString('tr-TR')
              : 'Bilinmiyor'
          }`
        );
        console.log('');
      });
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

listUsers();
