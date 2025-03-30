import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaCalendarAlt, 
  FaDumbbell, 
  FaClock, 
  FaChevronRight, 
  FaPlus 
} from 'react-icons/fa';

// Mock data for upcoming workouts
const mockUpcomingWorkouts = [
  {
    id: 'upcoming-1',
    name: 'Upper Body Strength',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    duration: 45
  },
  {
    id: 'upcoming-2',
    name: 'Cardio Blast',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: 30
  },
  {
    id: 'upcoming-3',
    name: 'Leg Day',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    duration: 60
  }
];

const UpcomingWorkouts = () => {
  const [upcomingWorkouts, setUpcomingWorkouts] = useState(mockUpcomingWorkouts);

  // Format the date to display day and time
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if the date is today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if the date is tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    // Return the day of week for other days
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Format time (e.g., "10:30 AM")
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FaCalendarAlt className="mr-2 text-primary" />
          Upcoming Workouts
        </h3>
        <Link href="/schedule" className="text-primary hover:text-primary-dark text-sm flex items-center gap-1">
          View All
          <FaChevronRight size={12} />
        </Link>
      </div>

      {upcomingWorkouts.length > 0 ? (
        <div className="space-y-3">
          {upcomingWorkouts.map((workout) => (
            <div key={workout.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{workout.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-3 mt-1">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" size={12} />
                    {formatDate(workout.date)}
                  </span>
                  <span className="flex items-center">
                    <FaClock className="mr-1" size={12} />
                    {formatTime(workout.date)}
                  </span>
                  <span className="flex items-center">
                    <FaDumbbell className="mr-1" size={12} />
                    {workout.duration} min
                  </span>
                </div>
              </div>
              <Link href={`/schedule/${workout.id}`} className="text-primary">
                <FaChevronRight />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            No upcoming workouts scheduled
          </p>
          <Link href="/schedule/new" className="btn-primary inline-flex items-center text-sm">
            <FaPlus className="mr-1" size={12} />
            Schedule Workout
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingWorkouts; 