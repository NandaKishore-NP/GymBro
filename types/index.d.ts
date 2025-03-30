// User type
export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// Workout type
export interface Workout {
  id: number;
  user_id: number;
  name: string;
  date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  exercises?: Exercise[];
}

// Exercise type
export interface Exercise {
  id: number;
  workout_id: number;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  created_at: string;
  updated_at: string;
}

// Weight log type
export interface WeightLog {
  id: number;
  user_id: number;
  weight: number;
  date: string;
  created_at: string;
}

// User profile type
export interface UserProfile {
  id: number;
  user_id: number;
  height?: number;
  goal_weight?: number;
  activity_level?: string;
  fitness_goal?: string;
  created_at: string;
  updated_at: string;
} 