# GymBro - Fitness Tracking Application

GymBro is a modern fitness tracking application that helps you monitor your gym progress, get workout suggestions, and stay motivated throughout your fitness journey.

## Features

- **Workout Tracking:** Log and monitor your gym workouts
- **Progress Charts:** Visualize your progress over time
- **Mobile Responsive:** Works seamlessly on all devices
- **Modern UI:** Beautiful and intuitive interface
- **Workout Suggestions:** Get personalized workout recommendations

## Tech Stack

- **Next.js:** React framework for building the application
- **TypeScript:** For type safety
- **Tailwind CSS:** For styling
- **Chart.js:** For data visualization
- **Framer Motion:** For animations and transitions
- **React Icons:** For beautiful icons
- **SQLite:** For data storage
- **Next Auth:** For authentication

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gymbro.git
```

2. Navigate to the project directory
```bash
cd gymbro
```

3. Install dependencies
```bash
npm install
```

4. Run the setup script to initialize the environment and database
```bash
npm run setup
```
   This will:
   - Create a `.env.local` file with required environment variables
   - Set up the database directory
   - Initialize the database with sample data
   
   Or manually create an `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

5. Start the development server
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

### Test User Credentials
After running the setup script, you can login with:
- Email: test@example.com
- Password: password123

## Deployment

Build the application for production:

```bash
npm run build
```

Run the built app in production mode:

```bash
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.