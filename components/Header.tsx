'use client';

import { useState } from 'react';
import { 
  FaDumbbell, 
  FaChartLine, 
  FaUser, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaCog, 
  FaQuestion,
  FaInfoCircle,
  FaUserFriends
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const isAuthenticated = status === 'authenticated';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close profile dropdown if it's open
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-primary to-accent shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 md:py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <FaDumbbell className="text-white text-xl md:text-2xl" />
              <h1 className="text-white font-bold text-lg md:text-2xl">GymBro</h1>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6">
          <NavItem 
            href="/" 
            icon={<FaDumbbell />} 
            text="Dashboard" 
            isActive={isActive('/')}
          />
          <NavItem 
            href="/statistics" 
            icon={<FaChartLine />} 
            text="Statistics" 
            isActive={isActive('/statistics')}
          />
          {isAuthenticated && (
            <NavItem 
              href="/partners" 
              icon={<FaUserFriends />} 
              text="Partners" 
              isActive={isActive('/partners')}
            />
          )}
          <NavItem 
            href="/about" 
            icon={<FaInfoCircle />} 
            text="About" 
            isActive={isActive('/about')}
          />
          <NavItem 
            href="/help" 
            icon={<FaQuestion />} 
            text="Help" 
            isActive={isActive('/help')}
          />
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
              >
                <FaUser />
                <span className="max-w-[100px] truncate">{session?.user?.name}</span>
              </button>
              
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20"
                >
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <FaUser className="text-primary" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <FaCog className="text-primary" />
                        <span>Settings</span>
                      </div>
                    </Link>
                    
                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <FaSignOutAlt />
                        <span>Sign out</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <NavItem 
              href="/auth/login" 
              icon={<FaUser />} 
              text="Sign In" 
              isActive={isActive('/auth/login')}
            />
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-800 dark:bg-gray-900 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-1">
            <MobileNavItem 
              href="/" 
              icon={<FaDumbbell />} 
              text="Dashboard" 
              isActive={isActive('/')}
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavItem 
              href="/statistics" 
              icon={<FaChartLine />} 
              text="Statistics" 
              isActive={isActive('/statistics')}
              onClick={() => setIsMenuOpen(false)}
            />
            {isAuthenticated && (
              <MobileNavItem 
                href="/partners" 
                icon={<FaUserFriends />} 
                text="Partners" 
                isActive={isActive('/partners')}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
            <MobileNavItem 
              href="/about" 
              icon={<FaInfoCircle />} 
              text="About" 
              isActive={isActive('/about')}
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavItem 
              href="/help" 
              icon={<FaQuestion />} 
              text="Help" 
              isActive={isActive('/help')}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-700 my-1"></div>
                <div className="px-2 py-1 text-gray-400 text-sm">
                  Signed in as {session?.user?.name}
                </div>
                
                <MobileNavItem 
                  href="/profile" 
                  icon={<FaUser />} 
                  text="Profile" 
                  isActive={isActive('/profile')}
                  onClick={() => setIsMenuOpen(false)}
                />
                
                <MobileNavItem 
                  href="/settings" 
                  icon={<FaCog />} 
                  text="Settings" 
                  isActive={isActive('/settings')}
                  onClick={() => setIsMenuOpen(false)}
                />
                
                <div className="border-t border-gray-700 my-1"></div>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 text-red-400 hover:text-red-300 p-2 transition-colors w-full"
                >
                  <FaSignOutAlt />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <MobileNavItem 
                href="/auth/login" 
                icon={<FaUser />} 
                text="Sign In" 
                isActive={isActive('/auth/login')}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

const NavItem = ({ 
  href, 
  icon, 
  text, 
  isActive 
}: { 
  href: string; 
  icon: React.ReactNode; 
  text: string;
  isActive: boolean;
}) => {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? 'text-white bg-white/10' 
          : 'text-gray-200 hover:text-white hover:bg-white/5'
      }`}>
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  );
};

const MobileNavItem = ({ 
  href, 
  icon, 
  text, 
  isActive,
  onClick
}: { 
  href: string; 
  icon: React.ReactNode; 
  text: string;
  isActive: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link href={href} onClick={onClick}>
      <div className={`flex items-center gap-3 p-2 rounded ${
        isActive 
          ? 'text-white bg-primary/20' 
          : 'text-gray-300 hover:text-white'
      }`}>
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  );
};

export default Header; 