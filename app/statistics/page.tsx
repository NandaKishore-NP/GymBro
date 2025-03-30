'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  FaDumbbell, 
  FaWeight, 
  FaCalendarAlt, 
  FaRunning, 
  FaSpinner, 
  FaFireAlt,
  FaChartLine,
  FaHeartbeat
} from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface WeightLog {
  weight: number;
  date: string;
}

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

export default function StatisticsPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  
  const [periodFilter, setPeriodFilter] = useState('month'); // week, month, year, all
  
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalExercises: 0,
    activeDays: 0,
    currentWeight: 0,
    weightChange: 0,
    averageWorkoutsPerWeek: 0,
    mostFrequentExercise: '',
    heaviestWeight: 0,
    avgHeartRate: 0,
    maxHeartRate: 0
  });
  
  // Fetch workouts and weight data
  useEffect(() => {
    const fetchData = async () => {
      if (status !== 'authenticated') return;
      
      setIsLoading(true);
      
      try {
        // Fetch workouts
        const workoutsResponse = await fetch('/api/workouts');
        if (!workoutsResponse.ok) throw new Error('Failed to fetch workouts');
        const workoutsData = await workoutsResponse.json();
        setWorkouts(workoutsData);
        
        // Fetch actual weight logs
        const weightLogsResponse = await fetch('/api/weight-logs');
        if (!weightLogsResponse.ok) throw new Error('Failed to fetch weight logs');
        const weightLogsData = await weightLogsResponse.json();
        
        // If no weight logs found, try to get at least current weight from profile
        if (!weightLogsData || weightLogsData.length === 0) {
          const profileResponse = await fetch('/api/profile');
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            
            if (profileData.currentWeight) {
              // Create at least one weight log with current weight
              const today = new Date().toISOString().split('T')[0];
              weightLogsData.push({
                date: today,
                weight: profileData.currentWeight
              });
            }
          }
        }
        
        setWeightLogs(weightLogsData);
        
        // Calculate statistics
        calculateStats(workoutsData, weightLogsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load statistics data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [status]);
  
  // Calculate various statistics
  const calculateStats = (workouts: Workout[], weightLogs: WeightLog[]) => {
    // Create a set of unique workout dates
    const uniqueDates = new Set(workouts.map(w => w.date.split('T')[0]));
    
    // Count total exercises
    const totalExercises = workouts.reduce((sum, workout) => 
      sum + (workout.exercises ? workout.exercises.length : 0), 0);
    
    // Exercise frequency
    const exerciseCount: {[key: string]: number} = {};
    let heaviestWeight = 0;
    
    workouts.forEach(workout => {
      if (workout.exercises) {
        workout.exercises.forEach(exercise => {
          exerciseCount[exercise.name] = (exerciseCount[exercise.name] || 0) + 1;
          
          if (exercise.weight && exercise.weight > heaviestWeight) {
            heaviestWeight = exercise.weight;
          }
        });
      }
    });
    
    // Find most frequent exercise
    let mostFrequentExercise = '';
    let maxCount = 0;
    
    Object.entries(exerciseCount).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentExercise = name;
      }
    });
    
    // Calculate weight change
    let weightChange = 0;
    if (weightLogs.length >= 2) {
      const firstWeight = weightLogs[0].weight;
      const lastWeight = weightLogs[weightLogs.length - 1].weight;
      weightChange = lastWeight - firstWeight;
    }
    
    // Calculate average workouts per week
    const today = new Date();
    const oldestWorkoutDate = workouts.length > 0 
      ? new Date(workouts[workouts.length - 1].date) 
      : today;
    
    const weeksPassed = Math.max(1, Math.round(
      (today.getTime() - oldestWorkoutDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    ));
    
    const averageWorkoutsPerWeek = workouts.length / weeksPassed;
    
    // Calculate heart rate stats
    const workoutsWithHeartRate = workouts.filter(workout => 
      workout.heart_rate !== null && workout.heart_rate !== undefined);
      
    let avgHeartRate = 0;
    let maxHeartRate = 0;
    
    if (workoutsWithHeartRate.length > 0) {
      const sum = workoutsWithHeartRate.reduce((acc, workout) => 
        acc + (workout.heart_rate || 0), 0);
      
      avgHeartRate = Math.round(sum / workoutsWithHeartRate.length);
      maxHeartRate = Math.max(...workoutsWithHeartRate.map(w => w.heart_rate || 0));
    }
    
    // Set the calculated stats
    setStats({
      totalWorkouts: workouts.length,
      totalExercises: totalExercises,
      activeDays: uniqueDates.size,
      currentWeight: weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : 0,
      weightChange: weightChange,
      averageWorkoutsPerWeek: parseFloat(averageWorkoutsPerWeek.toFixed(1)),
      mostFrequentExercise: mostFrequentExercise,
      heaviestWeight: heaviestWeight,
      avgHeartRate: avgHeartRate,
      maxHeartRate: maxHeartRate
    });
  };
  
  // Filter data based on selected period
  const getFilteredData = (dataArray: any[], dateField: string) => {
    const today = new Date();
    let cutoffDate = new Date();
    
    switch (periodFilter) {
      case 'week':
        cutoffDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        cutoffDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'all':
      default:
        return dataArray;
    }
    
    return dataArray.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= cutoffDate;
    });
  };
  
  // Prepare weight chart data
  const getWeightChartData = () => {
    const filteredWeightLogs = getFilteredData(weightLogs, 'date');
    
    return {
      labels: filteredWeightLogs.map(log => {
        const date = new Date(log.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Weight (kg)',
          data: filteredWeightLogs.map(log => log.weight),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.2,
          fill: true
        }
      ]
    };
  };
  
  // Prepare workout frequency chart data
  const getWorkoutFrequencyData = () => {
    const filteredWorkouts = getFilteredData(workouts, 'date');
    
    // Group workouts by date
    const workoutsByDate: {[key: string]: number} = {};
    filteredWorkouts.forEach(workout => {
      const date = new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      workoutsByDate[date] = (workoutsByDate[date] || 0) + 1;
    });
    
    return {
      labels: Object.keys(workoutsByDate),
      datasets: [
        {
          label: 'Workouts',
          data: Object.values(workoutsByDate),
          backgroundColor: '#10B981',
          borderColor: '#059669',
          borderWidth: 1
        }
      ]
    };
  };
  
  // Prepare exercise type distribution chart data
  const getExerciseDistributionData = () => {
    const exerciseTypes: {[key: string]: number} = {};
    
    workouts.forEach(workout => {
      if (workout.exercises) {
        workout.exercises.forEach(exercise => {
          const type = categorizeExercise(exercise.name);
          exerciseTypes[type] = (exerciseTypes[type] || 0) + 1;
        });
      }
    });
    
    return {
      labels: Object.keys(exerciseTypes),
      datasets: [
        {
          data: Object.values(exerciseTypes),
          backgroundColor: [
            '#3B82F6', // Blue
            '#10B981', // Green
            '#F59E0B', // Yellow
            '#EF4444', // Red
            '#8B5CF6', // Purple
            '#EC4899'  // Pink
          ],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Simple exercise categorization based on name keywords
  const categorizeExercise = (name: string) => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('bench') || lowerName.includes('chest') || lowerName.includes('press')) {
      return 'Chest';
    } else if (lowerName.includes('squat') || lowerName.includes('leg') || lowerName.includes('lunge')) {
      return 'Legs';
    } else if (lowerName.includes('deadlift') || lowerName.includes('back') || lowerName.includes('row')) {
      return 'Back';
    } else if (lowerName.includes('shoulder') || lowerName.includes('deltoid')) {
      return 'Shoulders';
    } else if (lowerName.includes('bicep') || lowerName.includes('curl')) {
      return 'Arms';
    } else if (lowerName.includes('abs') || lowerName.includes('crunch') || lowerName.includes('core')) {
      return 'Core';
    } else {
      return 'Other';
    }
  };
  
  // Prepare heart rate chart data
  const getHeartRateChartData = () => {
    const filteredWorkouts = getFilteredData(workouts, 'date')
      .filter(workout => workout.heart_rate !== null && workout.heart_rate !== undefined);
    
    // Sort by date
    filteredWorkouts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      labels: filteredWorkouts.map(workout => {
        const date = new Date(workout.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Heart Rate (BPM)',
          data: filteredWorkouts.map(workout => workout.heart_rate),
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.2,
          fill: true
        }
      ]
    };
  };
  
  if (status === 'unauthenticated') {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Access Required</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please log in to view your workout statistics.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <FaChartLine className="mr-3 text-primary" />
          Workout Statistics
        </h1>
        
        {error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
            <p className="text-gray-500">Loading statistics...</p>
          </div>
        ) : (
          <>
            {/* Time period filter */}
            <div className="mb-8 flex flex-wrap gap-2 justify-end">
              <span className="text-gray-700 dark:text-gray-300 mr-2 self-center">
                Show data for:
              </span>
              {['week', 'month', 'year', 'all'].map((period) => (
                <button
                  key={period}
                  onClick={() => setPeriodFilter(period)}
                  className={`px-4 py-2 rounded-lg ${
                    periodFilter === period
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Stats overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mr-4">
                    <FaDumbbell className="text-blue-600 dark:text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{stats.totalWorkouts}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Total Workouts</p>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mr-4">
                    <FaCalendarAlt className="text-green-600 dark:text-green-400 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{stats.activeDays}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Active Days</p>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full mr-4">
                    <FaRunning className="text-yellow-600 dark:text-yellow-400 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{stats.averageWorkoutsPerWeek}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Workouts/Week</p>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mr-4">
                    <FaWeight className="text-red-600 dark:text-red-400 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center">
                      {stats.currentWeight} kg
                      {stats.weightChange !== 0 && (
                        <span className={`text-sm ml-2 ${stats.weightChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stats.weightChange > 0 ? '+' : ''}{stats.weightChange.toFixed(1)}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">Current Weight</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Most Frequent Exercise</h3>
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-3">
                    <FaDumbbell className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-bold">{stats.mostFrequentExercise || 'None'}</span>
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Exercises Performed</h3>
                <div className="flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-3">
                    <FaFireAlt className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="font-bold">{stats.totalExercises}</span>
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Heaviest Weight Lifted</h3>
                <div className="flex items-center">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mr-3">
                    <FaWeight className="text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="font-bold">{stats.heaviestWeight || 0} kg</span>
                </div>
              </div>
            </div>
            
            {/* Heart Rate Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Average Heart Rate</h3>
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-3">
                    <FaHeartbeat className="text-red-600 dark:text-red-400" />
                  </div>
                  <span className="font-bold">{stats.avgHeartRate ? `${stats.avgHeartRate} BPM` : 'No data'}</span>
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Max Heart Rate</h3>
                <div className="flex items-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full mr-3">
                    <FaHeartbeat className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="font-bold">{stats.maxHeartRate ? `${stats.maxHeartRate} BPM` : 'No data'}</span>
                </div>
              </div>
            </div>
            
            {/* Weight progress chart */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-6">Weight Progress</h2>
              <div className="h-80">
                {weightLogs.length > 0 ? (
                  <Line 
                    data={getWeightChartData()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          mode: 'index',
                          intersect: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: false,
                        }
                      },
                    }}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">No weight data available</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Workout Frequency & Exercise Distribution charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">Workout Frequency</h2>
                <div className="h-80">
                  {workouts.length > 0 ? (
                    <Bar 
                      data={getWorkoutFrequencyData()} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              precision: 0
                            }
                          }
                        },
                      }}
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-gray-500">No workout data available</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">Exercise Distribution</h2>
                <div className="h-80 flex justify-center items-center">
                  {workouts.length > 0 && stats.totalExercises > 0 ? (
                    <div className="w-64">
                      <Pie
                        data={getExerciseDistributionData()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'right',
                            }
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500">No exercise data available</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Heart Rate chart */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-6">Heart Rate Trends</h2>
              <div className="h-80">
                {workouts.some(w => w.heart_rate) ? (
                  <Line 
                    data={getHeartRateChartData()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          mode: 'index',
                          intersect: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: false,
                          title: {
                            display: true,
                            text: 'Heart Rate (BPM)'
                          }
                        }
                      },
                    }}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">No heart rate data available. Add your heart rate when logging workouts.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
} 