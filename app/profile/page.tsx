'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaUser, FaWeight, FaCalendarAlt, FaEnvelope, FaSave, FaSpinner } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Validation schema for profile data
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  currentWeight: z.number().positive("Weight must be a positive number"),
  targetWeight: z.number().positive("Target weight must be a positive number"),
  height: z.number().positive("Height must be a positive number"),
});

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || '');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [height, setHeight] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!session?.user?.id) return;
      
      try {
        setIsFetching(true);
        
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await response.json();
        
        // Update state with fetched data
        setName(data.name || '');
        setCurrentWeight(data.currentWeight?.toString() || '');
        setTargetWeight(data.targetWeight?.toString() || '');
        setHeight(data.height?.toString() || '');
        
        // Format the created_at date
        if (data.created_at) {
          const date = new Date(data.created_at);
          setMemberSince(date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchProfileData();
  }, [session?.user?.id]);
  
  const calculateBMI = () => {
    const heightInMeters = parseInt(height) / 100;
    const weightInKg = parseInt(currentWeight);
    
    if (heightInMeters && weightInKg) {
      const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      return bmi;
    }
    return 'N/A';
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setSaveError('');
      
      // Validate form data
      const validationResult = profileSchema.safeParse({
        name,
        currentWeight: Number(currentWeight),
        targetWeight: Number(targetWeight),
        height: Number(height)
      });
      
      if (!validationResult.success) {
        const errorMsg = Object.values(validationResult.error.flatten().fieldErrors)
          .flat()
          .join(', ');
        setSaveError(errorMsg);
        setIsLoading(false);
        return;
      }
      
      // Create a timeout promise
      const timeoutPromise = new Promise<Response>((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out after 15 seconds')), 15000);
      });
      
      // Save to the database with timeout
      const fetchPromise = fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          currentWeight: Number(currentWeight),
          targetWeight: Number(targetWeight),
          height: Number(height)
        }),
      });
      
      // Race the fetch against a timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) {
        let errorMessage = 'Failed to update profile';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          // If response cannot be parsed as JSON, use text content for error
          const textContent = await response.text();
          if (textContent) {
            errorMessage = `Server error: ${textContent.substring(0, 100)}`;
          }
        }
        throw new Error(errorMessage);
      }
      
      // Show success message
      setIsEditing(false);
      setSaveSuccess(true);
      
      // Refresh the page data to update UI
      router.refresh();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setSaveError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
          >
            Profile updated successfully!
          </motion.div>
        )}
        
        {saveError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {saveError}
          </motion.div>
        )}
        
        {isFetching ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
            <p className="text-gray-500">Loading profile data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary Card */}
            <div className="card bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="flex items-center mb-6">
                <div className="bg-primary/20 p-4 rounded-full mr-4">
                  <FaUser className="text-primary text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FaWeight className="text-secondary mr-2" />
                    <span>Current Weight</span>
                  </div>
                  <span className="font-semibold">{currentWeight ? `${currentWeight} kg` : '--'}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FaWeight className="text-accent mr-2" />
                    <span>Target Weight</span>
                  </div>
                  <span className="font-semibold">{targetWeight ? `${targetWeight} kg` : '--'}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-primary mr-2" />
                    <span>Member Since</span>
                  </div>
                  <span className="font-semibold">{memberSince || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaWeight className="text-secondary mr-2" />
                    <span>BMI</span>
                  </div>
                  <span className="font-semibold">{calculateBMI()}</span>
                </div>
              </div>
            </div>
            
            {/* Edit Profile Form */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold mb-6 flex justify-between items-center">
                  Profile Information
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-primary text-sm"
                    disabled={isLoading}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={!isEditing || isLoading}
                          className="input pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={session?.user?.email || ''}
                          disabled
                          className="input pl-10 bg-gray-50 dark:bg-gray-700"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="currentWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Current Weight (kg)
                        </label>
                        <input
                          id="currentWeight"
                          type="number"
                          value={currentWeight}
                          onChange={(e) => setCurrentWeight(e.target.value)}
                          disabled={!isEditing || isLoading}
                          className="input"
                          step="0.1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Target Weight (kg)
                        </label>
                        <input
                          id="targetWeight"
                          type="number"
                          value={targetWeight}
                          onChange={(e) => setTargetWeight(e.target.value)}
                          disabled={!isEditing || isLoading}
                          className="input"
                          step="0.1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Height (cm)
                        </label>
                        <input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          disabled={!isEditing || isLoading}
                          className="input"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="pt-4">
                        <button 
                          type="submit" 
                          className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <FaSave />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 