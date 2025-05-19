import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaSquareRootAlt, FaChartLine, FaTasks, FaGraduationCap } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'الصف الثاني الثانوي - أ/ أشرف حسن',
  description: 'دروس وشروحات ومراجعات للصف الثاني الثانوي - الرياضيات البحتة والتطبيقية',
};

export default function Grade2() {
  const subjects = [
    {
      id: 'pure',
      title: 'بحتة',
      description: 'دروس وشروحات الرياضيات البحتة',
      icon: <FaSquareRootAlt className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1T3wIaq3n140fSC_nwAo1r7Y0kgA6MpK4',
      buttonText: 'ابدأ التعلم',
    },
    {
      id: 'applied',
      title: 'تطبيقية',
      description: 'دروس وشروحات الرياضيات التطبيقية',
      icon: <FaChartLine className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1-9jl4l5BT8v0Pi_-ihaP1Wah5o0RW-Mw',
      buttonText: 'ابدأ التعلم',
    },
    {
      id: 'homework',
      title: 'واجب',
      description: 'الواجبات والتمارين المطلوبة',
      icon: <FaTasks className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1M15HPrEPRovzyIW9yBxbPI0T4fBmGosa',
      buttonText: 'عرض الواجب',
    },
    {
      id: 'finals',
      title: 'المراجعات النهائية',
      description: 'مراجعات شاملة للامتحانات',
      icon: <FaGraduationCap className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1KpVUFpfFQVpTNxhZqPNM7Os-0G-N9YeN',
      buttonText: 'ابدأ المراجعة',
    },
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] pt-32 pb-16 bg-gradient-to-br from-secondary/90 to-secondary-dark text-white overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الصف الثاني الثانوي</h1>
          <p className="text-xl text-white/80">
            اختر المادة التي تريد دراستها
          </p>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Curriculum Overview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">نظرة عامة على المنهج</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">المواضيع الرئيسية في منهج الصف الثاني الثانوي</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pure Math Topics */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-light flex items-center gap-2">
                <FaSquareRootAlt />
                الرياضيات البحتة
              </h3>
              <ul className="space-y-3">
                {[
                  'التفاضل وتطبيقاته',
                  'التكامل وتطبيقاته',
                  'الهندسة التحليلية',
                  'المتجهات في المستوى',
                  'الأعداد المركبة',
                  'المصفوفات والمحددات',
                ].map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary dark:text-primary-light mt-1">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Applied Math Topics */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-secondary dark:text-secondary-light flex items-center gap-2">
                <FaChartLine />
                الرياضيات التطبيقية
              </h3>
              <ul className="space-y-3">
                {[
                  'الإحصاء الوصفي',
                  'الاحتمالات',
                  'التوزيعات الاحتمالية',
                  'الديناميكا',
                  'الاستاتيكا',
                  'البرمجة الخطية',
                ].map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary dark:text-secondary-light mt-1">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Study Tips */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">نصائح للدراسة</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">نصائح للتفوق في الرياضيات للصف الثاني الثانوي</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <div className="space-y-6">
                {[
                  {
                    title: 'الفهم قبل الحفظ',
                    description: 'ركز على فهم المفاهيم الأساسية قبل محاولة حفظ القوانين والصيغ الرياضية.',
                  },
                  {
                    title: 'التدريب المستمر',
                    description: 'حل أكبر عدد ممكن من التمارين المتنوعة لتثبيت المعلومات وتطوير مهارات حل المسائل.',
                  },
                  {
                    title: 'الربط بين الموضوعات',
                    description: 'حاول ربط الموضوعات المختلفة ببعضها البعض، فالرياضيات مترابطة بشكل كبير.',
                  },
                  {
                    title: 'المراجعة الدورية',
                    description: 'خصص وقتاً للمراجعة الدورية للموضوعات السابقة حتى لا تنساها مع الوقت.',
                  },
                  {
                    title: 'الاستعانة بالمصادر المتنوعة',
                    description: 'استخدم مصادر متنوعة للتعلم مثل الكتب والفيديوهات التعليمية والتطبيقات.',
                  },
                ].map((tip, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
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
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2">
      <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light mb-4">
        {subject.icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{subject.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{subject.description}</p>
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
