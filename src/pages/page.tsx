import { LazySocketClient } from '@/components/lazy-socket-client';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className='py-2 flex gap-2'>
        <Link href='/' className='text-blue-800 underline'>
          App Router
        </Link>
        <Link href='/page' className='text-blue-800 underline font-bold'>
          Page Router
        </Link>
      </div>
      <LazySocketClient />
    </>
  );
}
