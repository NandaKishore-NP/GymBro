'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaDumbbell, 
  FaRunning, 
  FaHeartbeat, 
  FaWeight, 
  FaCalendarCheck,
  FaPlus,
  FaSpinner
} from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Types
interface Workout {
  id: number;
  name: string;
  date: string;
  notes: string | null;
  exercises?: Exercise[];
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
}

interface WeightLog {
  weight: number;
  date: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('workouts');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    activeDays: 0,
    avgHeartRate: 0,
    currentWeight: 0
  });
  const [loading, setLoading] = useState({
    workouts: true,
    profile: true,
    progress: true
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch user's workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setLoading(prev => ({ ...prev, workouts: true }));
        
        const response = await fetch('/api/workouts');
        if (!response.ok) throw new Error('Failed to fetch workouts');
        
        const data = await response.json();
        setWorkouts(data);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalWorkouts: data.length,
          activeDays: new Set(data.map((w: Workout) => w.date.substr(0, 10))).size
        }));
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError('Failed to load workouts. Please try again later.');
      } finally {
        setLoading(prev => ({ ...prev, workouts: false }));
      }
    };
    
    fetchWorkouts();
  }, [status]);

  // Fetch user profile and weight logs
  useEffect(() => {
    const fetchProfileData = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setLoading(prev => ({ ...prev, profile: true }));
        
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data = await response.json();
        
        // Update current weight in stats
        if (data.currentWeight) {
          setStats(prev => ({
            ...prev,
            currentWeight: data.currentWeight
          }));
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(prev => ({ ...prev, profile: false }));
      }
    };
    
    fetchProfileData();
  }, [status]);

  // Generate chart data based on weight logs
  useEffect(() => {
    const generateChartData = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setLoading(prev => ({ ...prev, progress: true }));
        
        // This would typically come from your API
        // For now, let's generate sample data
        const mockWeightData = [
          { date: '2023-01-01', weight: 80 },
          { date: '2023-02-01', weight: 79 },
          { date: '2023-03-01', weight: 78 },
          { date: '2023-04-01', weight: 77.5 },
          { date: '2023-05-01', weight: 76 },
          { date: '2023-06-01', weight: 75 }
        ];
        
        setWeightLogs(mockWeightData);
        
        // Format data for chart
        const chartData = {
          labels: mockWeightData.map(log => {
            const date = new Date(log.date);
            return date.toLocaleString('default', { month: 'short' });
          }),
          datasets: [
            {
              label: 'Weight (kg)',
              data: mockWeightData.map(log => log.weight),
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
            }
          ],
        };
        
        setChartData(chartData);
      } catch (err) {
        console.error('Error generating chart data:', err);
      } finally {
        setLoading(prev => ({ ...prev, progress: false }));
      }
    };
    
    generateChartData();
  }, [status]);

  return (
    <div className="flex-1 container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6 bg-gradient-to-r from-primary/20 to-accent/20"
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Welcome back, {session?.user?.name || 'Fitness Warrior'}!</h2>
        <p className="mb-4 text-sm md:text-base">Track your progress, plan your workouts, and crush your goals.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard 
            icon={<FaDumbbell />} 
            title="Workouts" 
            value={stats.totalWorkouts.toString()}
            subtitle="This Month" 
            loading={loading.workouts}
          />
          <StatCard 
            icon={<FaRunning />} 
            title="Active Days" 
            value={stats.activeDays.toString()}
            subtitle="This Month"
            loading={loading.workouts}
          />
          <StatCard 
            icon={<FaHeartbeat />} 
            title="Avg. Heart Rate" 
            value="--"
            subtitle="BPM"
            loading={loading.profile}
          />
          <StatCard 
            icon={<FaWeight />} 
            title="Current Weight" 
            value={stats.currentWeight ? `${stats.currentWeight} kg` : '--'}
            subtitle="Kilograms"
            loading={loading.profile}
          />
        </div>
      </motion.div>
      
      {/* Tabs Section */}
      <div className="mb-6 flex flex-wrap overflow-x-auto space-x-2 pb-2">
        <TabButton 
          active={activeTab === 'workouts'} 
          onClick={() => setActiveTab('workouts')} 
          icon={<FaDumbbell />} 
          text="Workouts"
        />
        <TabButton 
          active={activeTab === 'progress'} 
          onClick={() => setActiveTab('progress')} 
          icon={<FaChartLine />} 
          text="Progress"
        />
        <TabButton 
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')} 
          icon={<FaCalendarCheck />} 
          text="Schedule"
        />
      </div>
      
      {/* Content Section */}
      <div className="pb-6">
        {activeTab === 'workouts' && (
          <WorkoutsPanel 
            workouts={workouts} 
            loading={loading.workouts} 
            error={error}
          />
        )}
        
        {activeTab === 'progress' && (
          <ProgressPanel 
            chartData={chartData}
            loading={loading.progress}
          />
        )}
        
        {activeTab === 'schedule' && (
          <SchedulePanel />
        )}
      </div>
    </div>
  );
};

