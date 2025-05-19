import Link from 'next/link';
import { FaWhatsapp, FaFacebookF, FaYoutube, FaTelegramPlane, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-light">أ/ أشرف حسن</h3>
            <p className="text-gray-300 mb-4">
              مركز تعليمي متخصص في تدريس الرياضيات للمرحلة الثانوية. خبرة 20 عاماً، نتائج متميزة، ومذكرات شرح حصرية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <SocialLink href="https://wa.me/+201227278084" icon={<FaWhatsapp />} bgColor="bg-green-600" />
              <SocialLink href="https://www.facebook.com/@ashraf.hassan.5099940" icon={<FaFacebookF />} bgColor="bg-blue-600" />
              <SocialLink href="https://www.youtube.com/@mr.ashrafhassan-2365" icon={<FaYoutube />} bgColor="bg-red-600" />
              <SocialLink href="#" icon={<FaTelegramPlane />} bgColor="bg-blue-500" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-light">روابط سريعة</h3>
            <ul className="space-y-2">
              <FooterLink href="/" text="الرئيسية" />
              <FooterLink href="/about" text="نبذة عني" />
              <FooterLink href="/#courses" text="الصفوف الدراسية" />
              <FooterLink href="/schedule" text="المواعيد" />
              <FooterLink href="/registration" text="التسجيل" />
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-light">معلومات التواصل</h3>
            <ul className="space-y-2 text-gray-300">
              <li>العنوان: المنصورة - شارع الجمهورية</li>
              <li>الهاتف: 01227278084</li>
              <li>البريد الإلكتروني: ah8370521@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-1">
            جميع الحقوق محفوظة &copy; {currentYear} - مركز أ/ أشرف حسن للرياضيات - تم التطوير بواسطة 
            <FaHeart className="text-red-500" /> Next.js و Tailwind CSS
          </p>
        </div>
      </div>
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
      className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110`}
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
        className="text-gray-300 hover:text-primary-light transition-colors duration-300"
      >
        {text}
      </Link>
    </li>
  );
};

export default Footer;
