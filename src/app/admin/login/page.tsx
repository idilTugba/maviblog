'use client';

import Login from '@/components/login/00login';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Login />
    </div>
  );
}

