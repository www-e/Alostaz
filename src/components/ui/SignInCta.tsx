import Link from 'next/link';

interface SignInCtaProps {
  title?: string;
  description?: string;
  className?: string;
}

const SignInCta = ({
  title = 'هل أنت طالب مسجل بالفعل؟',
  description = 'سجل الدخول الآن للوصول إلى المحتوى الكامل والدروس الخاصة بك',
  className = ''
}: SignInCtaProps) => {
  return (
    <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">{description}</p>
      <Link 
        href="/login" 
        className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg"
      >
        <span className="ml-2">🔑</span>
        <span>تسجيل الدخول</span>
      </Link>
    </div>
  );
};

export default SignInCta;
