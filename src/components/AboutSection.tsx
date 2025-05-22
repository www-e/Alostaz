'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaIdCard, FaQrcode, FaClock, FaChartLine, FaUserCheck, FaBookReader, FaTasks } from 'react-icons/fa';

interface BookCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const BookCard = ({ imageSrc, title, description }: BookCardProps) => {
  return (
    <div className="relative group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200/20 dark:border-gray-700/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-blue-500/30 flex flex-col h-full">
      {/* Book Cover Image */}
      <div className="relative w-full pt-[140%] overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-center">
          {title}
        </h4>
        
        <p className="text-gray-600 dark:text-gray-400 text-base mb-6 text-center flex-grow">
          {description}
        </p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <span className="text-xs px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
              متوفر للتحميل
            </span>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-2 group-hover:gap-3 duration-300">
              عرض التفاصيل
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/30 rounded-2xl pointer-events-none transition-all duration-500"></div>
    </div>
  );
};

const AboutSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const target = document.querySelector('#about');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section 
      id="about" 
      className={`py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/assets/images/grid-pattern.svg')] opacity-[0.03] bg-center"></div>
        <div className="absolute top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto relative">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl font-bold text-blue-500/10 dark:text-blue-500/20">
            التعليم
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 relative">
            <span className="relative z-10 inline-block">
              المركز التعليمي
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
            نظام تعليمي متكامل للمرحلة الثانوية مصمم لمساعدة الطلاب على تحقيق أقصى استفادة من قدراتهم
          </p>
        </div>

        {/* Student ID Card Section */}
        <div className={`relative overflow-hidden group flex flex-col lg:flex-row items-center gap-12 mb-24 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-lg transform transition-all duration-700 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full filter blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full filter blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="transform transition-all duration-700 hover:translate-y-[-5px]">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl">
                  <FaIdCard />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">بطاقة الطالب الذكية</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">نظام متكامل لمتابعة حضور وأداء الطلاب مع تقارير دورية للأهل</p>
              <ul className="space-y-5">
                {[
                  { 
                    icon: <FaIdCard />, 
                    text: 'بطاقة تعريف شخصية لكل طالب',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  { 
                    icon: <FaQrcode />, 
                    text: 'نظام باركود للحضور اليومي',
                    color: 'from-green-500 to-emerald-500'
                  },
                  { 
                    icon: <FaClock />, 
                    text: 'تسجيل وقت الحضور والانصراف',
                    color: 'from-amber-500 to-yellow-500'
                  },
                  { 
                    icon: <FaChartLine />, 
                    text: 'متابعة مستوى التقدم والأداء',
                    color: 'from-purple-500 to-pink-500'
                  },
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-center gap-4 group transition-all duration-300 hover:translate-x-2"
                  >
                    <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}>
                      {item.icon}
                    </span>
                    <span className="text-gray-900 dark:text-white text-lg font-medium transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse z-0" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative w-full max-w-4xl mx-auto perspective-1000">
                <div 
                  className={`relative w-full h-full transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                    cursor: 'pointer',
                    height: 'auto',
                    paddingTop: '63.06%' /* 1/1.586 ≈ 0.6306 */
                  }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  {/* Card Front */}
                  <div 
                    className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl hover:shadow-blue-500/20"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)'
                    }}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <Image 
                        src="/assets/images/student-card-front.webp" 
                        alt="بطاقة الطالب الأمامية" 
                        fill
                        sizes="(max-width: 768px) 95vw, (max-width: 1024px) 85vw, 60vw"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div 
                    className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl hover:shadow-blue-500/20"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/assets/images/student-card-back.webp" 
                          alt="بطاقة الطالب الخلفية" 
                          fill
                          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 30vw"
                          className="object-contain"
                          priority
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  </div>
              </div>
              
              <div className="text-center mt-6 text-gray-600 dark:text-gray-400">
                <p className="text-sm">انقر على البطاقة لعرض {isFlipped ? 'الوجه الأمامي' : 'الوجه الخلفي'}</p>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Attendance System */}
        <div className={`relative overflow-hidden mt-32 mb-32 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-200`}>
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-xl transform transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="w-full lg:w-1/2">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl">
                    <FaUserCheck />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">نظام الإشعارات الذكي</h3>
                </div>
                
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-green-500/20 transition-all duration-500 hover:shadow-green-500/10 hover:border-green-500/40 group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex-shrink-0 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-green-500/20">
                      <span className="text-2xl text-green-500">✓</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-green-500 transition-colors duration-300">إشعار حضور</h4>
                        <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">اليوم 10:30 صباحاً</span>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                        تم تسجيل حضور الطالب أحمد محمد في حصة الرياضيات للصف الثاني الثانوي وبدء المحاضرة في الموعد المحدد
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-red-500/20 transition-all duration-500 hover:shadow-red-500/10 hover:border-red-500/40 group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex-shrink-0 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-red-500/20">
                      <span className="text-2xl text-red-500">✗</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-500 transition-colors duration-300">إشعار غياب</h4>
                        <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full">اليوم 4:30 مساءً</span>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                        السلام عليكم، نود إبلاغكم أن الطالب قد تغيب اليوم عن الحصة في الموعد المحدد 4:30 مساءً، كود الطالب std-1339
                      </p>
                      <div className="mt-2 px-3 py-1.5 bg-gradient-to-r from-red-500/5 to-transparent border-r-2 border-red-500/30 text-sm text-red-500 rounded">
                        حصة الرياضيات - الصف الثاني الثانوي
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-6">نظام الحضور والمتابعة</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                    نظام متكامل لمتابعة حضور الطلاب والاشتراكات والواجبات مع تقارير دورية للأهل ومتابعة مستمرة للمستوى
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
                  {[
                    { 
                      icon: <FaUserCheck className="text-white" />, 
                      title: 'الحضور', 
                      desc: 'متابعة يومية مع إشعارات فورية للأهل',
                      gradient: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      icon: <FaBookReader className="text-white" />, 
                      title: 'الاشتراك', 
                      desc: 'متابعة شهرية وتذكير قبل انتهاء الاشتراك',
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    { 
                      icon: <FaTasks className="text-white" />, 
                      title: 'الواجبات', 
                      desc: 'متابعة أسبوعية وتقييم مستمر للمستوى',
                      gradient: 'from-amber-500 to-orange-500'
                    },
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="group bg-gradient-to-br from-gray-100/50 to-transparent dark:from-gray-800/50 dark:to-transparent p-5 rounded-xl border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{item.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className={`relative overflow-hidden mt-32 mb-32 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-300`}>
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16 max-w-4xl mx-auto relative pt-6">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 relative">
                <span className="relative z-10 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">
                  الكتب والمذكرات
                </span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                مذكرات وكتب متخصصة لجميع المراحل الدراسية مع شرح مبسط وتمارين متنوعة تغطي جميع أجزاء المنهج
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* First Grade Book */}
              <BookCard 
                imageSrc="/assets/images/BookCoverGrade1.webp"
                title="الصف الأول الثانوي"
                description="الرياضيات عام"
              />
              
              {/* Second Grade Books */}
              <BookCard 
                imageSrc="/assets/images/BookCoverGrade2.webp"
                title="الصف الثاني الثانوي"
                description="الرياضيات التطبيقية"
              />
              
              <BookCard 
                imageSrc="/assets/images/BookCoverGrade2scintific.webp"
                title="الصف الثاني الثانوي"
                description="الرياضيات البحتة"
              />
              
              {/* Third Grade Book */}
              <BookCard 
                imageSrc="/assets/images/BookCoverGrade3.webp"
                title="الصف الثالث الثانوي"
                description="الرياضيات للثانوية"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;