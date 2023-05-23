import dynamic from 'next/dynamic';

export const LazySocketClient = dynamic(
  () => import('../components/socket-client'),
  {
    ssr: false,
  }
);
