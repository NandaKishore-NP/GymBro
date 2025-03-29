'use client';

import { useState } from 'react';
import { FaQuestion, FaInfoCircle, FaBook, FaEnvelope, FaChevronDown, FaChevronUp, FaYoutube, FaLifeRing } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
}

interface Category {
  name: string;
  faqs: FAQ[];
}

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaqs, setExpandedFaqs] = useState<{[key: string]: boolean}>({});
  
  const toggleFaq = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setExpandedFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const isFaqExpanded = (category: string, index: number) => {
    const key = `${category}-${index}`;
    return expandedFaqs[key] || false;
  };
  
  const helpCategories: Category[] = [
    {
      name: 'getting-started',
      faqs: [
        {
          question: 'How do I create my first workout?',
          answer: 'To create your first workout, navigate to the Dashboard and click on the "Add Workout" button. Fill in the workout details including name, date, and exercises. You can add multiple exercises to each workout, specifying sets, reps, and weight for each exercise.'
        },
        {
          question: 'How do I track my weight progress?',
          answer: 'You can track your weight progress by updating your weight in your profile. Navigate to the Profile page, click "Edit Profile", and update your current weight. The app will keep a history of your weight entries and display them in chart form on the Statistics page.'
        },
        {
          question: 'Can I use GymBro on multiple devices?',
          answer: 'Yes! GymBro is a web-based application that works on any device with a web browser. Simply log in with your account on any device, and your data will be synchronized across all your devices.'
        },
        {
          question: 'Is my data secure?',
          answer: 'We take data security very seriously. All your workout and personal data is stored securely in our database and is only accessible by you. We use industry-standard encryption and authentication methods to protect your information.'
        }
      ]
    },
    {
      name: 'workout-tracking',
      faqs: [
        {
          question: 'How do I edit a workout?',
          answer: 'To edit a workout, go to the workout details page by clicking on the workout from your Dashboard. Then click the "Edit" button at the top of the page. You can modify workout details, add or remove exercises, and update sets, reps, or weights.'
        },
        {
          question: 'Can I duplicate a workout?',
          answer: 'Currently, there is no direct duplicate function. However, you can easily create a new workout based on an existing one by viewing the workout you want to duplicate, then creating a new workout and manually entering similar information.'
        },
        {
          question: 'How do I delete an exercise from a workout?',
          answer: 'When editing a workout, you can remove an exercise by clicking the trash icon next to the exercise you want to delete.'
        },
        {
          question: 'Can I track cardio exercises?',
          answer: 'Yes, you can track any type of exercise in GymBro. For cardio exercises, you can use the name field to specify the type of cardio (e.g., "Running", "Cycling"), and use the reps field for distance or duration and the weight field for intensity if applicable.'
        }
      ]
    },
    {
      name: 'statistics',
      faqs: [
        {
          question: 'How is my progress calculated?',
          answer: 'Your progress is calculated based on the workout and weight data you enter. We track metrics like workout frequency, exercise distribution, weight changes over time, and personal records for each exercise.'
        },
        {
          question: 'Why don\'t I see any progress charts?',
          answer: 'Progress charts are generated based on your historical data. If you\'re new to GymBro or haven\'t logged several workouts or weight entries yet, some charts may not have enough data to display meaningful information.'
        },
        {
          question: 'Can I export my workout data?',
          answer: 'Currently, we don\'t have a direct export function. However, we\'re working on implementing this feature in a future update to allow you to export your workout history and statistics in various formats.'
        },
        {
          question: 'How is my BMI calculated?',
          answer: 'BMI (Body Mass Index) is calculated using your current weight and height information from your profile. The formula is: BMI = weight(kg) / height(m)². This gives a rough estimation of body composition but doesn\'t account for factors like muscle mass.'
        }
      ]
    },
    {
      name: 'account',
      faqs: [
        {
          question: 'How do I change my password?',
          answer: 'To change your password, go to the login page and click on "Forgot Password". Follow the instructions sent to your email to reset your password.'
        },
        {
          question: 'Can I change my email address?',
          answer: 'Currently, changing your email address is not supported directly through the app. Please contact our support team if you need to change the email associated with your account.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'You can delete your account from the Settings page. Go to Settings, scroll down to the Privacy section, and click on "Delete Account". Please note that this action is irreversible and will permanently delete all your data.'
        },
        {
          question: 'Is GymBro free to use?',
          answer: 'Yes, GymBro is currently free to use with all features available. We may introduce premium features in the future, but the core functionality will always remain free.'
        }
      ]
    }
  ];
  
  const tutorials = [
    {
      title: 'Getting Started with GymBro',
      description: 'Learn the basics of GymBro and how to set up your account',
      icon: <FaBook className="text-blue-500" />,
      url: '#'
    },
    {
      title: 'Creating Effective Workouts',
      description: 'Tips for structuring your workouts for maximum results',
      icon: <FaDumbbell className="text-green-500" />,
      url: '#'
    },
    {
      title: 'Understanding Your Statistics',
      description: 'How to interpret and use your workout statistics',
      icon: <FaChartLine className="text-purple-500" />,
      url: '#'
    },
    {
      title: 'Advanced Tracking Features',
      description: 'Make the most of GymBro\'s advanced tracking capabilities',
      icon: <FaClipboardCheck className="text-orange-500" />,
      url: '#'
    }
  ];
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <FaLifeRing className="mr-3 text-primary" />
          Help Center
        </h1>
        
        {/* Hero Section */}
        <div className="card bg-gradient-to-r from-primary/20 to-accent/20 mb-8">
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Find answers to common questions and learn how to get the most out of GymBro
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Topics</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setActiveCategory('getting-started')}
                      className={`w-full text-left flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        activeCategory === 'getting-started' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                      }`}
                    >
                      <FaInfoCircle className="mr-3 text-primary" />
                      Getting Started
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveCategory('workout-tracking')}
                      className={`w-full text-left flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        activeCategory === 'workout-tracking' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                      }`}
                    >
                      <FaDumbbell className="mr-3 text-primary" />
                      Workout Tracking
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveCategory('statistics')}
                      className={`w-full text-left flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        activeCategory === 'statistics' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                      }`}
                    >
                      <FaChartLine className="mr-3 text-primary" />
                      Statistics & Progress
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveCategory('account')}
                      className={`w-full text-left flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        activeCategory === 'account' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                      }`}
                    >
                      <FaUser className="mr-3 text-primary" />
                      Account & Settings
                    </button>
                  </li>
                </ul>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3">Need more help?</h3>
                <a 
                  href="mailto:support@gymbro.app" 
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-primary"
                >
                  <FaEnvelope className="mr-3" />
                  Contact Support
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* FAQ Section */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaQuestion className="mr-2 text-primary" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {helpCategories.find(cat => cat.name === activeCategory)?.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      className="w-full flex justify-between items-center p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => toggleFaq(activeCategory, index)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {isFaqExpanded(activeCategory, index) ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </button>
                    
                    {isFaqExpanded(activeCategory, index) && (
                      <div className="p-4 bg-white dark:bg-gray-900">
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tutorials Section */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaYoutube className="mr-2 text-primary" />
                Video Tutorials
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial, index) => (
                  <Link 
                    key={index} 
                    href={tutorial.url}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        {tutorial.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{tutorial.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tutorial.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link href="#" className="text-primary hover:underline">
                  View all tutorials
                </Link>
              </div>
            </div>
            
            {/* Contact Support Section */}
            <div className="card text-center py-6">
              <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our support team is here to help you with any issues or questions you might have.
              </p>
              <a 
                href="mailto:support@gymbro.app"
                className="btn-primary inline-flex items-center"
              >
                <FaEnvelope className="mr-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Icon components
const FaDumbbell = ({ className = "" }: { className?: string }) => <span className={className}>💪</span>;
const FaChartLine = ({ className = "" }: { className?: string }) => <span className={className}>📈</span>;
const FaClipboardCheck = ({ className = "" }: { className?: string }) => <span className={className}>📋</span>;
const FaUser = ({ className = "" }: { className?: string }) => <span className={className}>👤</span>; 