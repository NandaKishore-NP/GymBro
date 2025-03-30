import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About GymBro</h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Your personal fitness companion designed to help you track, improve, and achieve your workout goals.
            </p>
          </div>
        </div>
        
        {/* Mission Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              At GymBro, we believe that everyone deserves access to tools that can help them achieve their fitness goals. 
              Our mission is to create a simple yet powerful platform that makes workout tracking effortless, keeps you motivated, 
              and helps you see real progress in your fitness journey.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Whether you&apos;re just starting out or you&apos;re a seasoned athlete, GymBro is designed to adapt to your needs, 
              helping you stay consistent, track your improvements, and celebrate your achievements along the way.
            </p>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="bg-primary/10 p-4 inline-block rounded-full mb-4">
                  <span className="text-4xl">💪</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Workout Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Log your workouts with detailed exercise tracking including sets, reps, and weights. 
                  Create custom workouts tailored to your fitness routine.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="bg-primary/10 p-4 inline-block rounded-full mb-4">
                  <span className="text-4xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Progress Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Visualize your progress with comprehensive charts and statistics. 
                  Track weight changes, workout frequency, and performance improvements over time.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="bg-primary/10 p-4 inline-block rounded-full mb-4">
                  <span className="text-4xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your fitness data is personal. We prioritize security and privacy with 
                  encrypted storage and authenticated access to your information.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose GymBro?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Track Your Journey</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Keep a detailed log of all your workouts, making it easy to see your progress and identify areas for improvement.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Stay Motivated</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Visualize your progress through interactive charts and statistics, keeping you motivated to reach your fitness goals.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">User-Friendly Design</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enjoy an intuitive interface that makes logging workouts and accessing your data quick and hassle-free.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Access Anywhere</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Use GymBro on any device, anywhere - at the gym, at home, or on the go. Your data syncs seamlessly across all devices.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl mb-4">📱</p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  GymBro works seamlessly on desktop and mobile devices
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Join thousands of users who are already tracking their workouts and achieving their fitness goals with GymBro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
                Sign Up for Free
              </Link>
              <Link href="/auth/login" className="btn-secondary text-lg px-8 py-3">
                Login
              </Link>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-400">Founder & Developer</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600 dark:text-gray-400">UX Designer</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🏋️‍♂️</span>
              </div>
              <h3 className="text-xl font-semibold">Mike Johnson</h3>
              <p className="text-gray-600 dark:text-gray-400">Fitness Consultant</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍🔬</span>
              </div>
              <h3 className="text-xl font-semibold">Sarah Williams</h3>
              <p className="text-gray-600 dark:text-gray-400">Nutrition Specialist</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 