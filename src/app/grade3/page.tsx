import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaSuperscript, FaInfinity, FaBalanceScale, FaAtom, FaTasks, FaGraduationCap } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'الصف الثالث الثانوي - أ/ أشرف حسن',
  description: 'دروس وشروحات ومراجعات للصف الثالث الثانوي - الرياضيات البحتة والتطبيقية',
};

export default function Grade3() {
  const pureMathSubjects = [
    {
      id: 'algebra',
      title: 'جبر و هندسة فراغية',
      description: 'دروس وشروحات الجبر والهندسة الفراغية',
      icon: <FaSuperscript className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1kAz0EbiMwXbtwaIebFgwqiwJlBL7jO_V',
      buttonText: 'ابدأ التعلم',
    },
    {
      id: 'calculus',
      title: 'تفاضل و تكامل',
      description: 'دروس وشروحات التفاضل والتكامل',
      icon: <FaInfinity className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1sW7xa6nrqu6zulOwEuxv4VhDHVeSEwxR',
      buttonText: 'ابدأ التعلم',
    },
  ];

  const appliedMathSubjects = [
    {
      id: 'statics',
      title: 'استاتيكا',
      description: 'دروس وشروحات الاستاتيكا',
      icon: <FaBalanceScale className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1qHA4dE7D3C7YxMtS-XqGzCk4dT_yIaus',
      buttonText: 'ابدأ التعلم',
    },
    {
      id: 'dynamics',
      title: 'ديناميكا',
      description: 'دروس وشروحات الديناميكا',
      icon: <FaAtom className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1-y6DRvKUL2HPIKKHauJaStUmapcOuEcR',
      buttonText: 'ابدأ التعلم',
    },
  ];

  const additionalResources = [
    {
      id: 'homework',
      title: 'واجب',
      description: 'الواجبات والتمارين المطلوبة',
      icon: <FaTasks className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1VLNF6WydRyWkML-YHVDtSHvSKu8iLWuz',
      buttonText: 'عرض الواجب',
    },
    {
      id: 'finals',
      title: 'المراجعات النهائية',
      description: 'مراجعات شاملة للامتحانات',
      icon: <FaGraduationCap className="text-3xl" />,
      link: 'https://drive.google.com/drive/u/3/folders/1RdNJ9GITYbOyZf7TcYMOYpS3EkcaCH56',
      buttonText: 'ابدأ المراجعة',
    },
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] pt-32 pb-16 bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الصف الثالث الثانوي</h1>
          <p className="text-xl text-white/80">
            اختر المادة التي تريد دراستها
          </p>
        </div>
      </section>
      
      {/* Pure Math Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">الرياضيات البحتة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pureMathSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Applied Math Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">الرياضيات التطبيقية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appliedMathSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Resources Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">إضافات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalResources.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Exam Tips Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">نصائح للامتحانات</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">نصائح مهمة للتفوق في امتحانات الثانوية العامة</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ExamTipCard 
                title="التنظيم والتخطيط"
                description="ضع جدولاً زمنياً منظماً للمذاكرة يشمل جميع المواد مع التركيز على نقاط الضعف"
                color="bg-blue-500"
              />
              <ExamTipCard 
                title="حل نماذج سابقة"
                description="احرص على حل أكبر عدد ممكن من نماذج الامتحانات السابقة للتعود على نمط الأسئلة"
                color="bg-green-500"
              />
              <ExamTipCard 
                title="الراحة والتغذية"
                description="احصل على قسط كافٍ من النوم وتناول غذاءً صحياً للحفاظ على التركيز والنشاط"
                color="bg-yellow-500"
              />
              <ExamTipCard 
                title="إدارة الوقت"
                description="تدرب على حل الأسئلة ضمن الوقت المحدد وتعلم كيفية توزيع الوقت بين الأسئلة المختلفة"
                color="bg-purple-500"
              />
              <ExamTipCard 
                title="المراجعة المستمرة"
                description="راجع المعلومات بشكل مستمر ولا تترك المراجعة للأيام الأخيرة قبل الامتحان"
                color="bg-red-500"
              />
              <ExamTipCard 
                title="الثقة بالنفس"
                description="ثق بقدراتك وتجنب القلق المفرط، فالثقة بالنفس تساعد على التفكير بوضوح أثناء الامتحان"
                color="bg-teal-500"
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

interface ExamTipCardProps {
  title: string;
  description: string;
  color: string;
}

const ExamTipCard = ({ title, description, color }: ExamTipCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className={`${color} h-2`}></div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};
