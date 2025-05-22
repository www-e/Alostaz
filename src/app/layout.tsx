import './globals.css';
import { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Providers } from './providers';

// Metadata for the application
export const metadata: Metadata = {
  title: 'مركز الأستاذ التعليمي',
  description: 'مركز تعليمي متخصص للمرحلة الثانوية. خبرة متميزة، نتائج ممتازة، ومذكرات شرح حصرية.',
  icons: {
    icon: '/assets/favicon/edu.ico',
  },
};

// Font configuration
const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-50 transition-colors duration-300">
        {/* Dynamically import Providers to avoid SSR issues with Chakra UI */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
