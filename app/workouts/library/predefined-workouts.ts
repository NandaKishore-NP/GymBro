// Workout Library Types
export interface Exercise {
  name: string;
  sets: number;
  reps: string; // e.g., "10-12" or "Until failure"
  restTime: string; // e.g., "60 seconds"
  description: string;
  muscleGroup: string;
  gifUrl?: string;
}

export interface LibraryWorkout {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "30-45 minutes"
  targetMuscles: string[];
  description: string;
  exercises: Exercise[];
  imageUrl?: string;
  calories: string; // e.g., "300-400 calories"
}

// Sample predefined workouts data
export const predefinedWorkouts: LibraryWorkout[] = [
  {
    id: 'upper-body-blast',
    name: 'Upper Body Blast',
    category: 'Upper Body',
    difficulty: 'intermediate',
    duration: '40-50 minutes',
    targetMuscles: ['Chest', 'Shoulders', 'Biceps', 'Triceps', 'Back'],
    description: 'A comprehensive upper body workout targeting all major muscle groups with a focus on strength and muscle development.',
    calories: '350-450 calories',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXBwZXIlMjBib2R5JTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    exercises: [
      {
        name: 'Bench Press',
        sets: 4,
        reps: '8-10',
        restTime: '90 seconds',
        description: 'Lie on a flat bench with feet flat on the floor. Grip the barbell slightly wider than shoulder-width. Lower the bar to your chest, then press back up to full arm extension.',
        muscleGroup: 'Chest',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Pull-Ups',
        sets: 3,
        reps: '8-12',
        restTime: '90 seconds',
        description: 'Hang from a pull-up bar with hands slightly wider than shoulder-width. Pull your body up until your chin clears the bar, then lower with control.',
        muscleGroup: 'Back',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Overhead Press',
        sets: 3,
        reps: '8-10',
        restTime: '90 seconds',
        description: 'Stand with feet shoulder-width apart, holding a barbell at shoulder height. Press the weight overhead until arms are fully extended, then lower back to shoulders.',
        muscleGroup: 'Shoulders',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Bicep Curls',
        sets: 3,
        reps: '10-12',
        restTime: '60 seconds',
        description: 'Stand holding dumbbells at your sides with palms facing forward. Curl the weights up toward your shoulders, keeping elbows close to your body.',
        muscleGroup: 'Biceps',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Tricep Dips',
        sets: 3,
        reps: '12-15',
        restTime: '60 seconds',
        description: 'Using parallel bars or a bench, lower your body by bending your elbows until they reach about 90 degrees, then push back up to the starting position.',
        muscleGroup: 'Triceps',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      }
    ]
  },
  {
    id: 'lower-body-power',
    name: 'Lower Body Power',
    category: 'Lower Body',
    difficulty: 'intermediate',
    duration: '45-55 minutes',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
    description: 'Build leg strength and power with this comprehensive lower body workout. Perfect for developing explosive strength and muscle definition.',
    calories: '400-500 calories',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVnJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    exercises: [
      {
        name: 'Barbell Squats',
        sets: 4,
        reps: '8-10',
        restTime: '120 seconds',
        description: 'Place a barbell across your upper back, stand with feet shoulder-width apart. Bend at the knees and hips to lower your body until thighs are parallel to the floor, then push back up.',
        muscleGroup: 'Quadriceps, Glutes',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Romanian Deadlifts',
        sets: 3,
        reps: '10-12',
        restTime: '90 seconds',
        description: 'Hold a barbell in front of your thighs, feet hip-width apart. Keeping your back straight, push your hips back and lower the bar along your legs until you feel a stretch in your hamstrings, then return to standing.',
        muscleGroup: 'Hamstrings, Glutes',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Walking Lunges',
        sets: 3,
        reps: '12 per leg',
        restTime: '90 seconds',
        description: 'Step forward with one leg, lowering your hips until both knees are bent at about 90 degrees. Push up and step through with the back leg to repeat on the opposite side.',
        muscleGroup: 'Quadriceps, Glutes',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Leg Press',
        sets: 3,
        reps: '10-12',
        restTime: '90 seconds',
        description: 'Sit in the leg press machine with feet shoulder-width apart on the platform. Release the safety locks and lower the platform by bending your knees, then push back to the starting position.',
        muscleGroup: 'Quadriceps, Hamstrings, Glutes',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Calf Raises',
        sets: 4,
        reps: '15-20',
        restTime: '60 seconds',
        description: 'Stand on a raised platform or step with the balls of your feet, heels hanging off. Rise up onto your toes as high as possible, then lower heels below the level of the platform.',
        muscleGroup: 'Calves',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      }
    ]
  },
  {
    id: 'core-crusher',
    name: 'Core Crusher',
    category: 'Core',
    difficulty: 'beginner',
    duration: '20-30 minutes',
    targetMuscles: ['Abs', 'Obliques', 'Lower Back'],
    description: 'Strengthen your core and build abdominal definition with this targeted workout. Great for improving stability and posture.',
    calories: '200-300 calories',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29yZSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    exercises: [
      {
        name: 'Plank',
        sets: 3,
        reps: '30-60 seconds',
        restTime: '60 seconds',
        description: 'Start in a push-up position but with your weight on your forearms. Keep your body in a straight line from head to heels, engaging your core.',
        muscleGroup: 'Core',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Russian Twists',
        sets: 3,
        reps: '20 (10 each side)',
        restTime: '60 seconds',
        description: 'Sit on the floor with knees bent and feet elevated. Lean back slightly, keeping your back straight. Twist your torso to the right, then to the left, touching the floor on each side.',
        muscleGroup: 'Obliques',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Bicycle Crunches',
        sets: 3,
        reps: '20 (10 each side)',
        restTime: '60 seconds',
        description: 'Lie on your back with hands behind your head. Lift shoulders off the floor and bring one knee towards your chest while twisting to meet it with the opposite elbow. Alternate sides.',
        muscleGroup: 'Abs, Obliques',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Leg Raises',
        sets: 3,
        reps: '12-15',
        restTime: '60 seconds',
        description: 'Lie on your back with legs straight and hands at your sides or under your lower back for support. Lift your legs until they form a 90-degree angle with the floor, then lower slowly.',
        muscleGroup: 'Lower Abs',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Superman',
        sets: 3,
        reps: '12-15',
        restTime: '60 seconds',
        description: 'Lie face down with arms extended in front of you. Simultaneously raise your arms, chest, and legs off the floor, hold briefly, then return to the starting position.',
        muscleGroup: 'Lower Back',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      }
    ]
  },
  {
    id: 'hiit-fat-burner',
    name: 'HIIT Fat Burner',
    category: 'HIIT',
    difficulty: 'advanced',
    duration: '25-30 minutes',
    targetMuscles: ['Full Body', 'Cardiovascular System'],
    description: 'A high-intensity interval training workout designed to maximize calorie burn and boost metabolism. Perfect for fat loss and cardio conditioning.',
    calories: '400-500 calories',
    imageUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGlpdCUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    exercises: [
      {
        name: 'Burpees',
        sets: 4,
        reps: '45 seconds work, 15 seconds rest',
        restTime: '15 seconds',
        description: 'Start in a standing position, drop into a squat position with hands on the ground, kick feet back into a plank, perform a push-up, return feet to squat position, and jump up explosively.',
        muscleGroup: 'Full Body',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Mountain Climbers',
        sets: 4,
        reps: '45 seconds work, 15 seconds rest',
        restTime: '15 seconds',
        description: 'Start in a plank position. Keeping your core tight, rapidly alternate bringing each knee toward your chest, as if running in place in a plank position.',
        muscleGroup: 'Core, Shoulders, Cardiovascular',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Jump Squats',
        sets: 4,
        reps: '45 seconds work, 15 seconds rest',
        restTime: '15 seconds',
        description: 'Perform a regular squat, but as you rise, explode upward into a jump. Land softly and immediately lower into the next squat.',
        muscleGroup: 'Legs, Cardiovascular',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'High Knees',
        sets: 4,
        reps: '45 seconds work, 15 seconds rest',
        restTime: '15 seconds',
        description: 'Run in place, bringing your knees up toward your chest as high as possible with each step. Keep a quick pace.',
        muscleGroup: 'Cardiovascular, Legs',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Plank Jacks',
        sets: 4,
        reps: '45 seconds work, 15 seconds rest',
        restTime: '15 seconds',
        description: 'Start in a plank position. Jump both feet outward, then jump them back together, similar to a jumping jack motion but in a plank position.',
        muscleGroup: 'Core, Shoulders, Cardiovascular',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      }
    ]
  },
  {
    id: 'full-body-strength',
    name: 'Full Body Strength Circuit',
    category: 'Full Body',
    difficulty: 'intermediate',
    duration: '50-60 minutes',
    targetMuscles: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'],
    description: 'A comprehensive full-body workout targeting all major muscle groups. Perfect for building overall strength and muscle tone.',
    calories: '450-550 calories',
    imageUrl: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGJvZHklMjB3b3Jrb3V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    exercises: [
      {
        name: 'Deadlifts',
        sets: 4,
        reps: '8-10',
        restTime: '90 seconds',
        description: 'Stand with feet hip-width apart, barbell over midfoot. Bend at the hips and knees to grip the bar. Keeping your back straight, stand up tall by extending hips and knees.',
        muscleGroup: 'Back, Hamstrings, Glutes',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Push-Ups',
        sets: 3,
        reps: '12-15',
        restTime: '60 seconds',
        description: 'Start in a plank position with hands slightly wider than shoulder-width. Lower your body until your chest nearly touches the floor, then push back up.',
        muscleGroup: 'Chest, Shoulders, Triceps',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Dumbbell Rows',
        sets: 3,
        reps: '10-12 per arm',
        restTime: '60 seconds',
        description: 'Place one knee and hand on a bench, with the other foot on the floor. Hold a dumbbell in your free hand, pull it up to your side while keeping your back flat.',
        muscleGroup: 'Back, Biceps',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Goblet Squats',
        sets: 3,
        reps: '12-15',
        restTime: '60 seconds',
        description: 'Hold a dumbbell or kettlebell close to your chest. Stand with feet shoulder-width apart, lower into a squat, then return to standing.',
        muscleGroup: 'Quadriceps, Glutes',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Shoulder Press',
        sets: 3,
        reps: '10-12',
        restTime: '60 seconds',
        description: 'Stand or sit with dumbbells at shoulder height, palms facing forward. Press the weights up until arms are fully extended, then lower back to shoulders.',
        muscleGroup: 'Shoulders, Triceps',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      },
      {
        name: 'Plank',
        sets: 3,
        reps: '30-60 seconds',
        restTime: '60 seconds',
        description: 'Start in a push-up position but with your weight on your forearms. Keep your body in a straight line from head to heels, engaging your core.',
        muscleGroup: 'Core',
        gifUrl: '/assets/exercise-gifs/placeholder.svg'
      }
    ]
  }
]; 