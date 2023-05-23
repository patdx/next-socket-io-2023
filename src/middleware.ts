import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';

// Skip redirect for these prefixes
const legacyPrefixes = ['/socket.io/'];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.next();
  }

  if (pathname.endsWith('/')) {
    const url = new NextURL(
      req.nextUrl.pathname.replace(/\/$/, ''),
      req.nextUrl
    );

    return NextResponse.redirect(url);
  }
}
