import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'مركز أ/ أشرف حسن للرياضيات',
  description: 'مركز تعليمي متخصص في تدريس الرياضيات للمرحلة الثانوية. خبرة 20 عاماً، نتائج متميزة، ومذكرات شرح حصرية.',
  icons: {
    icon: '/assets/icons/edu.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
