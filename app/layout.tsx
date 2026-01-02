import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import fs from 'fs/promises';
import path from 'path';
import DataProvider from '@/context/DataProvider';
const robotoFont = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'POS System',
  description: 'Build by Sound-X',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const data = await fs.readFile(filePath, 'utf-8');

  console.log(JSON.parse(data));
  return (
    <html lang='en'>
      <DataProvider dat={data}>
        <body className={`${robotoFont.className} antialiased`}>{children}</body>
      </DataProvider>
    </html>
  );
}
