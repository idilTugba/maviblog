import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbconnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { username, password } = await request.json();

    // Validasyon
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 401 }
      );
    }

    // Şifreyi kontrol et
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: 'Geçersiz şifre' },
        { status: 401 }
      );
    }

    // JWT token oluştur
    const token = jwt.sign(
      {
        id: user._id.toString(),
        username: user.username,
        fullname: user.fullname,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // Kullanıcı bilgilerini döndür (şifre hariç)
    return NextResponse.json(
      {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          fullname: user.fullname,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

