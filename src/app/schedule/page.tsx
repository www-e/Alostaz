import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaVideo, FaChalkboardTeacher, FaCheckCircle, FaDownload, FaWhatsapp } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'حجز المواعيد - مركز أ/ أشرف حسن للرياضيات',
  description: 'احجز موعدك للدروس الخصوصية أونلاين أو في المركز',
};

export default function Schedule() {
  const onlineFeatures = [
    'شرح تفاعلي مباشر',
    'سبورة إلكترونية',
    'تسجيل الدروس',
    'مرونة في اختيار المواعيد',
  ];

  const offlineFeatures = [
    'شرح مباشر وتفاعلي',
    'قاعات مجهزة',
    'مذكرات وملخصات',
    'متابعة مستمرة',
  ];

  const timeSlots = [
    { day: 'السبت', time: 'تم اكتمال العدد' },
    { day: 'الأحد', time: 'تم اكتمال العدد' },
    { day: 'الثلاثاء', time: 'تم اكتمال العدد' },
    { day: 'الخميس', time: 'تم اكتمال العدد' },
  ];

  const gradeSchedules = [
    {
      id: 1,
      title: 'الصف الأول الثانوي',
      image: '/assets/images/Grade_schedule1.webp',
      pdfLink: '/assets/schedulesPdfFiles/grade1.pdf',
    },
    {
      id: 2,
      title: 'الصف الثاني الثانوي',
      image: '/assets/images/Grade_schedule2.webp',
      pdfLink: '/assets/schedulesPdfFiles/grade2.pdf',
    },
    {
      id: 3,
      title: 'الصف الثالث الثانوي',
      image: '/assets/images/Grade_schedule3.webp',
      pdfLink: '/assets/schedulesPdfFiles/grade3.pdf',
    },
  ];

  return (
    <main>
      <Navbar />
      
      {/* Schedule Section */}
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">حجز المواعيد</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">احجز موعدك للدروس الخصوصية أونلاين أو في المركز</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Online Classes Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 flex items-center gap-2">
                <FaVideo />
                <span className="font-bold">دروس أونلاين</span>
              </div>
              
              <div className="p-6">
                {/* Features */}
                <div className="mb-8">
                  {onlineFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 mb-3">
                      <FaCheckCircle className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Available Times */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-light">المواعيد المتاحة</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="font-bold text-primary dark:text-primary-light">{slot.day}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{slot.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Booking Action */}
                <div className="text-center">
                  <Link 
                    href="https://wa.me/+201227278084" 
                    target="_blank"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 w-full md:w-auto md:mx-auto"
                  >
                    <FaWhatsapp />
                    احجز الآن
                  </Link>
                </div>
              </div>
            </div>

            {/* Offline Classes Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 flex items-center gap-2">
                <FaChalkboardTeacher />
                <span className="font-bold">دروس في المركز</span>
              </div>
              
              <div className="p-6">
                {/* Features */}
                <div className="mb-8">
                  {offlineFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 mb-3">
                      <FaCheckCircle className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Schedule Downloads */}
                <div className="space-y-6">
                  {gradeSchedules.map((grade) => (
                    <div key={grade.id} className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                        <Image 
                          src={grade.image} 
                          alt={grade.title}
                          width={192}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <FaDownload className="text-white text-xl" />
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-right">
                        <h4 className="font-bold mb-2">{grade.title}</h4>
                        <Link 
                          href={grade.pdfLink} 
                          download
                          className="flex items-center justify-center sm:justify-start gap-2 text-primary dark:text-primary-light hover:underline"
                        >
                          <FaDownload />
                          تحميل المواعيد
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">موقع المركز</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">يمكنك زيارتنا في المركز التعليمي</p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.6797609561584!2d31.365113!3d31.037578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79db7a9053547%3A0x8f45b3d9de8f1f48!2z2YXYsdmD2LIg2KfZhNij2LPYqtin2LAgLyDYp9i02LHZgSDYrdi32KfYqCDZhNmE2LHZitin2LbZitin2Kog2KfZhNmF2LHYrdmE2Kkg2KfZhNir2KfZhtmI2YrYqQ!5e0!3m2!1sar!2seg!4v1701265463270!5m2!1sar!2seg" 
                    width="600" 
                    height="450" 
                    style={{ border: 0 }}
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-primary-light">عنوان المركز</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  المنصورة - شارع الجمهورية - برج الأطباء - الدور الخامس
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                      <FaWhatsapp />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">01227278084</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                      <FaWhatsapp />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">01062739292</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
