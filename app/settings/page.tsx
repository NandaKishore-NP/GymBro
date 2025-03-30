'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaCog, FaUser, FaMoon, FaSun, FaBell, FaLock, FaSignOutAlt, FaSpinner, FaCheck } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Account settings
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  // App preferences
  const [darkMode, setDarkMode] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [useMetricSystem, setUseMetricSystem] = useState(true);
  
  // Privacy settings
  const [shareWorkouts, setShareWorkouts] = useState(false);
  const [showInLeaderboards, setShowInLeaderboards] = useState(false);
  
  useEffect(() => {
    // Load settings from localStorage or API
    const loadSettings = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setIsLoading(true);
        
        // Fetch user profile data
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        
        // Set user data
        setEmail(session?.user?.email || '');
        setName(data.name || session?.user?.name || '');
        
        // Get app preferences from localStorage
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        const savedMetricSystem = localStorage.getItem('useMetricSystem') !== 'false'; // Default to true
        const savedNotifications = localStorage.getItem('enableNotifications') !== 'false'; // Default to true
        
        // Get privacy settings from localStorage 
        const savedShareWorkouts = localStorage.getItem('shareWorkouts') === 'true';
        const savedShowInLeaderboards = localStorage.getItem('showInLeaderboards') === 'true';
        
        // Set preferences
        setDarkMode(savedDarkMode);
        setUseMetricSystem(savedMetricSystem);
        setEnableNotifications(savedNotifications);
        setShareWorkouts(savedShareWorkouts);
        setShowInLeaderboards(savedShowInLeaderboards);
        
        // Apply dark mode if needed
        if (savedDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
    
    // Check for dark mode on initial render regardless of auth status
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [session, status]);
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Save app preferences to localStorage
      localStorage.setItem('darkMode', darkMode.toString());
      localStorage.setItem('useMetricSystem', useMetricSystem.toString());
      localStorage.setItem('enableNotifications', enableNotifications.toString());
      localStorage.setItem('shareWorkouts', shareWorkouts.toString());
      localStorage.setItem('showInLeaderboards', showInLeaderboards.toString());
      
      // Apply dark mode immediately
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Update user profile via API
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          // Include other required profile fields
          currentWeight: 70, // Default value, should be replaced with actual value
          targetWeight: 65, // Default value, should be replaced with actual value
          height: 175, // Default value, should be replaced with actual value
        }),
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      // Show success message
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    
    // Apply dark mode immediately
    if (newDarkModeState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage immediately
    localStorage.setItem('darkMode', newDarkModeState.toString());
  };
  
  if (status === 'unauthenticated') {
    // Redirect to login page if not authenticated
    router.push('/auth/login');
    return null;
  }
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <FaCog className="text-primary text-3xl mr-3" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
            <FaCheck className="mr-2" />
            Settings saved successfully!
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
            <p className="text-gray-500">Loading settings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a href="#account" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaUser className="mr-3 text-primary" />
                        Account
                      </a>
                    </li>
                    <li>
                      <a href="#preferences" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaCog className="mr-3 text-primary" />
                        Preferences
                      </a>
                    </li>
                    <li>
                      <a href="#privacy" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaLock className="mr-3 text-primary" />
                        Privacy
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Settings Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Account Settings */}
              <section id="account" className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FaUser className="mr-2 text-primary" />
                  Account Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="input bg-gray-50 dark:bg-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => router.push('/profile')}
                      className="btn-secondary flex items-center"
                    >
                      <FaUser className="mr-2" />
                      Edit Full Profile
                    </button>
                  </div>
                </div>
              </section>
              
              {/* App Preferences */}
              <section id="preferences" className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FaCog className="mr-2 text-primary" />
                  App Preferences
                </h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Theme</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                      </p>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
                        darkMode ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className="sr-only">Toggle dark mode</span>
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform ${
                          darkMode ? 'translate-x-7 bg-white text-blue-600' : 'translate-x-1 bg-white text-yellow-500'
                        } rounded-full`}
                      >
                        {darkMode ? <FaMoon size={10} /> : <FaSun size={10} />}
                      </span>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Measurement System</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {useMetricSystem ? 'Using metric system (kg, cm)' : 'Using imperial system (lb, ft)'}
                      </p>
                    </div>
                    <button
                      onClick={() => setUseMetricSystem(!useMetricSystem)}
                      className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
                        useMetricSystem ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className="sr-only">Toggle measurement system</span>
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                          useMetricSystem ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></span>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {enableNotifications ? 'Notifications enabled' : 'Notifications disabled'}
                      </p>
                    </div>
                    <button
                      onClick={() => setEnableNotifications(!enableNotifications)}
                      className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
                        enableNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className="sr-only">Toggle notifications</span>
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                          enableNotifications ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>
              </section>
              
              {/* Privacy Settings */}
              <section id="privacy" className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FaLock className="mr-2 text-primary" />
                  Privacy Settings
                </h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Share Workouts</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow your workouts to be shared with friends
                      </p>
                    </div>
                    <button
                      onClick={() => setShareWorkouts(!shareWorkouts)}
                      className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
                        shareWorkouts ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className="sr-only">Toggle share workouts</span>
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                          shareWorkouts ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></span>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Show in Leaderboards</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow your stats to appear in public leaderboards
                      </p>
                    </div>
                    <button
                      onClick={() => setShowInLeaderboards(!showInLeaderboards)}
                      className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
                        showInLeaderboards ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className="sr-only">Toggle leaderboard visibility</span>
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                          showInLeaderboards ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></span>
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      className="btn-danger flex items-center"
                      onClick={() => window.confirm('Are you sure you want to delete your account? This action cannot be undone.') && console.log('Account deletion requested')}
                    >
                      <FaSignOutAlt className="mr-2" />
                      Delete Account
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      This will permanently delete your account and all associated data.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Save Button */}
              <div className="flex justify-end">
                <button 
                  onClick={handleSaveSettings}
                  className="btn-primary flex items-center"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 