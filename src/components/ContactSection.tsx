import { FaWhatsapp, FaFacebookF, FaYoutube, FaTelegramPlane, FaPhoneAlt, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ContactSection = () => {
  const contactMethods = [
    {
      id: 'whatsapp',
      icon: <FaWhatsapp className="text-2xl" />,
      title: 'واتساب',
      text: 'تواصل معي مباشرة على واتساب',
      url: 'https://wa.me/+201227278084?text=السلام%20عليكم%20,%20ازيك%20يا%20مستر%20؟%20ايه%20الأخبار%20؟',
      bgColor: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'facebook',
      icon: <FaFacebookF className="text-2xl" />,
      title: 'فيسبوك',
      text: 'تابعني على صفحة الفيسبوك',
      url: 'https://www.facebook.com/@ashraf.hassan.5099940',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'youtube',
      icon: <FaYoutube className="text-2xl" />,
      title: 'يوتيوب',
      text: 'شاهد دروسي على اليوتيوب',
      url: 'https://www.youtube.com/@mr.ashrafhassan-2365',
      bgColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 'telegram',
      icon: <FaTelegramPlane className="text-2xl" />,
      title: 'تليجرام',
      text: 'انضم إلى قناتي على تليجرام',
      secondaryText: 'قريبا.....',
      url: '#',
      bgColor: 'bg-blue-500 hover:bg-blue-600',
    },
  ];

  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      text: '+20 1227278084',
    },
    {
      icon: <FaPhoneAlt />,
      text: '+20 1062739292',
    },
    {
      icon: <FaEnvelope />,
      text: 'ah8370521@gmail.com',
    },
  ];

  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">تواصل معي</h2>
          <div className="section-line"></div>
          <p className="section-subtitle">يمكنك التواصل معي عبر وسائل التواصل الاجتماعي أو واتساب</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {contactMethods.map((method) => (
                <a 
                  key={method.id}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${method.bgColor} text-white rounded-xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105`}
                >
                  <div className="bg-white/20 rounded-full p-4 mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                  <p className="text-white/90 text-center mb-1">{method.text}</p>
                  {method.secondaryText && (
                    <p className="text-white/70 text-center">{method.secondaryText}</p>
                  )}
                  <div className="mt-4">
                    <FaArrowLeft />
                  </div>
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 flex flex-wrap justify-center gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-primary dark:text-primary-light">
                    {info.icon}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{info.text}</span>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="relative h-4 bg-gradient-to-r from-primary via-secondary to-primary-light"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
