'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Get the theme from localStorage or use default
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      // Add scroll event listener
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary dark:text-primary-light">
              أ/ أشرف حسن
            </Link>
            
            <div className="flex items-center gap-4">
              {/* Theme toggle button */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-light"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-lg text-primary dark:text-primary-light"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                <FaBars />
              </button>
              
              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-1 space-x-reverse">
                <NavLink href="/" isActive={true}>الرئيسية</NavLink>
                <NavLink href="/about">نبذة عني</NavLink>
                <NavLink href="/#courses">الصفوف الدراسية</NavLink>
                <NavLink href="/#contact">تواصل معي</NavLink>
                <NavLink href="/schedule">المواعيد</NavLink>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-60 mt-4' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-2 pb-3">
              <NavLink href="/" isActive={true} mobile>الرئيسية</NavLink>
              <NavLink href="/about" mobile>نبذة عني</NavLink>
              <NavLink href="/#courses" mobile>الصفوف الدراسية</NavLink>
              <NavLink href="/#contact" mobile>تواصل معي</NavLink>
              <NavLink href="/schedule" mobile>المواعيد</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  mobile?: boolean;
}

const NavLink = ({ href, children, isActive = false, mobile = false }: NavLinkProps) => {
  const baseClasses = "transition-colors duration-300";
  const mobileClasses = mobile 
    ? "block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" 
    : "px-4 py-2 rounded-lg";
  
  const activeClasses = isActive 
    ? "text-white bg-primary dark:bg-primary-light" 
    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700";
  
  return (
    <Link href={href} className={`${baseClasses} ${mobileClasses} ${activeClasses}`}>
      {children}
    </Link>
  );
};

export default Navbar;
