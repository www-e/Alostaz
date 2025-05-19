'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaIdCard, FaQrcode, FaClock, FaChartLine, FaUserCheck, FaBookReader, FaTasks } from 'react-icons/fa';

const AboutSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">المركز التعليمي</h2>
          <div className="section-line"></div>
          <p className="section-subtitle">نظام تعليمي متكامل للمرحلة الثانوية</p>
        </div>

        {/* Student ID Card Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="card">
              <h3 className="text-2xl font-bold text-primary dark:text-primary-light mb-4">بطاقة الطالب الذكية</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">نظام متكامل لمتابعة حضور وأداء الطلاب</p>
              <ul className="space-y-3">
                {[
                  { icon: <FaIdCard />, text: 'بطاقة تعريف شخصية لكل طالب' },
                  { icon: <FaQrcode />, text: 'نظام باركود للحضور اليومي' },
                  { icon: <FaClock />, text: 'تسجيل وقت الحضور والانصراف' },
                  { icon: <FaChartLine />, text: 'متابعة مستوى التقدم' },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-primary dark:text-primary-light">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="perspective-1000">
              <div 
                className={`relative w-full aspect-[1.586] transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Front */}
                <div 
                  className="absolute inset-0 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image 
                    src="/src/assets/images/student-card-front.webp" 
                    alt="بطاقة الطالب الأمامية" 
                    width={400} 
                    height={252}
                    className="w-full h-auto rounded-xl shadow-lg"
                    unoptimized
                  />
                </div>
                
                {/* Card Back */}
                <div 
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <Image 
                    src="/src/assets/images/student-card-back.webp" 
                    alt="بطاقة الطالب الخلفية" 
                    width={400} 
                    height={252}
                    className="w-full h-auto rounded-xl shadow-lg"
                    unoptimized
                  />
                </div>
              </div>
              
              <button 
                onClick={() => setIsFlipped(!isFlipped)}
                className="mt-4 mx-auto block md:hidden px-4 py-2 bg-primary text-white rounded-lg"
              >
                {isFlipped ? 'وجه الكارت' : 'ظهر الكارت'}
              </button>
            </div>
          </div>
        </div>

        {/* Attendance System */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-green-500 text-white p-2 rounded-full">
                  <FaUserCheck />
                </div>
                <div>
                  <h4 className="font-bold text-green-700 dark:text-green-400">تنبيه حضور و غياب الطالب</h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    السلام عليكم , بنبلغ حضراتكم ان الطالب قد تغيب اليوم عن الحصة في المعاد 4:30 كود الطالب std-1339
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    حصة الرياضيات - الصف الثاني الثانوي
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="card">
              <h3 className="text-2xl font-bold text-primary dark:text-primary-light mb-6">نظام الحضور والمتابعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: <FaUserCheck />, title: 'الحضور', desc: 'متابعة يومية' },
                  { icon: <FaBookReader />, title: 'الاشتراك', desc: 'متابعة شهرية' },
                  { icon: <FaTasks />, title: 'الواجبات', desc: 'متابعة أسبوعية' },
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center">
                    <div className="text-2xl text-primary dark:text-primary-light mb-2">{item.icon}</div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">الكتب والمذكرات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First Grade Book */}
            <BookCard 
              imageSrc="/src/assets/images/BookCoverGrade1.webp"
              title="الصف الأول الثانوي"
              description="الرياضيات عام"
            />
            
            {/* Second Grade Books */}
            <BookCard 
              imageSrc="/src/assets/images/BookCoverGrade2.webp"
              title="الصف الثاني الثانوي"
              description="الرياضيات التطبيقية"
            />
            
            <BookCard 
              imageSrc="/src/assets/images/BookCoverGrade2scintific.webp"
              title="الصف الثاني الثانوي"
              description="الرياضيات البحتة"
            />
            
            {/* Third Grade Book */}
            <BookCard 
              imageSrc="/src/assets/images/BookCoverGrade3.webp"
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
    <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="aspect-[3/4] w-full">
        <Image 
          src={imageSrc} 
          alt={title} 
          width={300} 
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-xl font-bold">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AboutSection;
