'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaDumbbell, FaSearch, FaSpinner, FaFilter, FaHeart, FaClock, FaFire, FaInfoCircle } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { predefinedWorkouts, LibraryWorkout } from './predefined-workouts';

// Workout Library Types
interface Exercise {
  name: string;
  sets: number;
  reps: string; // e.g., "10-12" or "Until failure"
  restTime: string; // e.g., "60 seconds"
  description: string;
  muscleGroup: string;
  videoUrl?: string;
}

// Predefined workout categories for filtering
const workoutCategories = [
  'All Categories',
  'Upper Body',
  'Lower Body',
  'Full Body',
  'Core',
  'Cardio',
  'HIIT',
  'Strength',
  'Flexibility',
  'Recovery'
];

// Predefined difficulty levels
const difficultyLevels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

export default function WorkoutLibraryPage() {
  const [filteredWorkouts, setFilteredWorkouts] = useState<LibraryWorkout[]>(predefinedWorkouts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [loading, setLoading] = useState(false);
  
  // Filter workouts based on search query, category, and difficulty
  useEffect(() => {
    setLoading(true);
    
    let filtered = [...predefinedWorkouts];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(workout => 
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.targetMuscles.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        workout.exercises.some(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(workout => workout.category === selectedCategory);
    }
    
    // Apply difficulty filter
    if (selectedDifficulty !== 'All Levels') {
      filtered = filtered.filter(workout => 
        workout.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }
    
    // Add a small delay to simulate loading for better UX
    setTimeout(() => {
      setFilteredWorkouts(filtered);
      setLoading(false);
    }, 300);
  }, [searchQuery, selectedCategory, selectedDifficulty]);
  
  // Format difficulty for display
  const formatDifficulty = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Workout Library</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Explore professional workout routines for all fitness levels
            </p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Search workouts, exercises or muscle groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex-none md:w-60">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {workoutCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Difficulty Filter */}
            <div className="flex-none md:w-48">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
            <p className="text-gray-500">Loading workouts...</p>
          </div>
        ) : (
          <>
            {filteredWorkouts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <FaDumbbell className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">No workouts found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <Link key={workout.id} href={`/workouts/library/${workout.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      {workout.imageUrl && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={workout.imageUrl} 
                            alt={workout.name} 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {workout.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                            workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {formatDifficulty(workout.difficulty)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {workout.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {workout.targetMuscles.slice(0, 3).map((muscle, index) => (
                            <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                              {muscle}
                            </span>
                          ))}
                          {workout.targetMuscles.length > 3 && (
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                              +{workout.targetMuscles.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-auto">
                          <div className="flex items-center mr-4">
                            <FaClock className="mr-1" />
                            <span>{workout.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <FaFire className="mr-1 text-red-500" />
                            <span>{workout.calories}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-between items-center">
                        <span className="text-primary font-medium">View Details</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {workout.exercises.length} exercises
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
} 