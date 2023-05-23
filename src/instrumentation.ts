export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initChatServer } = await import('./server/socket-server');
    await initChatServer();
  }
}
