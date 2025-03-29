'use client';

import { useState } from 'react';
import { FaDumbbell, FaChartLine, FaCalendarAlt, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthenticated = status === 'authenticated';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <header className="bg-gradient-to-r from-primary to-accent shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <FaDumbbell className="text-white text-2xl" />
              <h1 className="text-white font-bold text-2xl">GymBro</h1>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavItem href="/" icon={<FaDumbbell />} text="Workouts" />
          <NavItem href="/progress" icon={<FaChartLine />} text="Progress" />
          <NavItem href="/schedule" icon={<FaCalendarAlt />} text="Schedule" />
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
              >
                <FaUser />
                <span>{session?.user?.name}</span>
              </button>
              
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark rounded-md shadow-lg"
                >
                  <div className="p-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                      <FaSignOutAlt />
                      <span>Sign out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <NavItem href="/auth/login" icon={<FaUser />} text="Sign In" />
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavItem href="/" icon={<FaDumbbell />} text="Workouts" />
            <MobileNavItem href="/progress" icon={<FaChartLine />} text="Progress" />
            <MobileNavItem href="/schedule" icon={<FaCalendarAlt />} text="Schedule" />
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="px-2 py-1 text-gray-400">
                  Signed in as {session?.user?.name}
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 text-red-400 hover:text-red-300 p-2 transition-colors"
                >
                  <FaSignOutAlt />
                  <span className="text-lg">Sign out</span>
                </button>
              </>
            ) : (
              <MobileNavItem href="/auth/login" icon={<FaUser />} text="Sign In" />
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
  return (
    <Link href={href} className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const MobileNavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
  return (
    <Link href={href} className="flex items-center gap-3 text-white hover:text-gray-200 p-2 transition-colors">
      {icon}
      <span className="text-lg">{text}</span>
    </Link>
  );
};

export default Header; 