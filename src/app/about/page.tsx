import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaArrowDown, FaGithub, FaLinkedin, FaTwitter, FaSquareRootAlt, FaCalculator, FaInfinity, FaBrain, FaUsers, FaChartLine, FaStar, FaQuoteRight, FaCalendarCheck, FaWhatsapp } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'نبذة عني - أ/ أشرف حسن',
  description: 'مدرس رياضيات للمرحلة الثانوية بخبرة أكثر من ٣٠ عاماً',
};

export default function About() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[80vh] pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] overflow-hidden">
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, var(--primary)/10 0, transparent 30%), radial-gradient(circle at 75% 75%, var(--secondary)/10 0, transparent 30%)',
              backgroundSize: '150px 150px',
              animation: 'gradientPulse 20s ease-in-out infinite alternate'
            }}></div>
          </div>
          
          {/* Floating gradient orbs */}
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[100px] animate-float-slow"></div>
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-[120px] animate-float-slower" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(var(--primary)/10 1px, transparent 1px), linear-gradient(90deg, var(--primary)/10 1px, transparent 1px)', 
              backgroundSize: '80px 80px',
              animation: 'gradientMove 40s linear infinite'
            }}></div>
          </div>
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${15 + Math.random() * 30}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            ></div>
          ))}
        </div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 -z-5 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(var(--primary)/10 1px, transparent 1px), linear-gradient(90deg, var(--primary)/10 1px, transparent 1px)', 
            backgroundSize: '50px 50px',
            animation: 'gradientMove 20s linear infinite'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12 min-h-[60vh] py-12">
            {/* Content */}
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-right backdrop-blur-sm bg-[var(--bg-card)]/30 dark:bg-[var(--bg-card)]/20 p-6 md:p-8 rounded-2xl border border-[var(--border-light)]/20 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group">
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transitionDelay: '0.2s' }}></div>
                
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 md:mb-6 relative">
                  <span 
                    className="relative z-10 text-[var(--primary)] dark:text-[var(--primary-light)]"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary), var(--primary-light), var(--secondary))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      animation: 'float 3s ease-in-out infinite'
                    }}
                  >
                    الأستاذ
                  </span>
                </h2>
                
                <p className="text-lg md:text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-6 md:mb-8 leading-relaxed">
                  مدرس رياضيات للمرحلة الثانوية بخبرة أكثر من ٣٠ عاماً في تبسيط المفاهيم الرياضية وتحقيق نتائج متميزة للطلاب
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4">
                  <button className="btn-primary flex items-center gap-2 group px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base">
                    <FaCalendarCheck className="group-hover:rotate-12 transition-all duration-300" />
                    <span>احجز حصة خاصة</span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
                  </button>
                  
                  <Link 
                    href="https://wa.me/+201227278084" 
                    className="relative flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 text-sm sm:text-base group"
                  >
                    <FaWhatsapp className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>تواصل عبر واتساب</span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Profile Image */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
                
                {/* Profile Image Container */}
                <div className="relative w-full h-full">
                  {/* Floating math elements */}
                  <div className="absolute -top-6 -right-6 z-20">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm group-hover:bg-primary/20 transition-all duration-500 w-12 h-12"></div>
                      <FaSquareRootAlt className="relative z-10 text-primary text-2xl m-2 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 z-20" style={{ animationDelay: '0.5s' }}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-secondary/10 rounded-full blur-sm group-hover:bg-secondary/20 transition-all duration-500 w-12 h-12"></div>
                      <FaCalculator className="relative z-10 text-secondary text-2xl m-2 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 -right-6 z-20 transform -translate-y-1/2" style={{ animationDelay: '1s' }}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm group-hover:bg-accent/20 transition-all duration-500 w-12 h-12"></div>
                      <FaInfinity className="relative z-10 text-accent text-2xl m-2 group-hover:rotate-180 transition-transform duration-1000" />
                    </div>
                  </div>
                  
                  {/* Profile Image */}
                  <div className="relative z-10 overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl group isolate w-full h-full">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay"></div>
                    
                    {/* Image with parallax effect */}
                    <div className="relative h-full w-full overflow-hidden">
                      <Image 
                        src="/assets/images/Alostaz_Hero_photo.webp" 
                        alt="أ/ أشرف حسن"
                        width={600}
                        height={600}
                        className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1"
                        priority
                        sizes="(max-width: 768px) 90vw, 50vw"
                      />
                    </div>
                    
                    {/* Decorative frame */}
                    <div className="absolute inset-0 border-4 border-white/5 rounded-xl pointer-events-none transition-all duration-700 group-hover:border-white/20 group-hover:scale-[0.98]"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 w-40 h-40 md:w-52 md:h-52 rounded-full bg-primary/5 blur-3xl -bottom-10 -right-10"></div>
              <div className="absolute -z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary/5 blur-3xl -top-10 -left-10"></div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-[var(--text-secondary)]/60 group cursor-pointer">
            <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">مرر للأسفل</span>
            <div className="w-8 h-12 rounded-full border-2 border-[var(--text-secondary)]/30 p-1.5">
              <div className="w-1 h-3 bg-[var(--text-secondary)]/60 rounded-full animate-bounce mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] relative overflow-hidden">
        {/* Enhanced background with floating elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(var(--primary)/10 1px, transparent 1px), linear-gradient(90deg, var(--primary)/10 1px, transparent 1px)', 
              backgroundSize: '50px 50px',
              animation: 'gradientMove 30s linear infinite'
            }}></div>
          </div>
          
          {/* Floating gradient orbs */}
          <div className="absolute -left-20 top-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[80px] animate-float-slow"></div>
          <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] animate-float-slower" style={{ animationDelay: '1s' }}></div>
          
          {/* Decorative border gradients */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Floating shapes */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-primary/10 animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 rounded-full bg-secondary/10 animate-float-slower" style={{ animationDelay: '0.7s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 relative z-10">
            <div className="inline-block relative group">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary relative z-10">
                فلسفتي التعليمية
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 -z-10 transition-all duration-500"></div>
            </div>
            <div className="w-24 h-1 mx-auto my-6 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full transform transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"></div>
            <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              مبادئ وقيم توجه مسيرتي التعليمية وتساعد الطلاب على تحقيق أفضل النتائج
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PhilosophyCard 
              icon={<FaBrain />}
              title="الفهم قبل الحفظ"
              description="أؤمن بأن فهم المفاهيم الرياضية أهم من حفظ القوانين والمعادلات. أساعد الطلاب على بناء فهم عميق للمفاهيم الرياضية."
            />
            <PhilosophyCard 
              icon={<FaUsers />}
              title="التعليم الشخصي"
              description="لكل طالب أسلوبه الخاص في التعلم، وأنا أسعى لتقديم تعليم يناسب كل طالب ويراعي الفروق الفردية."
            />
            <PhilosophyCard 
              icon={<FaChartLine />}
              title="التطور المستمر"
              description="أسعى دائماً لتطوير أساليبي التعليمية ومواكبة أحدث الطرق التربوية لتحقيق أفضل النتائج."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] dark:from-[var(--bg-secondary)] dark:to-[var(--bg-primary)] relative overflow-hidden">
        {/* Enhanced background with floating elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, var(--accent)/10 0, transparent 20%), radial-gradient(circle at 75% 75%, var(--accent)/10 0, transparent 20%)',
              backgroundSize: '100px 100px',
              animation: 'gradientPulse 15s ease-in-out infinite alternate'
            }}></div>
          </div>
          
          {/* Floating gradient orbs */}
          <div className="absolute -left-20 bottom-1/3 w-80 h-80 bg-accent/20 rounded-full blur-[80px] animate-float-slower"></div>
          <div className="absolute -right-20 top-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '0.7s' }}></div>
          
          {/* Animated border gradients */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          
          {/* Enhanced floating stars */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`absolute text-yellow-500/60 animate-float-${i % 2 === 0 ? 'slow' : 'slower'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 16 + 12}px`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3 + Math.random() * 0.7,
                transform: `scale(${0.5 + Math.random()})`
              }}
            >
              <FaStar />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 relative z-10">
            <div className="inline-block relative group">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent via-yellow-400 to-accent relative z-10">
                ألمع الطلاب
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-accent to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/5 to-yellow-400/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 -z-10 transition-all duration-500"></div>
            </div>
            <div className="w-24 h-1 mx-auto my-6 bg-gradient-to-r from-yellow-400 via-accent to-yellow-400 rounded-full transform transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"></div>
            <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              تجارب طلابنا المتميزين وقصص نجاحهم مع منهجنا التعليمي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <TestimonialCard 
              text="أسلوب شرح ممتاز وبسيط، ساعدني كثيراً في فهم المواضيع الصعبة وتطبيقها في حل المسائل المعقدة. أصبحت الرياضيات مادتي المفضلة."
              name="أحمد محمد"
              role="طالب في الصف الثالث الثانوي"
              image="/assets/images/student1.webp"
            />
            <TestimonialCard 
              text="حصلت على الدرجة النهائية في الرياضيات بفضل شرح الأستاذ أشرف وطريقته المميزة في تبسيط المفاهيم. أنصح كل طالب بالانضمام إلى فصوله."
              name="سارة أحمد"
              role="طالبة في الصف الثاني الثانوي"
              image="/assets/images/student2.webp"
            />
            <TestimonialCard 
              text="أسلوب تدريس مميز وتمارين متنوعة ساعدتني على التفوق والحصول على أعلى الدرجات. الأستاذ أشرف يجعل الرياضيات ممتعة وسهلة الفهم."
              name="محمود خالد"
              role="طالب في الصف الأول الثانوي"
              image="/assets/images/student3.webp"
            />
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] relative overflow-hidden">
        {/* Enhanced background with floating elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(var(--primary)/10 1px, transparent 1px), linear-gradient(90deg, var(--primary)/10 1px, transparent 1px)', 
              backgroundSize: '50px 50px',
              animation: 'gradientMove 30s linear infinite'
            }}></div>
          </div>
          
          {/* Floating gradient orbs */}
          <div className="absolute -left-20 top-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[80px] animate-float-slow"></div>
          <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] animate-float-slower" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Animated border gradients */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: '0.7s' }}></div>
          
          {/* Floating dots */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${15 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.2 + Math.random() * 0.5,
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 relative z-10">
            <div className="inline-block relative group">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary relative z-10">
                خبرتي التعليمية
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 -z-10 transition-all duration-500"></div>
            </div>
            <div className="w-24 h-1 mx-auto my-6 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full transform transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"></div>
            <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              مسيرة تعليمية حافلة بالتطور والنجاح على مدى أكثر من 30 عاماً
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative border-r-4 border-gradient-r-primary-secondary pr-10">
              {/* Timeline items */}
              <TimelineItem 
                year="1993 - 2000"
                title="بداية مسيرتي التعليمية"
                description="بدأت العمل كمدرس للرياضيات في المدارس الحكومية والخاصة واكتسبت خبرة في طرق التدريس المختلفة"
                icon={<FaCalculator />}
              />
              
              <TimelineItem 
                year="2000 - 2010"
                title="تأسيس مركز تعليمي"
                description="افتتاح أول مركز تعليمي متخصص في الرياضيات للمرحلة الثانوية وتطوير منهجية تعليمية مبتكرة"
                icon={<FaUsers />}
              />
              
              <TimelineItem 
                year="2010 - 2020"
                title="تطوير المناهج التعليمية"
                description="تطوير مناهج ومذكرات خاصة لتبسيط المفاهيم الرياضية المعقدة وتحقيق نتائج متميزة للطلاب"
                icon={<FaBrain />}
              />
              
              <TimelineItem 
                year="2020 - الآن"
                title="التعليم الإلكتروني"
                description="إطلاق منصة تعليمية إلكترونية لتوفير الدروس عبر الإنترنت ومواكبة التطور التكنولوجي في التعليم"
                icon={<FaInfinity />}
                isLast={true}
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

interface PhilosophyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PhilosophyCard = ({ icon, title, description }: PhilosophyCardProps) => {
  return (
    <div className="bg-[var(--bg-card)] dark:bg-[var(--bg-card)] rounded-2xl shadow-lg p-6 text-center transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-xl border border-[var(--border-light)] hover:border-[var(--primary-light)]/30 group">
      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 rounded-full flex items-center justify-center text-primary dark:text-primary-light text-3xl mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)] dark:text-[var(--text-primary)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">{title}</h3>
      <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard = ({ text, name, role, image }: TestimonialCardProps) => {
  return (
    <div className="bg-[var(--bg-card)] dark:bg-[var(--bg-card)] rounded-2xl shadow-lg p-8 relative transition-all duration-500 hover:shadow-xl hover:transform hover:-translate-y-2 border border-[var(--border-light)] hover:border-accent/30 group overflow-hidden">
      {/* Background gradient */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      
      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-accent/20 dark:text-accent/30 text-5xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
        <FaQuoteRight />
      </div>
      
      {/* Testimonial text */}
      <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-8 relative z-10 leading-relaxed">{text}</p>
      
      {/* Student info */}
      <div className="flex items-center">
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-accent/20 group-hover:border-accent/50 transition-all duration-500 shadow-md">
          <Image 
            src={image} 
            alt={name}
            width={56}
            height={56}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div>
          <h4 className="font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)] group-hover:text-accent transition-colors duration-300">{name}</h4>
          <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">{role}</p>
        </div>
      </div>
      
      {/* Decorative star */}
      <div className="absolute bottom-4 left-4 text-accent/20 dark:text-accent/30 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-45">
        <FaStar />
      </div>
    </div>
  );
};

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}

const TimelineItem = ({ year, title, description, icon, isLast = false }: TimelineItemProps) => {
  return (
    <div className={`mb-10 ${isLast ? '' : 'pb-10'}`}>
      {/* Timeline node */}
      <div className="absolute right-[-12px] w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-900 animate-pulse"></div>
      </div>
      
      {/* Timeline card */}
      <div className="bg-[var(--bg-card)] dark:bg-[var(--bg-card)] p-6 rounded-2xl shadow-lg border border-[var(--border-light)] hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:transform hover:-translate-y-1 group">
        {/* Year badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-gradient-to-r from-primary to-secondary text-white text-sm px-4 py-1.5 rounded-full font-medium">{year}</span>
          
          {/* Icon */}
          {icon && (
            <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light text-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              {icon}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] dark:text-[var(--text-primary)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">{title}</h3>
        <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">{description}</p>
      </div>
    </div>
  );
};
