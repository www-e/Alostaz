import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaSquareRootAlt, FaCalculator, FaInfinity, FaBrain, FaUsers, FaChartLine, FaStar, FaQuoteRight, FaCalendarCheck, FaWhatsapp } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'نبذة عني - أ/ أشرف حسن',
  description: 'مدرس رياضيات للمرحلة الثانوية بخبرة أكثر من ٣٠ عاماً',
};

export default function About() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] pt-32 pb-16 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 h-[calc(80vh-120px)]">
            {/* Content */}
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-right backdrop-blur-sm bg-[var(--bg-card)]/10 p-8 rounded-2xl border border-[var(--border-light)]/20 shadow-lg transform transition-all duration-500 hover:translate-y-[-5px] hover:shadow-xl">
                <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">
                  <span className="inline-block animate-float" style={{ animationDelay: '0s' }}>ا</span>
                  <span className="inline-block animate-float" style={{ animationDelay: '0.1s' }}>ل</span>
                  <span className="inline-block animate-float" style={{ animationDelay: '0.2s' }}>أ</span>
                  <span className="inline-block animate-float" style={{ animationDelay: '0.3s' }}>س</span>
                  <span className="inline-block animate-float" style={{ animationDelay: '0.4s' }}>ت</span>
                  <span className="inline-block animate-float" style={{ animationDelay: '0.5s' }}>ا</span>
                  <span className="inline-block animate-float" style={{ animationDelay: '0.6s' }}>ذ</span>
                </h2>
                <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-8 leading-relaxed">
                  مدرس رياضيات للمرحلة الثانوية بخبرة أكثر من ٣٠ عاماً في تبسيط المفاهيم الرياضية وتحقيق نتائج متميزة للطلاب
                </p>
                <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                  <button className="btn-primary flex items-center gap-2 group">
                    <FaCalendarCheck className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>احجز حصة خاصة</span>
                  </button>
                  <Link 
                    href="https://wa.me/+201227278084" 
                    className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:translate-y-[-2px] group"
                  >
                    <FaWhatsapp className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>تواصل عبر واتساب</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Profile Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
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
                  <FaCalculator />
                </div>
                <div className="decoration-item item-3">
                  <FaInfinity />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="absolute -left-20 top-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">فلسفتي التعليمية</h2>
            <div className="w-24 h-1 mx-auto my-4 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full"></div>
            <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto">مبادئ وقيم توجه مسيرتي التعليمية وتساعد الطلاب على تحقيق أفضل النتائج</p>
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
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="absolute -left-20 bottom-1/3 w-80 h-80 bg-accent/20 rounded-full blur-[80px]"></div>
          <div className="absolute -right-20 top-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[80px]"></div>
          
          {/* Floating stars */}
          <div className="absolute top-1/4 left-1/4 text-yellow-500 text-2xl animate-float-slow">
            <FaStar />
          </div>
          <div className="absolute top-3/4 left-1/3 text-yellow-500 text-lg animate-float-slow" style={{ animationDelay: '1.5s' }}>
            <FaStar />
          </div>
          <div className="absolute top-1/3 right-1/4 text-yellow-500 text-xl animate-float-slow" style={{ animationDelay: '0.8s' }}>
            <FaStar />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent via-yellow-400 to-accent">ألمع الطلاب</h2>
            <div className="w-24 h-1 mx-auto my-4 bg-gradient-to-r from-yellow-400 via-accent to-yellow-400 rounded-full"></div>
            <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto">تجارب طلابنا المتميزين وقصص نجاحهم مع منهجنا التعليمي</p>
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
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="absolute -left-20 top-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[80px]"></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(var(--primary)/10 1px, transparent 1px), linear-gradient(90deg, var(--primary)/10 1px, transparent 1px)', 
              backgroundSize: '50px 50px',
              animation: 'gradientMove 30s linear infinite'
            }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">خبرتي التعليمية</h2>
            <div className="w-24 h-1 mx-auto my-4 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full"></div>
            <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto">مسيرة تعليمية حافلة بالتطور والنجاح على مدى أكثر من 30 عاماً</p>
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
