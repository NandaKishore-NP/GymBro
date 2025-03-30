'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaDumbbell, 
  FaArrowLeft, 
  FaClock, 
  FaFire, 
  FaHeart, 
  FaUserFriends,
  FaInfoCircle,
  FaCheck,
  FaPlay,
  FaTimes
} from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { predefinedWorkouts, LibraryWorkout } from '../../library/predefined-workouts';

// Types imported from the library page
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  description: string;
  muscleGroup: string;
  gifUrl?: string;
}

export default function WorkoutLibraryDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [workout, setWorkout] = useState<LibraryWorkout | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [error, setError] = useState('');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  
  // Fetch workout data
  useEffect(() => {
    setLoading(true);
    
    // In a real app, you'd fetch from an API
    // Here we're just filtering the predefined workouts
    try {
      const foundWorkout = predefinedWorkouts.find((w: LibraryWorkout) => w.id === params.id);
      
      if (foundWorkout) {
        setWorkout(foundWorkout);
      } else {
        setError('Workout not found');
      }
    } catch (err) {
      console.error('Error finding workout:', err);
      setError('Failed to load workout details');
    } finally {
      setLoading(false);
    }
  }, [params.id]);
  
  // Format difficulty for display
  const formatDifficulty = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };
  
  // Function to open exercise demo modal
  const openDemoModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowDemoModal(true);
  };
  
  // Function to close exercise demo modal
  const closeDemoModal = () => {
    setShowDemoModal(false);
    setSelectedExercise(null);
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primary"
          >
            <FaArrowLeft className="mr-2" />
            Back to Library
          </button>
        </div>
        
        {error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            <p className="ml-3 text-gray-500">Loading workout details...</p>
          </div>
        ) : workout ? (
          <div className="space-y-8">
            {/* Workout Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {workout.imageUrl && (
                <div className="h-64 md:h-80 overflow-hidden">
                  <img 
                    src={workout.imageUrl} 
                    alt={workout.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{workout.name}</h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-primary bg-opacity-10 text-primary text-sm px-3 py-1 rounded-full">
                        {workout.category}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {formatDifficulty(workout.difficulty)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                      <FaClock className="text-gray-500 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{workout.duration}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                      <FaFire className="text-red-500 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Calories</div>
                        <div className="font-medium">{workout.calories}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                      <FaDumbbell className="text-gray-500 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Exercises</div>
                        <div className="font-medium">{workout.exercises.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">About this workout</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {workout.description}
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Target Muscle Groups</h3>
                  <div className="flex flex-wrap gap-2">
                    {workout.targetMuscles.map((muscle, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Exercise List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Exercise Instructions</h2>
              
              <div className="space-y-8">
                {workout.exercises.map((exercise, index) => (
                  <div 
                    key={index} 
                    className={`p-5 border rounded-lg ${
                      currentExerciseIndex === index 
                        ? 'border-primary bg-primary bg-opacity-5' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="bg-primary bg-opacity-10 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold">{exercise.name}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full">
                          {exercise.sets} sets
                        </span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full">
                          {exercise.reps}
                        </span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full">
                          Rest: {exercise.restTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        <h4 className="font-medium mb-2 flex items-center">
                          <FaInfoCircle className="text-primary mr-2" />
                          How to perform
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {exercise.description}
                        </p>
                        
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Target muscles:</span> {exercise.muscleGroup}
                        </div>
                      </div>
                      
                      <div className="md:w-1/3 flex justify-center items-center">
                        <button
                          onClick={() => openDemoModal(exercise)}
                          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full"
                        >
                          <FaPlay />
                          View Demonstration
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tips Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Tips for Success</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Always warm up properly before starting this workout to prevent injuries.</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Focus on proper form rather than lifting heavier weights or doing more reps.</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Stay hydrated throughout your workout session.</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>If you're a beginner, start with lighter weights and gradually increase as you get stronger.</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Take the recommended rest periods between sets to allow your muscles to recover.</span>
                </li>
              </ul>
            </div>
            
            {/* Save workout button */}
            <div className="flex justify-center">
              <button
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
              >
                <FaHeart />
                Save to My Workouts
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Workout not found</p>
          </div>
        )}
        
        {/* Exercise Demo Modal */}
        {showDemoModal && selectedExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedExercise.name}</h3>
                <button 
                  onClick={closeDemoModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={selectedExercise.gifUrl || '/assets/exercise-gifs/placeholder.svg'} 
                    alt={`${selectedExercise.name} demonstration`}
                    className="w-full h-auto max-h-[400px] object-contain bg-gray-50"
                  />
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FaInfoCircle className="text-primary mr-2" />
                    How to perform
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedExercise.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sets</div>
                    <div className="font-medium">{selectedExercise.sets}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Reps</div>
                    <div className="font-medium">{selectedExercise.reps}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Rest</div>
                    <div className="font-medium">{selectedExercise.restTime}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Target</div>
                    <div className="font-medium">{selectedExercise.muscleGroup}</div>
                  </div>
                </div>
                
                <button
                  onClick={closeDemoModal}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-lg"
                >
                  Close
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