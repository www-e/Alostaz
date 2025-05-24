import Link from 'next/link';
import Image from 'next/image';
import { FaSquareRootAlt, FaInfinity, FaChartLine } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] pt-12 pb-16 md:pt-20 md:pb-20 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] overflow-hidden hero-section">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 -z-5 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(var(--primary)/10 1px, transparent 1px), linear-gradient(90deg, var(--primary)/10 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          animation: 'gradientMove 20s linear infinite'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-200px)] py-1 lg:py-0 lg:h-[calc(100vh-200px)]">
          {/* Hero Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-right">
            <div className="backdrop-blur-sm bg-[var(--bg-card)]/10 p-8 rounded-2xl border border-[var(--border-light)]/20 shadow-lg transform transition-all duration-500 hover:translate-y-[-5px] hover:shadow-xl">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 font-sans">
                <span className="hero-title whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600">
                  أ/ أشرف حسن
                </span>
              </h1>
              <p className="text-2xl md:text-3xl mb-6 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                الأستاذ في الرياضيات للمرحلة الثانوية
              </p>
              <p className="text-lg text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-8 leading-relaxed">
                خبرة أكثر من ٣٠ عاماً في تبسيط المفاهيم الرياضية وتحقيق نتائج متميزة للطلاب
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                <Link 
                  href="/registration" 
                  className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:translate-y-[-2px] flex items-center gap-2 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">🔥</span>
                  <span>حجز الترم الثاني</span>
                </Link>
                <Link 
                  href="/public/login" 
                  className="bg-gradient-to-r from-secondary to-secondary-dark text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:translate-y-[-2px] flex items-center gap-2 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">🔑</span>
                  <span>تسجيل الدخول</span>
                </Link>
                <Link 
                  href="#contact" 
                  className="bg-gradient-to-r from-accent to-accent-dark text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:translate-y-[-2px] flex items-center gap-2 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">📞</span>
                  <span>تواصل معي</span>
                </Link>
                <Link 
                  href="#courses" 
                  className="bg-white dark:bg-[var(--bg-card)] text-primary dark:text-primary-light border border-primary/30 dark:border-primary-light/30 px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-primary/5 dark:hover:bg-primary/10 hover:translate-y-[-2px] flex items-center gap-2 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">🎓</span>
                  <span>استكشف الصفوف</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full lg:w-[45%] flex justify-center items-center mt-6 lg:mt-0 hero-content">
            <div className="relative w-full max-w-xs md:max-w-md">
              {/* Profile Image Container */}
              <div className="relative w-full pb-[120%] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hero-image-container">
                <Image 
                  src="/assets/images/Alostaz_Hero_photo.webp" 
                  alt="أ/ أشرف حسن"
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 35vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20 animate-breathe" style={{ animationDuration: '6s' }}>
                <FaSquareRootAlt className="text-primary text-2xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20 animate-float-slow" style={{ animationDuration: '14s' }}>
                <FaInfinity className="text-secondary text-2xl" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20 animate-float" style={{ animationDuration: '10s' }}>
                <FaChartLine className="text-accent text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
