import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaBook, FaTasks, FaGraduationCap } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'الصف الأول الثانوي - أ/ أشرف حسن',
  description: 'دروس وشروحات ومراجعات للصف الأول الثانوي',
};

export default function Grade1() {
  const subjects = [
    {
      id: 'general',
      title: 'عام',
      description: 'دروس وشروحات المنهج العام',
      icon: <FaBook className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1SOd2orxiMdZndD9Z142t1fh60BDT-Oda',
      buttonText: 'ابدأ التعلم',
    },
    {
      id: 'homework',
      title: 'واجب',
      description: 'الواجبات والتمارين المطلوبة',
      icon: <FaTasks className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1Bbi3b5QcQkyEMIRzLTum2JC4OTnlSmrX',
      buttonText: 'عرض الواجب',
    },
    {
      id: 'finals',
      title: 'المراجعات النهائية',
      description: 'مراجعات شاملة للامتحانات',
      icon: <FaGraduationCap className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1eKZQoD5jIY7k4IRlh5ypotxHqaa-Evs3',
      buttonText: 'ابدأ المراجعة',
    },
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] pt-32 pb-16 bg-gradient-to-br from-primary/90 to-primary-dark text-white overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الصف الأول الثانوي</h1>
          <p className="text-xl text-white/80">
            اختر المادة التي تريد دراستها
          </p>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="py-16 bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Resources Section */}
      <section className="py-16 bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">موارد إضافية</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">مصادر تعليمية إضافية للصف الأول الثانوي</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResourceCard 
              title="ملخصات الدروس"
              description="ملخصات مختصرة لجميع دروس المنهج"
              link="#"
            />
            <ResourceCard 
              title="بنك الأسئلة"
              description="مجموعة متنوعة من الأسئلة والتمارين"
              link="#"
            />
            <ResourceCard 
              title="نماذج امتحانات"
              description="نماذج امتحانات سابقة مع الحل"
              link="#"
            />
            <ResourceCard 
              title="فيديوهات شرح"
              description="شرح مرئي للمفاهيم الصعبة"
              link="#"
            />
          </div>
        </div>
      </section>
      
      {/* Study Plan Section */}
      <section className="py-16 bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">خطة الدراسة</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">خطة دراسية مقترحة للتفوق في الصف الأول الثانوي</p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <PlanStep 
                number={1}
                title="الفصل الدراسي الأول"
                description="التركيز على المفاهيم الأساسية وبناء قاعدة قوية"
              />
              <PlanStep 
                number={2}
                title="الفصل الدراسي الثاني"
                description="تعميق الفهم وحل المزيد من التمارين المتنوعة"
              />
              <PlanStep 
                number={3}
                title="المراجعة النهائية"
                description="مراجعة شاملة للمنهج وحل نماذج امتحانات"
              />
              <PlanStep 
                number={4}
                title="الاستعداد للامتحان"
                description="التركيز على النقاط المهمة والتدرب على إدارة الوقت"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

interface SubjectCardProps {
  subject: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
    buttonText: string;
  };
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <div className="bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2">
      <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light mb-4">
        {subject.icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] dark:text-[var(--text-primary)]">{subject.title}</h3>
      <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-6">{subject.description}</p>
      <a 
        href={subject.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-lg transition-colors duration-300"
      >
        {subject.buttonText}
      </a>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
}

const ResourceCard = ({ title, description, link }: ResourceCardProps) => {
  return (
    <div className="bg-[var(--bg-tertiary)] dark:bg-[var(--bg-tertiary)] rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-[var(--bg-secondary)] transition-colors duration-300">
      <h3 className="font-bold mb-2 text-[var(--text-primary)] dark:text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-3">{description}</p>
      <a 
        href={link} 
        className="text-primary dark:text-primary-light hover:underline text-sm font-medium"
      >
        اطلع على المزيد &rarr;
      </a>
    </div>
  );
};

interface PlanStepProps {
  number: number;
  title: string;
  description: string;
}

const PlanStep = ({ number, title, description }: PlanStepProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)] dark:text-[var(--text-primary)]">{title}</h3>
        <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">{description}</p>
      </div>
    </div>
  );
};
