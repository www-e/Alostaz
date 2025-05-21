import { FaWhatsapp, FaFacebookF, FaYoutube, FaTelegramPlane, FaPhoneAlt, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ContactSection = () => {
  // Add decorative elements for the background
  const decorativeElements = [
    { top: '15%', left: '10%', size: '180px', color: 'primary', opacity: '0.05', delay: '0.5s', duration: '20s' },
    { top: '70%', right: '5%', size: '220px', color: 'secondary', opacity: '0.06', delay: '1.5s', duration: '18s' },
    { top: '40%', right: '20%', size: '120px', color: 'primary-light', opacity: '0.04', delay: '1s', duration: '15s' },
  ];
  
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
    <section id="contact" className="py-20 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)] relative overflow-hidden">
      {/* Decorative animated elements */}
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
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary">تواصل معي</h2>
          <div className="w-32 h-1 mx-auto my-4 bg-gradient-to-r from-primary-light via-secondary to-primary-light rounded-full"></div>
          <p className="text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)] max-w-2xl mx-auto">يمكنك التواصل معي عبر وسائل التواصل الاجتماعي أو واتساب للاستفسار أو الحجز</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-[var(--bg-card)]/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[var(--border-light)]/20">
            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
              {contactMethods.map((method, index) => (
                <a 
                  key={method.id}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative ${method.bgColor} text-white rounded-2xl p-8 flex flex-col items-center transition-all duration-500 hover:scale-[1.02] hover:shadow-lg overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 mb-6 transform group-hover:scale-110 transition-transform duration-500 relative z-10">
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 relative z-10">{method.title}</h3>
                  <p className="text-white/90 text-center mb-2 relative z-10">{method.text}</p>
                  {method.secondaryText && (
                    <p className="text-white/70 text-center relative z-10">{method.secondaryText}</p>
                  )}
                  <div className="mt-6 relative z-10 transform group-hover:translate-x-2 transition-transform duration-500">
                    <FaArrowLeft className="text-xl" />
                  </div>
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="bg-[var(--bg-card)]/50 backdrop-blur-sm p-8 flex flex-wrap justify-center gap-8 border-t border-[var(--border-light)]/10">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4 hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary dark:text-primary-light">
                    {info.icon}
                  </div>
                  <span className="text-[var(--text-primary)] font-medium">{info.text}</span>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="relative h-2 bg-gradient-to-r from-primary via-secondary to-primary-light"></div>
          </div>
          
          {/* Additional decorative element */}
          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-70 z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
