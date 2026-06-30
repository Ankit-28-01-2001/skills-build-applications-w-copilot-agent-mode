import express from 'express';
import mongoose from 'mongoose';
import { getApiBaseUrl } from './config';
import { Activity, Team, Workout, LeaderboardEntry, User } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());


app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

app.get(['/api/config', '/api/config/'], (_req, res) => {
  res.json({ apiBaseUrl: getApiBaseUrl() });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create team' });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).limit(10);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity' });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create leaderboard entry' });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ title: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts' });
  }
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create workout' });
  }
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit backend running on http://localhost:${port}`);
      console.log(`API base URL: ${getApiBaseUrl()}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
