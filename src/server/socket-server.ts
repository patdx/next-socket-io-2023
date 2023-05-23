import { createServer } from 'http';
import { pid } from 'node:process';
import { threadId } from 'node:worker_threads';
import { Server } from 'socket.io';
// import { listen } from 'async-listen';
// import { checkPort } from 'get-port-please';

const PORT = 3200;

export async function initChatServer() {
  // const portAvailable = await checkPort(PORT);

  // if (!portAvailable) {
  //   console.warn(
  //     `Port ${PORT} is already in use, will not spawn another websocket server.`
  //   );
  // }

  console.log(
    `Starting socket.io server with runtime=${process.env.NEXT_RUNTIME} pid=${pid} threadId=${threadId} port=${PORT} jestWorkerId=${process.env.JEST_WORKER_ID}`
  );

  const httpServer = createServer();

  const io = new Server(httpServer, {
    serveClient: false,
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.send('Connected to socket!');

    const timer = setInterval(() => {
      socket.send(`Server update at ${Date.now()}`);
    }, 1000);

    socket.on('disconnect', () => {
      console.log('Disconnected');
      clearInterval(timer);
    });
  });

  httpServer.on('error', (err) => {
    if ((err as any).code === 'EADDRINUSE') {
      console.warn(
        `Tried to start a server on port ${PORT} but it is already in use`
      );
    } else {
      console.warn(`Failed to start a server for unknown reason:`);
      console.log(err);
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`Socket.io listening on port ${PORT}`);
  });
}
