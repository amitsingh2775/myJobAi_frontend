import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export async function getToken(): Promise<DecodedToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}