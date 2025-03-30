'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { 
  FaSun, 
  FaMoon, 
  FaTimes, 
  FaBars, 
  FaUser, 
  FaCog, 
  FaSignOutAlt, 
  FaChartLine, 
  FaDumbbell, 
  FaQuestion,
  FaInfoCircle,
  FaUserFriends,
  FaBook,
  FaPlus,
  FaList
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close profile menu when main menu is toggled
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render theme toggle until mounted to avoid hydration mismatch
  const renderThemeChanger = () => {
    if (!mounted) return null;
    
    // Use resolvedTheme for better dark mode detection, fallback to theme
    const actualTheme = resolvedTheme || theme;
    
    return (
      <button
        type="button"
        onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
        className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
        aria-label="Toggle dark mode"
      >
        {actualTheme === 'dark' ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-gray-700" />
        )}
      </button>
    );
  };
  
  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileMenuOpen && !target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };
  
  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              GymBro
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          {/* Desktop Navigation */}
          <Link 
            href="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/' 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Dashboard
          </Link>
          
          <Link 
            href="/workouts" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/workouts' || pathname?.startsWith('/workouts/') 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Workouts
          </Link>
          
          <Link 
            href="/workouts/library" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/workouts/library' || pathname?.startsWith('/workouts/library/') 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Workout Library
          </Link>
          
          <Link 
            href="/statistics" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/statistics' 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Statistics
          </Link>
          
          <Link 
            href="/partners" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/partners' || pathname?.startsWith('/partners/') 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Partners
          </Link>
          
          <Link 
            href="/about" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/about' 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            About
          </Link>
          
          <Link 
            href="/help" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/help' 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Help
          </Link>
        </nav>
        
        <div className="flex items-center">
          {/* User menu for authenticated users */}
          {session ? (
            <div className="relative profile-menu-container">
              <button 
                className="flex items-center focus:outline-none"
                onClick={toggleProfileMenu}
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 overflow-hidden">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser />
                  )}
                </div>
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaCog className="mr-2" />
                      <span>Settings</span>
                    </div>
                  </Link>
                  
                  <button 
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <FaSignOutAlt className="mr-2" />
                      <span>Sign out</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/auth/login"
              className="px-4 py-2 rounded-md bg-primary text-white font-medium text-sm hover:bg-primary-dark"
            >
              Log In
            </Link>
          )}
          
          {renderThemeChanger()}
          
          {/* Mobile Menu Button */}
          <button
            className="ml-4 md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            
            <Link 
              href="/workouts" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/workouts' || (pathname?.startsWith('/workouts/') && !pathname?.startsWith('/workouts/library')) 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaDumbbell className="mr-2" />
                <span>My Workouts</span>
              </div>
            </Link>
            
            <Link 
              href="/workouts/new" 
              className={`px-3 py-2 rounded-md text-sm font-medium ml-8 ${
                pathname === '/workouts/new' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaPlus className="mr-2" />
                <span>New Workout</span>
              </div>
            </Link>
            
            <Link 
              href="/workouts/library" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/workouts/library' || pathname?.startsWith('/workouts/library/') 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaBook className="mr-2" />
                <span>Workout Library</span>
              </div>
            </Link>
            
            <Link 
              href="/statistics" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/statistics' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaChartLine className="mr-2" />
                <span>Statistics</span>
              </div>
            </Link>
            
            <Link 
              href="/partners" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/partners' || pathname?.startsWith('/partners/') 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaUserFriends className="mr-2" />
                <span>Partners</span>
              </div>
            </Link>
            
            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/about' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaInfoCircle className="mr-2" />
                <span>About</span>
              </div>
            </Link>
            
            <Link 
              href="/help" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/help' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaQuestion className="mr-2" />
                <span>Help</span>
              </div>
            </Link>
            
            {session ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                  <Link 
                    href="/profile" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/profile' 
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/settings' 
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaCog className="mr-2" />
                      <span>Settings</span>
                    </div>
                  </Link>
                  
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      <FaSignOutAlt className="mr-2" />
                      <span>Sign out</span>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <Link 
                href="/auth/login"
                className="mt-2 px-3 py-2 rounded-md bg-primary text-white font-medium text-sm hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
} 