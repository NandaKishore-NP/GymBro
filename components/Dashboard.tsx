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
    <div className="flex-1 container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8 bg-gradient-to-r from-primary/20 to-accent/20"
      >
        <h2 className="text-2xl font-semibold mb-2">Welcome back, {session?.user?.name || 'Fitness Warrior'}!</h2>
        <p className="mb-4">Track your progress, plan your workouts, and crush your goals.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            loading={false}
          />
          <StatCard 
            icon={<FaWeight />} 
            title="Current Weight" 
            value={stats.currentWeight ? `${stats.currentWeight}` : "--"}
            subtitle="kg"
            loading={loading.profile}
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex mb-6 space-x-4 border-b">
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

      {/* Content based on active tab */}
      <div className="pb-10">
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
        {activeTab === 'schedule' && <SchedulePanel />}
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
    <div className="bg-white dark:bg-dark/50 rounded-lg p-4 shadow-sm flex items-center space-x-4">
      <div className="bg-primary/20 p-3 rounded-full text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        {loading ? (
          <div className="flex items-center">
            <FaSpinner className="animate-spin text-gray-400 mr-2" />
            <span className="text-gray-400">Loading...</span>
          </div>
        ) : (
          <>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          </>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string }) => {
  return (
    <button 
      className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium ${
        active 
          ? 'border-primary text-primary' 
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      }`}
      onClick={onClick}
    >
      {icon}
      {text}
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
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Workouts</h2>
        <Link href="/workouts/new" className="btn-primary flex items-center gap-2">
          <FaPlus />
          Add Workout
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
          <p className="text-gray-500">Loading workouts...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      ) : workouts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't logged any workouts yet.</p>
          <Link href="/workouts/new" className="btn-primary">
            Log Your First Workout
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map(workout => (
            <div key={workout.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{workout.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {new Date(workout.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <FaDumbbell />
                </div>
              </div>
              {workout.notes && (
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {workout.notes}
                </p>
              )}
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Exercises</p>
                  <p className="font-medium">{workout.exercises?.length || "--"}</p>
                </div>
                <div className="text-right">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="text-primary hover:text-blue-700"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Your Progress</h2>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-primary text-3xl mr-3" />
          <p className="text-gray-500">Loading progress data...</p>
        </div>
      ) : !chartData ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No progress data available yet.</p>
        </div>
      ) : (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-4">Weight Progress</h3>
          <div className="h-80">
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false
                  }
                }
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

const SchedulePanel = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Your Schedule</h2>
      <div className="card text-center py-12">
        <h3 className="text-lg font-semibold mb-4">Coming Soon!</h3>
        <p className="text-gray-500 mb-6">The scheduler feature is under development</p>
        <button className="btn-primary">Get Notified</button>
      </div>
    </div>
  );
};

const FaChartLine = () => {
  return <span className="text-current">📈</span>;
};

export default Dashboard; 