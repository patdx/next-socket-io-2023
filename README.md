# next-socket-io-2023

https://ext-socket-io-2023.onrender.com/

There is a common hack to run a socket.io server inside Next.js, something like this:

https://codedamn.com/news/nextjs/how-to-use-socket-io

```ts
import { Server } from 'Socket.IO';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('input-change', (msg) => {
        socket.broadcast.emit('update-input', msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
```

Unfortunately, as far as I can tell, it is not working for me with the latest version of Next.js when I deploy to production. With some research, I discovered that Next.js is actually running several internal servers (eg, one for app router and one for page router and proxying between them). It seems the websocket is lost in the chaos.

Some other interesting things I discovered are that the `rewrites` table "officially" supports rewriting to websocket connections, and that Next.js recently supports an instrumentation hook, which lets you do some side-effectful process on server startup.

If we combine these together, perhaps we can start a socket.io server on another port and add a rewrite to it.

It turns out this almost works!

## Enable instrumentation

Copy the `src/server/socket-server.ts` file and the following instrumentation file:

```ts
// src/instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initChatServer } = await import('./server/socket-server');
    await initChatServer();
  }
}
```

Enable instrumentationHook in next.config.js:

```js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
};
```

## Fix trailing slash

If you want to use `/socket.io/` while also keeping the standard Next.js trailing slash behavior, set:

```js
module.exports = {
  skipTrailingSlashRedirect: true,
};
```

Then add a `src/middleware.ts`:

```ts
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';

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
```
