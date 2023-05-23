export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initChatServer } = await import('./server/socket-server');
      await initChatServer();
    } catch (err) {
      console.log('chat server errored');
    }
  }
}
