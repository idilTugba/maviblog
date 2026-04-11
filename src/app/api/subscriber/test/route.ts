import { NextResponse } from 'next/server';
import { getAuthUser } from '@/utils/auth';
import { notifySubscribersTestEmail } from '@/utils/notifySubscribersNewPost';

/**
 * POST — Giriş yapmış admin, yeni blog eklemeden bülten test e-postası tetikler.
 * Header: Authorization: Bearer <jwt>
 */
export async function POST(request: Request) {
  const user = getAuthUser(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Yetkilendirme gerekli.' },
      { status: 401 }
    );
  }

  try {
    const result = await notifySubscribersTestEmail();

    if (!result.ok) {
      if (result.reason === 'missing_env') {
        return NextResponse.json(
          {
            error:
              'RESEND_API_KEY veya EMAIL_FROM tanımlı değil; sunucu ortamını kontrol edin.',
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        {
          error:
            'Abone yok. Önce sitede footer’dan en az bir e-posta ile abone olun.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Test e-postası gönderildi.',
      sent: result.sent,
    });
  } catch (e) {
    console.error('POST /api/subscriber/test:', e);
    return NextResponse.json(
      { error: 'E-posta gönderilirken hata oluştu.' },
      { status: 500 }
    );
  }
}
