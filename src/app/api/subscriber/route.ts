import { NextResponse } from 'next/server';
import Subscriber from '@/models/Subscriber';
import dbConnect from '@/utils/dbconnect';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Geçerli bir e-posta girin.' }, { status: 400 });
  }

  try {
    // MongoDB bağlantısı
    await dbConnect();
    console.log("bağlantı başarılı");
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Zaten abonesiniz.' });
    }

    await Subscriber.create({ email });

    return NextResponse.json({ message: 'Abonelik başarılı!' }, { status: 201 });
  } catch (error) {
    console.error('Abonelik hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
