'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaDumbbell, FaEdit, FaTrash, FaArrowLeft, FaSpinner } from 'react-icons/fa';
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
  exercises: Exercise[];
}

export default function WorkoutDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Fetch workout data
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/workouts/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Workout not found');
          }
          throw new Error('Failed to fetch workout');
        }
        
        const data = await response.json();
        setWorkout(data);
      } catch (err: any) {
        console.error('Error fetching workout:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkout();
  }, [params.id]);
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/workouts/${params.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }
      
      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (err: any) {
      console.error('Error deleting workout:', err);
      setError(err.message || 'Failed to delete workout');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
            Back
          </button>
        </div>
        
        {error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
            <p className="text-gray-500">Loading workout details...</p>
          </div>
        ) : workout ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold">{workout.name}</h1>
              
              <div className="flex mt-4 md:mt-0">
                <button
                  onClick={() => router.push(`/workouts/${params.id}/edit`)}
                  className="btn-secondary flex items-center mr-3"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center"
                  disabled={isDeleting}
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-8">
              <div className="flex flex-col md:flex-row md:items-center text-gray-600 dark:text-gray-300">
                <div className="flex items-center mr-6 mb-2 md:mb-0">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(workout.date)}</span>
                </div>
                <div className="flex items-center">
                  <FaDumbbell className="mr-2" />
                  <span>{workout.exercises.length} Exercises</span>
                </div>
              </div>
            </div>
            
            {workout.notes && (
              <div className="card mb-8">
                <h2 className="text-xl font-semibold mb-2">Notes</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {workout.notes}
                </p>
              </div>
            )}
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Exercises</h2>
              
              {workout.exercises.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No exercises recorded for this workout.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left">Exercise</th>
                        <th className="px-4 py-2 text-center">Sets</th>
                        <th className="px-4 py-2 text-center">Reps</th>
                        <th className="px-4 py-2 text-right">Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {workout.exercises.map((exercise) => (
                        <tr key={exercise.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-3 font-medium">{exercise.name}</td>
                          <td className="px-4 py-3 text-center">{exercise.sets}</td>
                          <td className="px-4 py-3 text-center">{exercise.reps}</td>
                          <td className="px-4 py-3 text-right">
                            {exercise.weight ? `${exercise.weight} kg` : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Delete confirmation modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                  <h3 className="text-xl font-bold mb-4">Delete Workout</h3>
                  <p className="mb-6">Are you sure you want to delete this workout? This action cannot be undone.</p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FaTrash className="mr-2" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Workout not found</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

const FaCalendarAlt = () => {
  return <span className="text-current">📅</span>;
}; 