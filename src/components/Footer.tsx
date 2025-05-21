import Link from 'next/link';
import { FaWhatsapp, FaFacebookF, FaYoutube, FaTelegramPlane, FaHeart, FaCode, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] text-[var(--text-primary)] py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-accent rounded-full blur-[100px]"></div>
      </div>
      
      {/* Footer content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div className="backdrop-blur-sm bg-[var(--bg-card)]/10 p-6 rounded-2xl border border-[var(--border-light)]/10 shadow-lg transform transition-all duration-500 hover:translate-y-[-5px] hover:shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-primary-light bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">أ/ أشرف حسن</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              مركز تعليمي متخصص في تدريس الرياضيات للمرحلة الثانوية. خبرة 20 عاماً، نتائج متميزة، ومذكرات شرح حصرية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <SocialLink href="https://wa.me/+201227278084" icon={<FaWhatsapp />} bgColor="from-green-600 to-green-700" />
              <SocialLink href="https://www.facebook.com/@ashraf.hassan.5099940" icon={<FaFacebookF />} bgColor="from-blue-600 to-blue-700" />
              <SocialLink href="https://www.youtube.com/@mr.ashrafhassan-2365" icon={<FaYoutube />} bgColor="from-red-600 to-red-700" />
              <SocialLink href="#" icon={<FaTelegramPlane />} bgColor="from-blue-500 to-blue-600" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="backdrop-blur-sm bg-[var(--bg-card)]/10 p-6 rounded-2xl border border-[var(--border-light)]/10 shadow-lg transform transition-all duration-500 hover:translate-y-[-5px] hover:shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-primary-light bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">روابط سريعة</h3>
            <ul className="space-y-3">
              <FooterLink href="/" text="الرئيسية" />
              <FooterLink href="/about" text="نبذة عني" />
              <FooterLink href="/#courses" text="الصفوف الدراسية" />
              <FooterLink href="/schedule" text="المواعيد" />
              <FooterLink href="/registration" text="التسجيل" />
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="backdrop-blur-sm bg-[var(--bg-card)]/10 p-6 rounded-2xl border border-[var(--border-light)]/10 shadow-lg transform transition-all duration-500 hover:translate-y-[-5px] hover:shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-primary-light bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">معلومات التواصل</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-center gap-2 transition-all duration-300 hover:text-white">
                <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                العنوان: المنصورة - شارع الجمهورية
              </li>
              <li className="flex items-center gap-2 transition-all duration-300 hover:text-white">
                <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                الهاتف: 01227278084
              </li>
              <li className="flex items-center gap-2 transition-all duration-300 hover:text-white">
                <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                البريد الإلكتروني: ah8370521@gmail.com
              </li>
            </ul>
          </div>
        </div>
        
        {/* Developer Info */}
        <div className="mt-12 pt-8 text-center">
          <div className="inline-block backdrop-blur-sm bg-[var(--bg-card)]/10 p-4 rounded-2xl border border-[var(--border-light)]/10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-[var(--text-secondary)]">
              <p className="flex items-center gap-2">
                <span className="text-[var(--text-primary)]">تم التطوير بواسطة</span>
                <a 
                  href="https://wa.me/+201xxxxxxxxx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500 flex items-center gap-1"
                >
                  <FaCode className="inline-block" /> Omar
                </a>
              </p>
              <span className="hidden md:inline-block">|</span>
              <p className="flex items-center gap-2">
                جميع الحقوق محفوظة &copy; {currentYear} 
                <span className="inline-block animate-pulse">
                  <FaHeart className="text-red-500" />
                </span>
                مركز أ/ أشرف حسن للرياضيات
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-light to-transparent"></div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  bgColor: string;
}

const SocialLink = ({ href, icon, bgColor }: SocialLinkProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`bg-gradient-to-br ${bgColor} w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-6 shadow-lg hover:shadow-xl hover:shadow-primary/20`}
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink = ({ href, text }: FooterLinkProps) => {
  return (
    <li>
      <Link 
        href={href}
        className="text-[var(--text-secondary)] hover:text-primary-light transition-all duration-300 flex items-center gap-2 group"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-primary-light/50 group-hover:bg-primary-light group-hover:w-3 transition-all duration-300"></span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">{text}</span>
      </Link>
    </li>
  );
};

export default Footer;
