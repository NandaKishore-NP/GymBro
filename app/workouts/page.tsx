'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaDumbbell, FaSearch, FaSpinner, FaFilter, FaPlus } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
}

interface Workout {
  id: number;
  name: string;
  date: string;
  notes: string | null;
  heart_rate: number | null;
  exercises: Exercise[];
}

// Predefined workout categories for filtering
const workoutCategories = [
  'All Workouts',
  'Upper Body',
  'Lower Body',
  'Full Body',
  'Cardio',
  'Core',
  'Strength',
  'Flexibility'
];

export default function WorkoutsPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Workouts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/workouts', {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        
        const data = await response.json();
        setWorkouts(data);
        setFilteredWorkouts(data);
      } catch (err: any) {
        console.error('Error fetching workouts:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkouts();
  }, []);
  
  // Filter workouts based on search query and category
  useEffect(() => {
    if (!workouts.length) return;
    
    let filtered = [...workouts];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(workout => 
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (workout.notes && workout.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (workout.exercises && workout.exercises.some(ex => 
          ex.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All Workouts') {
      filtered = filtered.filter(workout => {
        // Check if workout name contains the category
        if (workout.name.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return true;
        }
        
        // Check if workout notes contain the category
        if (workout.notes && workout.notes.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return true;
        }
        
        // Check specific categories based on exercise names
        if (selectedCategory === 'Upper Body') {
          return workout.exercises && workout.exercises.some(ex => 
            ['chest', 'shoulder', 'bicep', 'tricep', 'back', 'arm', 'pull up', 'push up', 'bench press'].some(term => 
              ex.name.toLowerCase().includes(term)
            )
          );
        }
        
        if (selectedCategory === 'Lower Body') {
          return workout.exercises && workout.exercises.some(ex => 
            ['leg', 'squat', 'lunge', 'deadlift', 'calf', 'hamstring', 'quad', 'glute'].some(term => 
              ex.name.toLowerCase().includes(term)
            )
          );
        }
        
        if (selectedCategory === 'Core') {
          return workout.exercises && workout.exercises.some(ex => 
            ['ab', 'core', 'plank', 'crunch', 'sit-up', 'situp'].some(term => 
              ex.name.toLowerCase().includes(term)
            )
          );
        }
        
        if (selectedCategory === 'Cardio') {
          return workout.exercises && workout.exercises.some(ex => 
            ['run', 'cardio', 'cycle', 'bike', 'jump', 'sprint', 'jog', 'treadmill', 'elliptical', 'rowing'].some(term => 
              ex.name.toLowerCase().includes(term)
            )
          );
        }
        
        if (selectedCategory === 'Strength') {
          return workout.exercises && workout.exercises.some(ex => 
            ['deadlift', 'squat', 'bench', 'press', 'row', 'weight', 'barbell', 'dumbbell'].some(term => 
              ex.name.toLowerCase().includes(term)
            )
          );
        }
        
        if (selectedCategory === 'Flexibility') {
          return workout.exercises && workout.exercises.some(ex => 
            ['stretch', 'yoga', 'mobility', 'flexibility', 'dynamic'].some(term => 
              ex.name.toLowerCase().includes(term)
            )
          );
        }
        
        return false;
      });
    }
    
    setFilteredWorkouts(filtered);
  }, [workouts, searchQuery, selectedCategory]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Workouts</h1>
          
          <Link
            href="/workouts/new"
            className="new-workout-btn"
          >
            <FaPlus className="animate-pulse" />
            New Workout
          </Link>
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
                placeholder="Search workouts or exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex-none">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {workoutCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : loading ? (
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
                  {searchQuery || selectedCategory !== 'All Workouts'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first workout to get started'}
                </p>
                {(!searchQuery && selectedCategory === 'All Workouts') && (
                  <Link
                    href="/workouts/new"
                    className="new-workout-btn"
                  >
                    <FaPlus className="animate-pulse" />
                    New Workout
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <Link key={workout.id} href={`/workouts/${workout.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                          {workout.name}
                        </h3>
                        <div className="text-gray-500 dark:text-gray-400 mb-4">
                          {formatDate(workout.date)}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                          <FaDumbbell className="mr-2" />
                          <span>{workout.exercises?.length || 0} Exercises</span>
                        </div>
                        {workout.notes && (
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mt-2">
                            {workout.notes}
                          </p>
                        )}
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                        <span className="text-primary font-medium">View Details</span>
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