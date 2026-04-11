import { Resend } from 'resend';
import Subscriber from '@/models/Subscriber';
import dbConnect from '@/utils/dbconnect';

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;
  return 'http://localhost:3000';
}

function buildEmailHtml(title: string, postUrl: string) {
  const safeTitle = escapeHtml(title);
  return `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #222;">
  <p>Merhaba,</p>
  <p>Sitede yeni bir yazı yayınlandı: <strong>${safeTitle}</strong></p>
  <p><a href="${postUrl}" style="color: #2563eb;">Yazıyı okumak için tıklayın</a></p>
  <p style="font-size: 0.875rem; color: #666;">Bu e-postayı almak istemiyorsanız lütfen bizimle iletişime geçin.</p>
</body>
</html>`;
}

/**
 * Yeni blog yayınında abonelere e-posta gönderir.
 * Ortam değişkenleri: RESEND_API_KEY, EMAIL_FROM (örn. "Mavi Blog <onboarding@resend.dev>")
 * Üretimde kendi doğrulanmış alan adınızdan gönderin.
 */
export async function notifySubscribersNewPost(params: {
  title: string;
  postId: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    console.warn(
      '[notifySubscribersNewPost] RESEND_API_KEY veya EMAIL_FROM tanımlı değil; e-posta atlandı.'
    );
    return;
  }

  await dbConnect();
  const rows = await Subscriber.find().select('email').lean();
  const emails = rows
    .map((r) => (r as { email?: string }).email)
    .filter((e): e is string => typeof e === 'string' && e.includes('@'));

  if (emails.length === 0) {
    return;
  }

  const origin = getSiteOrigin();
  const postUrl = `${origin}/blog/${params.postId}`;
  const subject = `Yeni yazı: ${params.title}`;
  const html = buildEmailHtml(params.title, postUrl);

  const resend = new Resend(apiKey);
  const batchSize = 5;

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    await Promise.all(
      batch.map((to) =>
        resend.emails.send({
          from,
          to,
          subject,
          html,
        })
      )
    );
  }

  console.log(
    `[notifySubscribersNewPost] ${emails.length} aboneye bildirim gönderildi.`
  );
}

function buildTestEmailHtml(listUrl: string) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #222;">
  <p>Merhaba,</p>
  <p>Bu, <strong>yeni yazı eklemeden</strong> gönderilen bir <strong>test</strong> e-postasıdır. Bülten altyapınız çalışıyor.</p>
  <p><a href="${listUrl}" style="color: #2563eb;">Blog yazılarına git</a></p>
  <p style="font-size: 0.875rem; color: #666;">Bu e-postayı almak istemiyorsanız lütfen bizimle iletişime geçin.</p>
</body>
</html>`;
}

export type SubscriberNotifyTestResult =
  | { ok: true; sent: number }
  | { ok: false; reason: 'missing_env' | 'no_subscribers' };

/**
 * Yeni blog olmadan abonelere test maili (yalnızca güvenilir uç noktadan çağrılmalı).
 */
export async function notifySubscribersTestEmail(): Promise<SubscriberNotifyTestResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    console.warn(
      '[notifySubscribersTestEmail] RESEND_API_KEY veya EMAIL_FROM tanımlı değil.'
    );
    return { ok: false, reason: 'missing_env' };
  }

  await dbConnect();
  const rows = await Subscriber.find().select('email').lean();
  const emails = rows
    .map((r) => (r as { email?: string }).email)
    .filter((e): e is string => typeof e === 'string' && e.includes('@'));

  if (emails.length === 0) {
    return { ok: false, reason: 'no_subscribers' };
  }

  const origin = getSiteOrigin();
  const listUrl = `${origin}/blog`;
  const subject = '[Test] Mavi Blog bülteni';
  const html = buildTestEmailHtml(listUrl);

  const resend = new Resend(apiKey);
  const batchSize = 5;

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    await Promise.all(
      batch.map((to) =>
        resend.emails.send({
          from,
          to,
          subject,
          html,
        })
      )
    );
  }

  console.log(
    `[notifySubscribersTestEmail] ${emails.length} aboneye test e-postası gönderildi.`
  );

  return { ok: true, sent: emails.length };
}
