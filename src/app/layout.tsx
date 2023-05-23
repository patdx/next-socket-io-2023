import '../globals.css';

export const metadata = {
  title: 'Socket.io 2023',
  description: 'Socket io test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='p-4'>{children}</body>
    </html>
  );
}
