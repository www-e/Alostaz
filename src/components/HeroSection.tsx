import Link from 'next/link';
import Image from 'next/image';
import { FaSquareRootAlt, FaInfinity, FaChartLine } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary dark:text-primary-light">أ/ أشرف حسن</span>
              <span className="block text-2xl md:text-3xl mt-3 text-gray-700 dark:text-gray-300">
                الأستاذ في الرياضيات للمرحلة الثانوية
              </span>
            </h1>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 mt-8">
              <Link 
                href="/registration" 
                className="btn-primary glow-button"
              >
                حجز الترم الثاني
              </Link>
              <Link 
                href="#contact" 
                className="btn-outline"
              >
                تواصل معي
              </Link>
              <Link 
                href="/auth/login" 
                className="btn-outline"
              >
                التسجيل
              </Link>
              <Link 
                href="#courses" 
                className="btn-outline"
              >
                استكشف الصفوف
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Profile Image */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-xl">
                <Image 
                  src="/src/assets/images/Alostaz_Hero_photo.webp" 
                  alt="أ/ أشرف حسن"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                  unoptimized
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg text-primary transform -translate-y-1/4 translate-x-1/4">
                <FaSquareRootAlt className="text-xl" />
              </div>
              <div className="absolute bottom-10 right-0 w-14 h-14 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg text-primary transform translate-x-1/2">
                <FaInfinity className="text-lg" />
              </div>
              <div className="absolute bottom-0 left-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg text-primary transform translate-y-1/4">
                <FaChartLine className="text-base" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
