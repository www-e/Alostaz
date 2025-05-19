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
      <section className="relative min-h-[70vh] pt-32 pb-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            {/* Content */}
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-right">
                <h2 className="text-5xl font-bold mb-6 text-primary dark:text-primary-light animate-pulse">الأستاذ</h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">مدرس رياضيات للمرحلة الثانوية بخبرة أكثر من ٣٠ عاماً</p>
                <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                  <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors duration-300">
                    <FaCalendarCheck />
                    احجز حصة خاصة
                  </button>
                  <Link 
                    href="https://wa.me/+201227278084" 
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                  >
                    <FaWhatsapp />
                    تواصل عبر واتساب
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Profile Image */}
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
                  <FaCalculator className="text-lg" />
                </div>
                <div className="absolute bottom-0 left-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg text-primary transform translate-y-1/4">
                  <FaInfinity className="text-base" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">فلسفتي في التدريس</h2>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-0.5 w-16 bg-secondary"></div>
              <FaSquareRootAlt className="text-primary dark:text-primary-light text-xl" />
              <div className="h-0.5 w-16 bg-secondary"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <PhilosophyCard 
              icon={<FaBrain />}
              title="التفكير النقدي"
              description="تطوير مهارات التفكير المنطقي والتحليلي لدى الطلاب"
            />
            <PhilosophyCard 
              icon={<FaUsers />}
              title="التعلم التفاعلي"
              description="بيئة تعليمية تفاعلية تشجع على المشاركة والنقاش"
            />
            <PhilosophyCard 
              icon={<FaChartLine />}
              title="التطور المستمر"
              description="متابعة مستمرة لتقدم الطلاب وتطوير أساليب التدريس"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">ألمع الطلاب</h2>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-0.5 w-16 bg-secondary"></div>
              <FaStar className="text-yellow-500 text-xl" />
              <div className="h-0.5 w-16 bg-secondary"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <TestimonialCard 
              text="أسلوب شرح ممتاز وبسيط، ساعدني كثيراً في فهم المواضيع الصعبة"
              name="أحمد محمد"
              role="طالب في الصف الثالث الثانوي"
              image="/assets/images/student1.webp"
            />
            <TestimonialCard 
              text="حصلت على الدرجة النهائية في الرياضيات بفضل شرح الأستاذ أشرف"
              name="سارة أحمد"
              role="طالبة في الصف الثاني الثانوي"
              image="/assets/images/student2.webp"
            />
            <TestimonialCard 
              text="أسلوب تدريس مميز وتمارين متنوعة ساعدتني على التفوق"
              name="محمود خالد"
              role="طالب في الصف الأول الثانوي"
              image="/assets/images/student3.webp"
            />
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">خبرتي التعليمية</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative border-r-4 border-primary dark:border-primary-light pr-10">
              {/* Timeline items */}
              <TimelineItem 
                year="1993 - 2000"
                title="بداية مسيرتي التعليمية"
                description="بدأت العمل كمدرس للرياضيات في المدارس الحكومية والخاصة"
              />
              
              <TimelineItem 
                year="2000 - 2010"
                title="تأسيس مركز تعليمي"
                description="افتتاح أول مركز تعليمي متخصص في الرياضيات للمرحلة الثانوية"
              />
              
              <TimelineItem 
                year="2010 - 2020"
                title="تطوير المناهج التعليمية"
                description="تطوير مناهج ومذكرات خاصة لتبسيط المفاهيم الرياضية المعقدة"
              />
              
              <TimelineItem 
                year="2020 - الآن"
                title="التعليم الإلكتروني"
                description="إطلاق منصة تعليمية إلكترونية لتوفير الدروس عبر الإنترنت"
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition-transform duration-300 hover:transform hover:-translate-y-2">
      <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative">
      <div className="absolute top-6 right-6 text-primary/20 dark:text-primary/30 text-4xl">
        <FaQuoteRight />
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">{text}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image 
            src={image} 
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem = ({ year, title, description, isLast = false }: TimelineItemProps) => {
  return (
    <div className={`mb-8 ${isLast ? '' : 'pb-8'}`}>
      <div className="absolute right-[-8px] w-4 h-4 rounded-full bg-primary dark:bg-primary-light"></div>
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full mb-2">{year}</span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};
