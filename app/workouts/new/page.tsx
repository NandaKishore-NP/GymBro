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
  heart_rate: z.number().int().min(20, "Heart rate must be at least 20 BPM").max(250, "Heart rate must be at most 250 BPM").optional(),
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
  const [heartRate, setHeartRate] = useState<string>('');
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
      if (field === 'name') {
        newExercises[index][field] = value as string;
      } else if (field === 'sets' || field === 'reps' || field === 'weight') {
        newExercises[index][field] = Number(value);
      }
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
        heart_rate: heartRate ? Number(heartRate) : undefined,
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
          heart_rate: heartRate ? Number(heartRate) : null,
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
      <main className="flex-1 container mx-auto px-4 py-6 mb-16">
        <div className="mb-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">New Workout</h1>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
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
          
          <div className="mb-4 md:mb-6">
            <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Average Heart Rate (BPM)
            </label>
            <input
              id="heartRate"
              type="number"
              min="20"
              max="250"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="e.g., 135"
              className="input w-full md:w-1/3"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">Optional, but helps track workout intensity</p>
          </div>
          
          <div className="mb-4 md:mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How was your workout? Any achievements or challenges?"
              className="input h-20 md:h-24"
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          <div className="mb-4 md:mb-6">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Exercises*</h2>
              <button 
                type="button" 
                onClick={addExercise}
                className="btn-secondary text-xs md:text-sm flex items-center gap-1 py-1 px-2 md:py-2 md:px-4"
                disabled={isSubmitting}
              >
                <FaPlus size={12} />
                <span>Add Exercise</span>
              </button>
            </div>
            
            {exercises.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 mb-4 text-sm md:text-base">No exercises added yet</p>
                <button 
                  type="button" 
                  onClick={addExercise}
                  className="btn-primary text-sm"
                  disabled={isSubmitting}
                >
                  <FaPlus className="mr-2 inline-block" />
                  Add First Exercise
                </button>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {exercises.map((exercise, index) => (
                  <div key={index} className="p-3 md:p-4 border dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-sm md:text-base">Exercise {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                        disabled={isSubmitting}
                        aria-label="Remove exercise"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor={`exercise-${index}-name`} className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                        <label htmlFor={`exercise-${index}-sets`} className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Sets*
                        </label>
                        <input
                          id={`exercise-${index}-sets`}
                          type="number"
                          min="1"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                          className="input"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`exercise-${index}-reps`} className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Reps*
                        </label>
                        <input
                          id={`exercise-${index}-reps`}
                          type="number"
                          min="1"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                          className="input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <label htmlFor={`exercise-${index}-weight`} className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight (kg) - optional
                      </label>
                      <input
                        id={`exercise-${index}-weight`}
                        type="number"
                        min="0"
                        step="0.5"
                        value={exercise.weight === null ? '' : exercise.weight}
                        onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                        placeholder="Enter weight"
                        className="input"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
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