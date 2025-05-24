import Link from 'next/link';
import { FaBook, FaClock, FaTasks, FaCheckCircle, FaVideo, FaFilePdf, FaChalkboardTeacher, FaBrain, FaArrowLeft, FaStarOfLife } from 'react-icons/fa';

const CoursesSection = () => {
  // Add decorative elements for the background
  const decorativeElements = [
    { top: '10%', left: '5%', size: '150px', color: 'primary', opacity: '0.05', delay: '0s', duration: '15s' },
    { top: '60%', right: '8%', size: '200px', color: 'secondary', opacity: '0.07', delay: '2s', duration: '20s' },
    { top: '30%', right: '15%', size: '100px', color: 'primary-light', opacity: '0.04', delay: '1s', duration: '18s' },
    { top: '80%', left: '20%', size: '120px', color: 'primary-dark', opacity: '0.06', delay: '3s', duration: '17s' },
  ];
  
  const courses = [
    {
      id: 1,
      title: 'الصف الأول الثانوي',
      stats: {
        lessons: 12,
        hours: 36,
        tests: 24,
      },
      topics: [
        'الجبر والمعادلات',
        'الهندسة التحليلية',
        'حساب المثلثات',
      ],
      features: [
        'فيديوهات شرح تفاعلية',
        'ملخصات وملفات PDF',
        'دروس خصوصية مباشرة',
        'تدريبات وحل مسائل',
      ],
      progress: 75,
      link: '/grade1',
    },
    {
      id: 2,
      title: 'الصف الثاني الثانوي',
      stats: {
        lessons: 14,
        hours: 42,
        tests: 28,
      },
      topics: [
        'التفاضل والتكامل',
        'الاحتمالات والإحصاء',
        'الهندسة الفراغية',
      ],
      features: [
        'شرح مفصل للمفاهيم المتقدمة',
        'مذكرات وتمارين شاملة',
        'حصص تقوية أسبوعية',
        'اختبارات دورية للتقييم',
      ],
      progress: 85,
      link: '/grade2',
    },
    {
      id: 3,
      title: 'الصف الثالث الثانوي',
      stats: {
        lessons: 16,
        hours: 48,
        tests: 32,
      },
      topics: [
        'التفاضل والتكامل المتقدم',
        'المصفوفات والمحددات',
        'التحليل الرياضي',
      ],
      features: [
        'مراجعات مكثفة للثانوية',
        'نماذج امتحانات سابقة',
        'تدريب على نظام البابل شيت',
        'حل مسائل متنوعة',
      ],
      progress: 90,
      link: '/grade3',
    },
  ];

  return (
    <section id="courses" className="py-16 md:py-20 relative overflow-hidden">
      {/* Sign in CTA */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">هل أنت طالب مسجل بالفعل؟</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">سجل الدخول الآن للوصول إلى المحتوى الكامل والدروس الخاصة بك</p>
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg"
        >
          <span className="ml-2">🔑</span>
          <span>تسجيل الدخول</span>
        </Link>
      </div>
      
      {/* Decorative background elements */}
      {decorativeElements.map((elem, index) => (
        <div 
          key={index}
          className={`absolute rounded-full bg-[var(--${elem.color})] opacity-${elem.opacity} blur-3xl animate-float-slow`}
          style={{
            top: elem.top,
            [elem.left ? 'left' : 'right']: elem.left || elem.right,
            width: elem.size,
            height: elem.size,
            animationDelay: elem.delay,
            animationDuration: elem.duration,
            zIndex: 0
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">الصفوف الدراسية</h2>
          <div className="w-32 h-1 mx-auto my-4 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full"></div>
          <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto">جميع صفوف الرياضيات للثانوية العامة مع شرح مفصل وتمارين متنوعة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    stats: {
      lessons: number;
      hours: number;
      tests: number;
    };
    topics: string[];
    features: string[];
    progress: number;
    link: string;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="group bg-[var(--bg-card)]/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[var(--border-light)]/20 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
      <div className="relative bg-gradient-to-r from-primary via-primary-light to-secondary text-white py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
            <FaStarOfLife className="text-white" />
          </div>
          <span className="font-bold text-xl">{course.title}</span>
        </div>
        
        {/* Decorative element */}
        <div className="absolute -bottom-6 right-0 w-32 h-12 bg-primary/10 rounded-tl-full blur-xl"></div>
      </div>
      
      <div className="p-6 relative">
        {/* Stats */}
        <div className="flex justify-between mb-8 bg-[var(--bg-card)]/50 p-3 rounded-xl border border-[var(--border-light)]/10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary dark:text-primary-light group-hover:scale-110 transition-transform duration-300">
              <FaBook />
            </div>
            <span className="text-sm font-medium">{course.stats.lessons} درس</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary dark:text-primary-light group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '50ms' }}>
              <FaClock />
            </div>
            <span className="text-sm font-medium">{course.stats.hours} ساعة</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary dark:text-primary-light group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '100ms' }}>
              <FaTasks />
            </div>
            <span className="text-sm font-medium">{course.stats.tests} اختبار</span>
          </div>
        </div>
        
        {/* Topics */}
        <div className="mb-8">
          <h4 className="font-bold text-lg mb-4 flex items-center">
            <span className="w-1 h-6 bg-primary rounded-full mr-2"></span>
            المواضيع الرئيسية
          </h4>
          <ul className="space-y-3">
            {course.topics.map((topic, index) => (
              <li key={index} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                  <FaCheckCircle className="text-sm" />
                </div>
                <span className="text-[var(--text-primary)]">{topic}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Features */}
        <div className="mb-8">
          <h4 className="font-bold text-lg mb-4 flex items-center">
            <span className="w-1 h-6 bg-secondary rounded-full mr-2"></span>
            المميزات
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.features.map((feature, index) => {
              const icons = [<FaVideo key={0} />, <FaFilePdf key={1} />, <FaChalkboardTeacher key={2} />, <FaBrain key={3} />];
              const colors = ['primary', 'secondary', 'primary-light', 'secondary-light'];
              return (
                <div key={index} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                  <div className={`w-8 h-8 flex items-center justify-center bg-[var(--${colors[index]})]/10 rounded-full text-[var(--${colors[index]})]`}>
                    {icons[index]}
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-[var(--text-secondary)]">اكتمال المنهج</span>
            <span className="font-bold text-primary">{course.progress}%</span>
          </div>
          <div className="w-full h-3 bg-[var(--bg-card)]/50 rounded-full overflow-hidden border border-[var(--border-light)]/10">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full" 
              style={{ width: `${course.progress}%`, transition: 'width 1s ease-in-out' }}
            ></div>
          </div>
        </div>
        
        {/* Action Button */}
        <Link 
          href={course.link} 
          className="group/btn flex items-center justify-center gap-3 w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden"
        >
          <span className="relative z-10 font-medium">ابدأ التعلم الآن</span>
          <FaArrowLeft className="relative z-10 group-hover/btn:-translate-x-1 transition-transform duration-300" />
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300"></div>
        </Link>
      </div>
    </div>
  );
};

export default CoursesSection;
