import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, default: 'beginner' },
  duration: { type: Number, default: 30 },
  focus: { type: String, default: 'general fitness' },
});

const leaderboardSchema = new mongoose.Schema({
  user: { type: String, required: true },
  score: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
});

export const Activity = mongoose.model('Activity', activitySchema);
export const Team = mongoose.model('Team', teamSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const User = mongoose.model('User', userSchema);
