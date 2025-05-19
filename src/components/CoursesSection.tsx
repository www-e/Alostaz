import Link from 'next/link';
import { FaBook, FaClock, FaTasks, FaCheckCircle, FaVideo, FaFilePdf, FaChalkboardTeacher, FaBrain, FaArrowLeft, FaStarOfLife } from 'react-icons/fa';

const CoursesSection = () => {
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
    <section id="courses" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">الصفوف الدراسية</h2>
          <div className="section-line"></div>
          <p className="section-subtitle">جميع صفوف الرياضيات للثانوية العامة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-transform duration-300 hover:transform hover:-translate-y-2">
      <div className="relative bg-gradient-to-r from-primary to-primary-light text-white py-3 px-4">
        <div className="flex items-center gap-2">
          <FaStarOfLife className="text-white/80" />
          <span className="font-bold">{course.title}</span>
        </div>
      </div>
      
      <div className="p-6">
        {/* Stats */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaBook className="text-primary dark:text-primary-light" />
            <span>{course.stats.lessons} درس</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-primary dark:text-primary-light" />
            <span>{course.stats.hours} ساعة</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTasks className="text-primary dark:text-primary-light" />
            <span>{course.stats.tests} اختبار</span>
          </div>
        </div>
        
        {/* Topics */}
        <div className="mb-6">
          <h4 className="font-bold text-lg mb-3">المواضيع الرئيسية</h4>
          <ul className="space-y-2">
            {course.topics.map((topic, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Features */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.features.map((feature, index) => {
              const icons = [<FaVideo key={0} />, <FaFilePdf key={1} />, <FaChalkboardTeacher key={2} />, <FaBrain key={3} />];
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-primary dark:text-primary-light">{icons[index]}</span>
                  <span className="text-sm">{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>اكتمال المنهج</span>
            <span className="font-bold">{course.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary dark:bg-primary-light rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Action Button */}
        <Link 
          href={course.link} 
          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg transition-colors duration-300"
        >
          <span>ابدأ التعلم الآن</span>
          <FaArrowLeft />
        </Link>
      </div>
    </div>
  );
};

export default CoursesSection;
