import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getAuthUser } from '@/utils/auth';

/**
 * On-demand revalidation endpoint
 * 
 * Kullanım:
 * POST /api/revalidate?path=/&secret=YOUR_SECRET
 * POST /api/revalidate?path=/blog/123&secret=YOUR_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    // Secret kontrolü (opsiyonel ama önerilir)
    const secret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.REVALIDATE_SECRET || 'your-secret-key';

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Geçersiz secret key' },
        { status: 401 }
      );
    }

    // Authentication kontrolü (opsiyonel)
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    const path = request.nextUrl.searchParams.get('path');
    const tag = request.nextUrl.searchParams.get('tag');

    if (path) {
      // Belirli bir path'i yeniden oluştur
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now(),
      });
    }

    if (tag) {
      // Belirli bir tag'i yeniden oluştur
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        now: Date.now(),
      });
    }

    // Ana sayfa ve blog listesini yeniden oluştur
    revalidatePath('/');
    revalidatePath('/blog');

    return NextResponse.json({
      revalidated: true,
      message: 'Ana sayfa ve blog listesi yeniden oluşturuldu',
      now: Date.now(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation hatası' },
      { status: 500 }
    );
  }
}

