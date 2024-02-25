import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }
}

export const config = {
  matcher: [
    '/z/:path*/submit',
    '/z/:path*/edit',
    '/z/create',
    '/communities',
    '/notifications',
    '/u/:path*/edit',
    '/following',
    '/messages',
    '/messages/u/:path*',
  ],
};
