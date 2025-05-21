import Link from 'next/link';
import Image from 'next/image';
import { FaSquareRootAlt, FaInfinity, FaChartLine } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] overflow-hidden">
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
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 h-[calc(100vh-120px)]">
          {/* Hero Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-right">
            <div className="backdrop-blur-sm bg-[var(--bg-card)]/10 p-8 rounded-2xl border border-[var(--border-light)]/20 shadow-lg transform transition-all duration-500 hover:translate-y-[-5px] hover:shadow-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">
                <span className="inline-block animate-float" style={{ animationDelay: '0s' }}>أ</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.1s' }}>/</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.2s' }}> </span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.3s' }}>أ</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.4s' }}>ش</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.5s' }}>ر</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.6s' }}>ف</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.7s' }}> </span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.8s' }}>ح</span>
                <span className="inline-block animate-float" style={{ animationDelay: '0.9s' }}>س</span>
                <span className="inline-block animate-float" style={{ animationDelay: '1.0s' }}>ن</span>
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
                  href="#contact" 
                  className="bg-gradient-to-r from-secondary to-secondary-dark text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:translate-y-[-2px] flex items-center gap-2 group"
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
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Profile Image */}
              <div className="hero-image-clip">
                <Image 
                  src="/assets/images/Alostaz_Hero_photo.webp" 
                  alt="أ/ أشرف حسن"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              
              {/* Decorative elements */}
              <div className="decoration-item item-1">
                <FaSquareRootAlt />
              </div>
              <div className="decoration-item item-2">
                <FaInfinity />
              </div>
              <div className="decoration-item item-3">
                <FaChartLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
