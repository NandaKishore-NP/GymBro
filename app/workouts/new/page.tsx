'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaDumbbell, FaPlus, FaTrash, FaSave, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { z } from 'zod';

// Define schema for validation
const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  sets: z.number().int().positive("Sets must be a positive number"),
  reps: z.number().int().positive("Reps must be a positive number"),
  weight: z.number().nonnegative("Weight cannot be negative").optional(),
});

const workoutSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  notes: z.string().optional(),
  exercises: z.array(exerciseSchema).min(1, "At least one exercise is required"),
});

interface Exercise {
  id?: number;
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
}

export default function NewWorkoutPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: 3, reps: 10, weight: null }
  ]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, reps: 10, weight: null }]);
  };
  
  const removeExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };
  
  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const newExercises = [...exercises];
    
    if (field === 'weight' && (value === '' || value === null)) {
      newExercises[index][field] = null;
    } else {
      newExercises[index][field] = field === 'name' ? value as string : Number(value);
    }
    
    setExercises(newExercises);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Validate form data
      const validationResult = workoutSchema.safeParse({
        name,
        date,
        notes,
        exercises: exercises.filter(ex => ex.name.trim() !== ''), // Only validate exercises with names
      });
      
      if (!validationResult.success) {
        const errorMsg = Object.values(validationResult.error.flatten().fieldErrors)
          .flat()
          .join(', ');
        setError(errorMsg || 'Please check the form for errors');
        setIsSubmitting(false);
        return;
      }
      
      // Submit workout to API
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          date,
          notes: notes || null,
          exercises: exercises.filter(ex => ex.name.trim() !== ''), // Only save exercises with names
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create workout');
      }
      
      // Redirect to workouts page
      router.push('/');
      router.refresh();
    } catch (error: any) {
      console.error('Error saving workout:', error);
      setError(error.message || 'Failed to save workout. Please try again.');
      setIsSubmitting(false);
    }
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
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">New Workout</h1>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Workout Name*
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Pull Day, Legs Workout, etc."
                required
                className="input"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date*
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How was your workout? Any achievements or challenges?"
              className="input h-24"
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Exercises*</h2>
              <button 
                type="button" 
                onClick={addExercise}
                className="btn-secondary text-sm flex items-center gap-1"
                disabled={isSubmitting}
              >
                <FaPlus size={12} />
                Add Exercise
              </button>
            </div>
            
            {exercises.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 mb-4">No exercises added yet</p>
                <button 
                  type="button" 
                  onClick={addExercise}
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  <FaPlus className="mr-2" />
                  Add First Exercise
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {exercises.map((exercise, index) => (
                  <div key={index} className="p-4 border dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Exercise {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isSubmitting}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor={`exercise-${index}-name`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Exercise Name*
                        </label>
                        <input
                          id={`exercise-${index}-name`}
                          type="text"
                          value={exercise.name}
                          onChange={(e) => updateExercise(index, 'name', e.target.value)}
                          placeholder="e.g., Bench Press, Squat, etc."
                          className="input"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`exercise-${index}-sets`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Sets*
                        </label>
                        <input
                          id={`exercise-${index}-sets`}
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                          min="1"
                          className="input"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`exercise-${index}-reps`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Reps*
                        </label>
                        <input
                          id={`exercise-${index}-reps`}
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                          min="1"
                          className="input"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`exercise-${index}-weight`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Weight (kg)
                        </label>
                        <input
                          id={`exercise-${index}-weight`}
                          type="number"
                          value={exercise.weight === null ? '' : exercise.weight}
                          onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                          min="0"
                          step="0.5"
                          placeholder="Optional"
                          className="input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary mr-4"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 min-w-[120px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Workout
                </>
              )}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
} 