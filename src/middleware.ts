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

  // strip trailing slash otherwise
  if (pathname.endsWith('/')) {
    // !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
    // req.nextUrl.pathname += '/';

    const url = new NextURL(
      req.nextUrl.pathname.replace(/\/$/, ''),
      req.nextUrl
    );

    // console.log('Redirect to ' + url);
    return NextResponse.redirect(url);
  }
}
