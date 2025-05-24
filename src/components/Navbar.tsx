'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  
  // Get current path to determine active link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      if (hash) {
        setActiveLink(hash);
      } else {
        setActiveLink(path);
      }
      
      // Listen for hash changes
      const handleHashChange = () => {
        const newHash = window.location.hash;
        if (newHash) {
          setActiveLink(newHash);
        } else {
          setActiveLink(window.location.pathname);
        }
      };
      
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Get the theme from localStorage or use default
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      // Apply initial scroll state
      setIsScrolled(window.scrollY > 20);
      
      // Add scroll event listener with debounce for performance
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      
      // Throttle scroll event for better performance
      let isThrottled = false;
      const throttledScrollHandler = () => {
        if (!isThrottled) {
          handleScroll();
          isThrottled = true;
          setTimeout(() => {
            isThrottled = false;
          }, 100);
        }
      };
      
      window.addEventListener('scroll', throttledScrollHandler);
      return () => window.removeEventListener('scroll', throttledScrollHandler);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Apply theme with transition effect
    document.documentElement.classList.add('theme-transition');
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className={`bg-[var(--bg-card)]/80 dark:bg-[var(--bg-card)]/80 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 border border-[var(--border-light)]/20 transition-all duration-500 ${isScrolled ? 'shadow-primary/5' : ''}`}>
          <div className="flex items-center justify-between">
            <Link href="/" className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
              <div className="relative flex items-center gap-3">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  أشرف حسن
                </span>
              </div>
            </Link>
            
            <div className="flex items-center gap-5">
              {/* Theme toggle button */}
              <button 
                onClick={toggleTheme} 
                className="p-3 rounded-full bg-[var(--bg-card)]/50 border border-[var(--border-light)]/20 text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all duration-300 shadow-sm hover:shadow"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <FaMoon className="text-primary" /> : <FaSun className="text-primary-light" />}
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-3 rounded-full bg-[var(--bg-card)]/50 border border-[var(--border-light)]/20 text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all duration-300 shadow-sm hover:shadow"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                <FaBars className="text-primary" />
              </button>
              
              {/* Desktop menu */}
              <div className="hidden md:flex items-center gap-2">
                <NavLink href="/" isActive={activeLink === '/'}>الرئيسية</NavLink>
                <NavLink href="/about" isActive={activeLink === '/about'}>نبذة عني</NavLink>
                <NavLink href="/#courses" isActive={activeLink === '#courses'}>الصفوف الدراسية</NavLink>
                <NavLink href="/#contact" isActive={activeLink === '#contact'}>تواصل معي</NavLink>
                <NavLink href="/schedule" isActive={activeLink === '/schedule'}>المواعيد</NavLink>
                <Link 
                  href="/login" 
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg"
                >
                  تسجيل الدخول
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-80 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col space-y-3 pb-3 border-t border-[var(--border-light)]/10 pt-4">
              <NavLink href="/" isActive={activeLink === '/'} mobile>الرئيسية</NavLink>
              <NavLink href="/about" isActive={activeLink === '/about'} mobile>نبذة عني</NavLink>
              <NavLink href="/#courses" isActive={activeLink === '#courses'} mobile>الصفوف الدراسية</NavLink>
              <NavLink href="/#contact" isActive={activeLink === '#contact'} mobile>تواصل معي</NavLink>
              <NavLink href="/schedule" isActive={activeLink === '/schedule'} mobile>المواعيد</NavLink>
              <Link 
                href="/login" 
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg text-center"
              >
                تسجيل الدخول
              </Link>
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
  const baseClasses = "transition-all duration-300 font-medium";
  
  const mobileClasses = mobile 
    ? "block py-3 px-5 rounded-xl hover:bg-[var(--bg-card)]/70 relative overflow-hidden group" 
    : "px-4 py-2 rounded-xl relative overflow-hidden group";
  
  const activeClasses = isActive 
    ? "text-white bg-gradient-to-r from-primary to-secondary shadow-md" 
    : "text-[var(--text-primary)] hover:bg-[var(--bg-card)]/70 border border-[var(--border-light)]/20";
  
  return (
    <Link href={href} className={`${baseClasses} ${mobileClasses} ${activeClasses}`}>
      {/* Hover effect for non-active links */}
      {!isActive && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      )}
      
      {/* Active link effect */}
      {isActive && (
        <span className="absolute inset-0 w-full h-full opacity-20 bg-white/10"></span>
      )}
      
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export default Navbar;
