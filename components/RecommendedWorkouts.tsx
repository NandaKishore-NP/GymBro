'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaDumbbell, FaClock, FaFire, FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import { predefinedWorkouts, LibraryWorkout } from '../app/workouts/library/predefined-workouts';

export default function RecommendedWorkouts() {
  const [recommendations, setRecommendations] = useState<LibraryWorkout[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Get a subset of recommended workouts
  useEffect(() => {
    setLoading(true);
    
    // In a real app, this would be personalized based on user preferences/history
    // For demo purposes, we'll just use the predefined workouts 
    const shuffled = [...predefinedWorkouts].sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 4));
    
    setLoading(false);
  }, []);
  
  const handleNext = () => {
    if (currentIndex < recommendations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first recommendation
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(recommendations.length - 1); // Loop to the last recommendation
    }
  };
  
  const formatDifficulty = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };
  
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }
  
  if (recommendations.length === 0) {
    return null;
  }
  
  const currentWorkout = recommendations[currentIndex];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-10 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary">Daily Workout Suggestion</h3>
        <div className="flex items-center">
          <button 
            onClick={handlePrevious}
            className="p-1 rounded-full bg-white bg-opacity-20 text-primary mr-2 hover:bg-opacity-30"
            aria-label="Previous workout"
          >
            <FaChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentIndex + 1}/{recommendations.length}
          </span>
          <button 
            onClick={handleNext}
            className="p-1 rounded-full bg-white bg-opacity-20 text-primary ml-2 hover:bg-opacity-30"
            aria-label="Next workout"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {currentWorkout && (
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-xl font-semibold">{currentWorkout.name}</h4>
            <span className={`px-2 py-1 text-xs rounded-full ${
              currentWorkout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              currentWorkout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {formatDifficulty(currentWorkout.difficulty)}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {currentWorkout.description.substring(0, 150)}
            {currentWorkout.description.length > 150 ? '...' : ''}
          </p>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center mr-4">
              <FaDumbbell className="mr-1" />
              <span>{currentWorkout.exercises.length} exercises</span>
            </div>
            <div className="flex items-center mr-4">
              <FaClock className="mr-1" />
              <span>{currentWorkout.duration}</span>
            </div>
            <div className="flex items-center">
              <FaFire className="mr-1 text-red-500" />
              <span>{currentWorkout.calories}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {currentWorkout.targetMuscles.slice(0, 3).map((muscle, idx) => (
              <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">
                {muscle}
              </span>
            ))}
            {currentWorkout.targetMuscles.length > 3 && (
              <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">
                +{currentWorkout.targetMuscles.length - 3} more
              </span>
            )}
          </div>
          
          <Link 
            href={`/workouts/library/${currentWorkout.id}`}
            className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-2 rounded-md transition-colors"
          >
            View Workout Details
          </Link>
        </div>
      )}
    </div>
  );
} 