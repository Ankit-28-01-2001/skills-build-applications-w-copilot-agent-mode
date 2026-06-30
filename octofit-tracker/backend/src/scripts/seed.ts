import mongoose from 'mongoose';
import { Activity, Team, Workout, LeaderboardEntry, User } from '../models';

// Seed the octofit_db database with test data
async function seed() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    Activity.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    User.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { username: 'maya', email: 'maya@example.com', role: 'admin' },
    { username: 'liam', email: 'liam@example.com', role: 'member' },
    { username: 'sofia', email: 'sofia@example.com', role: 'member' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Power Pioneers', members: ['maya', 'liam'] },
    { name: 'Momentum Squad', members: ['sofia'] },
  ]);

  const activities = await Activity.insertMany([
    { name: 'Morning Run', duration: 32, date: new Date('2026-06-28') },
    { name: 'Cycling Interval', duration: 45, date: new Date('2026-06-29') },
    { name: 'Strength Session', duration: 60, date: new Date('2026-06-30') },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    { user: users[0].username, score: 980 },
    { user: users[1].username, score: 915 },
    { user: users[2].username, score: 900 },
  ]);

  const workouts = await Workout.insertMany([
    { title: 'Core Blast', difficulty: 'beginner', duration: 20, focus: 'core' },
    { title: 'HIIT Sprint', difficulty: 'intermediate', duration: 30, focus: 'cardio' },
    { title: 'Upper Body Strength', difficulty: 'advanced', duration: 45, focus: 'strength' },
  ]);

  console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, and ${workouts.length} workouts.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
