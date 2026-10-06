import type { Metadata } from 'next';
import { ThemeProvider } from '../components/theme/ThemeProvider';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Jaydeep Kadiya | Backend Developer',
  description: 'Backend developer specialising in PHP, Node.js, SQL databases, REST APIs, and AWS cloud deployment.',
  metadataBase: new URL('https://jaydeepkadiya-resume.vercel.app'),
  openGraph: {
    title: 'Jaydeep Kadiya | Backend Developer',
    description: 'Backend developer specialising in PHP, Node.js, SQL databases, REST APIs, and AWS cloud deployment.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
