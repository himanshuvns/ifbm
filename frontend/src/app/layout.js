import './globals.css';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import BackgroundMusic from '@/components/BackgroundMusic/BackgroundMusic';

export const metadata = {
  title: 'Indian Football Bachao Movement | Indian Football Deserves Better',
  description:
    'Indian Football Bachao Movement — a community-driven initiative supporting the growth, development and future of Indian football.',
  keywords: [
    'Indian football',
    'football movement',
    'Indian Football Bachao',
    'grassroots football',
    'Indian football development',
  ],
  openGraph: {
    title: 'Indian Football Bachao Movement',
    description:
      'A community-driven initiative supporting the growth, development and future of Indian football.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Indian Football Bachao Movement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Football Bachao Movement',
    description:
      'A community-driven initiative supporting the growth, development and future of Indian football.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}