const StatCard = ({ 
  icon, 
  title, 
  value, 
  subtitle,
  loading
}: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  subtitle: string,
  loading: boolean
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-4 flex items-center">
      <div className="mr-3 md:mr-4 bg-primary/10 text-primary p-2 md:p-3 rounded-lg">
        {icon}
      </div>
      <div>
        {loading ? (
          <div className="flex items-center">
            <FaSpinner className="animate-spin mr-2" />
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <>
            <div className="text-lg md:text-xl font-semibold">{value}</div>
            <div className="text-xs md:text-sm text-gray-500">{title} • {subtitle}</div>
          </>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center text-sm md:text-base whitespace-nowrap ${
        active 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

const WorkoutsPanel = ({ 
  workouts,
  loading,
  error
}: { 
  workouts: Workout[],
  loading: boolean,
  error: string | null
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <FaSpinner className="animate-spin text-primary text-2xl mr-3" />
        <span>Loading your workouts...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }
  
  if (workouts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <FaDumbbell className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Workouts Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Start tracking your fitness journey by adding your first workout.
        </p>
        <Link href="/workouts/new" className="btn-primary inline-flex items-center">
          <FaPlus className="mr-2" />
          Add First Workout
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-xl font-semibold">Recent Workouts</h3>
        <Link href="/workouts/new" className="btn-primary text-sm flex items-center gap-1">
          <FaPlus size={12} />
          <span>New Workout</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.slice(0, 6).map((workout) => (
          <Link href={`/workouts/${workout.id}`} key={workout.id}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="card hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <div className="text-lg font-semibold mb-1">{workout.name}</div>
              <div className="text-sm text-gray-500 mb-2">
                {new Date(workout.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              
              {workout.exercises && workout.exercises.length > 0 ? (
                <div className="text-sm">
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    {workout.exercises.length} Exercise{workout.exercises.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-gray-500 mt-1 line-clamp-2">
                    {workout.exercises.map(ex => ex.name).join(', ')}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">No exercises recorded</div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
      
      {workouts.length > 6 && (
        <div className="text-center mt-6">
          <Link href="/workouts" className="text-primary hover:text-primary-dark transition-colors">
            View All Workouts
          </Link>
        </div>
      )}
    </div>
  );
};

const ProgressPanel = ({ 
  chartData, 
  loading 
}: { 
  chartData: any, 
  loading: boolean 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <FaSpinner className="animate-spin text-primary text-2xl mr-3" />
        <span>Loading your progress data...</span>
      </div>
    );
  }
  
  if (!chartData) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No Data Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Start tracking your weight to see progress over time.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="card">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Weight Progress</h3>
        <div className="h-64 md:h-80">
          <Line 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                },
              },
            }} 
          />
        </div>
      </div>
    </div>
  );
};

const SchedulePanel = () => {
  return (
    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Workout scheduling will be available in a future update.
      </p>
    </div>
  );
};

// Export for use in other components
const FaChartLine = () => {
  return <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path></svg>;
};

export default Dashboard; 