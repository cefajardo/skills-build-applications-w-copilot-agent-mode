/**
 * Seed the octofit_db database with test data
 * 
 * This script initializes the database with sample users, teams, activities,
 * workouts, and leaderboard entries for testing and development.
 */

import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const seed = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    await mongoose.connect(mongoUri);
    console.log(`✅ Connected to MongoDB at ${mongoUri}`);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const users = await User.insertMany([
      {
        username: 'alex_fitness',
        email: 'alex@example.com',
        password: 'hashedpassword123',
      },
      {
        username: 'jordan_runner',
        email: 'jordan@example.com',
        password: 'hashedpassword123',
      },
      {
        username: 'casey_cyclist',
        email: 'casey@example.com',
        password: 'hashedpassword123',
      },
      {
        username: 'morgan_yoga',
        email: 'morgan@example.com',
        password: 'hashedpassword123',
      },
      {
        username: 'taylor_strength',
        email: 'taylor@example.com',
        password: 'hashedpassword123',
      },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create teams
    console.log('🏢 Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Morning Warriors',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Evening Enthusiasts',
        members: [users[2]._id, users[3]._id, users[4]._id],
      },
      {
        name: 'Weekend Warriors',
        members: [users[0]._id, users[2]._id],
      },
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // Create workouts
    console.log('🏋️  Creating workouts...');
    const workouts = await Workout.insertMany([
      {
        name: 'Full Body Strength',
        description: 'A comprehensive strength training workout targeting all muscle groups',
        exercises: ['Squats', 'Bench Press', 'Deadlifts', 'Pull-ups', 'Rows'],
      },
      {
        name: 'Morning Cardio',
        description: 'High-intensity cardio session for fat burning',
        exercises: ['Warm-up jog', 'Sprint intervals', 'Cool-down walk'],
      },
      {
        name: 'Yoga for Flexibility',
        description: 'Gentle yoga session focused on flexibility and mindfulness',
        exercises: ['Sun salutations', 'Downward dog', 'Warrior poses', 'Stretching'],
      },
      {
        name: 'Core & Abs',
        description: 'Targeted core strengthening exercises',
        exercises: ['Planks', 'Crunches', 'Russian twists', 'Mountain climbers'],
      },
      {
        name: 'Cycling Adventure',
        description: 'Outdoor cycling route for endurance building',
        exercises: ['Road cycling'],
      },
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);

    // Create activities
    console.log('📊 Creating activities...');
    const today = new Date();
    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        activity_type: 'Running',
        duration: 45,
        date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[0]._id,
        activity_type: 'Strength Training',
        duration: 60,
        date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        activity_type: 'Running',
        duration: 30,
        date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[2]._id,
        activity_type: 'Cycling',
        duration: 90,
        date: today,
      },
      {
        user: users[3]._id,
        activity_type: 'Yoga',
        duration: 50,
        date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[4]._id,
        activity_type: 'Strength Training',
        duration: 75,
        date: today,
      },
      {
        user: users[1]._id,
        activity_type: 'Swimming',
        duration: 40,
        date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    // Create leaderboard entries
    console.log('🏆 Creating leaderboard entries...');
    const leaderboardEntries = await LeaderboardEntry.insertMany([
      {
        user: users[0]._id,
        score: 2500,
      },
      {
        user: users[4]._id,
        score: 2300,
      },
      {
        user: users[2]._id,
        score: 2100,
      },
      {
        user: users[1]._id,
        score: 1950,
      },
      {
        user: users[3]._id,
        score: 1800,
      },
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

    console.log('\n✨ Database seed completed successfully!');
    console.log('📋 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Teams: ${teams.length}`);
    console.log(`   - Workouts: ${workouts.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Leaderboard Entries: ${leaderboardEntries.length}`);

    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

void seed();
