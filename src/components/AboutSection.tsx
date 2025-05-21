'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaIdCard, FaQrcode, FaClock, FaChartLine, FaUserCheck, FaBookReader, FaTasks } from 'react-icons/fa';

const AboutSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] dark:from-[var(--bg-secondary)] dark:to-[var(--bg-primary)] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute -left-20 top-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[80px]"></div>
        <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">المركز التعليمي</h2>
          <div className="w-24 h-1 mx-auto my-4 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full"></div>
          <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto">نظام تعليمي متكامل للمرحلة الثانوية يساعد الطلاب على تحقيق أفضل النتائج</p>
        </div>

        {/* Student ID Card Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 bg-[var(--bg-card)]/30 backdrop-blur-sm p-8 rounded-2xl border border-[var(--border-light)]/20 shadow-lg">
          <div className="w-full lg:w-1/2">
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">بطاقة الطالب الذكية</h3>
              <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-8 leading-relaxed">نظام متكامل لمتابعة حضور وأداء الطلاب مع تقارير دورية للأهل</p>
              <ul className="space-y-5">
                {[
                  { icon: <FaIdCard />, text: 'بطاقة تعريف شخصية لكل طالب' },
                  { icon: <FaQrcode />, text: 'نظام باركود للحضور اليومي' },
                  { icon: <FaClock />, text: 'تسجيل وقت الحضور والانصراف' },
                  { icon: <FaChartLine />, text: 'متابعة مستوى التقدم والأداء' },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 group transition-all duration-300 hover:translate-x-2">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center text-primary dark:text-primary-light text-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/20">
                      {item.icon}
                    </span>
                    <span className="text-[var(--text-primary)] dark:text-[var(--text-primary)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="perspective-1000 relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-glow z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-pulse-glow z-0" style={{ animationDelay: '1s' }}></div>
              
              <div 
                className={`relative w-full aspect-[1.586] transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''} shadow-2xl hover:shadow-primary/20 z-10`}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Card Front */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border-4 border-[var(--primary)]/30"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image 
                    src="/assets/images/student-card-front.webp" 
                    alt="بطاقة الطالب الأمامية" 
                    width={400} 
                    height={252}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                
                {/* Card Back */}
                <div 
                  className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border-4 border-[var(--primary)]/30"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <Image 
                    src="/assets/images/student-card-back.webp" 
                    alt="بطاقة الطالب الخلفية" 
                    width={400} 
                    height={252}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </div>
              
              <div className="text-center mt-6 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                <p className="text-sm">انقر على البطاقة لعرض {isFlipped ? 'الوجه الأمامي' : 'الوجه الخلفي'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance System */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-20 bg-[var(--bg-card)]/30 backdrop-blur-sm p-8 rounded-2xl border border-[var(--border-light)]/20 shadow-lg">
          <div className="w-full lg:w-1/2">
            <div className="transform transition-all duration-500 hover:translate-y-[-5px] space-y-6">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary mb-6">نظام الإشعارات الذكي</h3>
              
              <div className="bg-[var(--bg-card)] dark:bg-[var(--bg-card)] rounded-xl p-5 shadow-lg border border-[var(--border-light)] hover:border-green-500/30 transition-all duration-300 hover:shadow-green-500/10 hover:shadow-lg group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-green-500/20">
                    <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)] group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">إشعار حضور</h4>
                    <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">اليوم 10:30 صباحاً</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mt-2 leading-relaxed">
                  تم تسجيل حضور الطالب أحمد محمد في حصة الرياضيات للصف الثاني الثانوي وبدء المحاضرة في الموعد المحدد
                </p>
              </div>
              
              <div className="bg-[var(--bg-card)] dark:bg-[var(--bg-card)] rounded-xl p-5 shadow-lg border border-[var(--border-light)] hover:border-red-500/30 transition-all duration-300 hover:shadow-red-500/10 hover:shadow-lg group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-red-500/20">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)] group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">إشعار غياب</h4>
                    <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">اليوم 4:30 مساءً</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mt-2 leading-relaxed">
                  السلام عليكم، نود إبلاغكم أن الطالب قد تغيب اليوم عن الحصة في الموعد المحدد 4:30 مساءً، كود الطالب std-1339
                </p>
                <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mt-2">
                  حصة الرياضيات - الصف الثاني الثانوي
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary mb-8">نظام الحضور والمتابعة</h3>
              <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-8 leading-relaxed">نظام متكامل لمتابعة حضور الطلاب والاشتراكات والواجبات مع تقارير دورية للأهل ومتابعة مستمرة للمستوى</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: <FaUserCheck />, title: 'الحضور', desc: 'متابعة يومية مع إشعارات فورية للأهل' },
                  { icon: <FaBookReader />, title: 'الاشتراك', desc: 'متابعة شهرية وتذكير قبل انتهاء الاشتراك' },
                  { icon: <FaTasks />, title: 'الواجبات', desc: 'متابعة أسبوعية وتقييم مستمر للمستوى' },
                ].map((item, index) => (
                  <div key={index} className="bg-[var(--bg-card)] dark:bg-[var(--bg-card)] p-6 rounded-xl shadow-lg border border-[var(--border-light)] hover:border-primary/30 transition-all duration-500 hover:shadow-xl text-center group hover:transform hover:-translate-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center text-primary dark:text-primary-light text-2xl mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/20">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-[var(--text-primary)] dark:text-[var(--text-primary)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">{item.title}</h4>
                    <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="mb-16 bg-[var(--bg-card)]/30 backdrop-blur-sm p-8 rounded-2xl border border-[var(--border-light)]/20 shadow-lg">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">الكتب والمذكرات</h3>
            <div className="w-24 h-1 mx-auto my-4 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full"></div>
            <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto">مذكرات وكتب متخصصة لجميع المراحل الدراسية مع شرح مبسط وتمارين متنوعة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </section>
  );
};

interface BookCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const BookCard = ({ imageSrc, title, description }: BookCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 border border-[var(--border-light)] hover:border-primary/30">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" style={{ transitionDelay: '200ms' }}></div>
      
      <div className="aspect-[3/4] w-full relative z-10">
        <Image 
          src={imageSrc} 
          alt={title} 
          width={300} 
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-2xl"
          unoptimized
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/90 via-[var(--primary)]/50 to-transparent flex flex-col justify-end p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
        <h4 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{title}</h4>
        <p className="text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ transitionDelay: '100ms' }}>{description}</p>
        <button className="mt-4 bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: '200ms' }}>
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
