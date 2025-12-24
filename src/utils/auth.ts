import jwt from 'jsonwebtoken';
import { IUser } from '@/models/User';

export interface DecodedToken {
  id: string;
  username: string;
  fullname: string;
}

/**
 * Request header'ından token'ı alır ve doğrular
 * @param authHeader Authorization header değeri (örn: "Bearer token123")
 * @returns Decoded token veya null
 */
export function verifyToken(authHeader: string | null): DecodedToken | null {
  if (!authHeader) {
    return null;
  }

  try {
    // "Bearer " prefix'ini kaldır
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * Request'ten token'ı alır ve doğrular
 * @param request Next.js Request objesi
 * @returns Decoded token veya null
 */
export function getAuthUser(request: Request): DecodedToken | null {
  const authHeader = request.headers.get('authorization');
  return verifyToken(authHeader);
}

