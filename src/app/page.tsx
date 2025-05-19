import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CoursesSection from '@/components/CoursesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'مركز أ/ أشرف حسن للرياضيات',
  description: 'مركز تعليمي متخصص في تدريس الرياضيات للمرحلة الثانوية. خبرة 20 عاماً، نتائج متميزة، ومذكرات شرح حصرية.',
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
