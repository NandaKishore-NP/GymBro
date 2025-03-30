'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { FaUser, FaWeight, FaCalendarAlt, FaDumbbell, FaSpinner, FaChartLine, FaArrowLeft } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Partner {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface WeightLog {
  weight: number;
  date: string;
}

interface Workout {
  id: number;
  name: string;
  date: string;
  notes: string | null;
  heart_rate: number | null;
}

interface ExerciseSummary {
  name: string;
  workout_count: number;
  max_weight: number;
  avg_weight: number;
}

export default function PartnerProgressPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const params = useParams();
  const partnerId = params.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [partner, setPartner] = useState<Partner | null>(null);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
  const [exerciseSummary, setExerciseSummary] = useState<ExerciseSummary[]>([]);

  // Fetch partner's progress
  useEffect(() => {
    const fetchPartnerProgress = async () => {
      if (!session?.user?.id || !partnerId) return;
      
      try {
        setIsLoading(true);
        setError('');
        
        const response = await fetch(`/api/relationships/progress?id=${partnerId}`);
        
        if (response.status === 403) {
          setError('You do not have permission to view this partner\'s progress');
          setIsLoading(false);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch partner progress');
        }
        
        const data = await response.json();
        
        setPartner(data.partner);
        setWeightLogs(data.weightLogs || []);
        setRecentWorkouts(data.recentWorkouts || []);
        setExerciseSummary(data.exerciseSummary || []);
      } catch (error) {
        console.error('Error fetching partner progress:', error);
        setError('Failed to load partner progress. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPartnerProgress();
  }, [session?.user?.id, partnerId]);
  
  // Get the most recent weight
  const getCurrentWeight = () => {
    if (weightLogs.length === 0) return 'N/A';
    return weightLogs[0].weight;
  };
  
  // Get the weight change (last 30 days or overall if less data)
  const getWeightChange = () => {
    if (weightLogs.length < 2) return null;
    
    const currentWeight = weightLogs[0].weight;
    const previousWeight = weightLogs[weightLogs.length - 1].weight;
    const change = currentWeight - previousWeight;
    
    return {
      value: Math.abs(change).toFixed(1),
      direction: change < 0 ? 'loss' : 'gain'
    };
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const weightChange = getWeightChange();

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/partners" className="inline-flex items-center text-primary hover:underline">
            <FaArrowLeft className="mr-2" size={14} />
            Back to Partners
          </Link>
        </div>
        
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
            <p className="text-gray-500">Loading partner data...</p>
          </div>
        ) : partner ? (
          <>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold">{partner.name}'s Progress</h1>
              <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                Member since {formatDate(partner.created_at)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Partner Summary Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaUser className="mr-2 text-primary" />
                  Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 flex-shrink-0 flex justify-center">
                      <FaWeight className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">Current Weight</p>
                      <p className="text-2xl">{getCurrentWeight()} kg</p>
                      
                      {weightChange && (
                        <p className={`text-sm ${weightChange.direction === 'loss' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {weightChange.value} kg {weightChange.direction} since first record
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 flex-shrink-0 flex justify-center">
                      <FaDumbbell className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">Recent Workouts</p>
                      <p className="text-2xl">{recentWorkouts.length}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 flex-shrink-0 flex justify-center">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">Last Workout</p>
                      <p className="text-xl">
                        {recentWorkouts.length > 0 
                          ? formatDate(recentWorkouts[0].date) 
                          : 'No workouts recorded'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Weight History Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaChartLine className="mr-2 text-primary" />
                  Weight History
                </h2>
                
                {weightLogs.length === 0 ? (
                  <p className="text-gray-500 italic py-4">No weight records available</p>
                ) : (
                  <div className="space-y-3">
                    {weightLogs.map((log, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div className="font-medium">{formatDate(log.date)}</div>
                        <div className="text-xl">{log.weight} kg</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Exercise Summary Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaDumbbell className="mr-2 text-primary" />
                  Exercise Summary
                </h2>
                
                {exerciseSummary.length === 0 ? (
                  <p className="text-gray-500 italic py-4">No exercises recorded</p>
                ) : (
                  <div className="space-y-4">
                    {exerciseSummary.map((exercise, index) => (
                      <div key={index} className="pb-4 border-b last:border-0">
                        <div className="font-medium text-lg mb-1">{exercise.name}</div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <div className="text-gray-500">Count</div>
                            <div className="font-medium">{exercise.workout_count}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Max</div>
                            <div className="font-medium">{exercise.max_weight} kg</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Avg</div>
                            <div className="font-medium">{parseFloat(String(exercise.avg_weight)).toFixed(1)} kg</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Recent Workouts */}
              <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
                <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
                
                {recentWorkouts.length === 0 ? (
                  <p className="text-gray-500 italic py-4">No workouts recorded</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Workout</th>
                          <th className="py-3 px-4 text-left">Heart Rate</th>
                          <th className="py-3 px-4 text-left">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentWorkouts.map((workout) => (
                          <tr key={workout.id}>
                            <td className="py-3 px-4">{formatDate(workout.date)}</td>
                            <td className="py-3 px-4 font-medium">{workout.name}</td>
                            <td className="py-3 px-4">
                              {workout.heart_rate ? `${workout.heart_rate} bpm` : '-'}
                            </td>
                            <td className="py-3 px-4">
                              {workout.notes || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-700">Partner not found or no longer available</p>
            <Link href="/partners" className="inline-block mt-4 text-primary hover:underline">
              Return to Partners Page
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 