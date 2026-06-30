"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: (0, config_1.getApiBaseUrl)() });
});
app.get(['/api/config', '/api/config/'], (_req, res) => {
    res.json({ apiBaseUrl: (0, config_1.getApiBaseUrl)() });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    try {
        const users = await models_1.User.find().sort({ username: 1 });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create user' });
    }
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    try {
        const teams = await models_1.Team.find().sort({ createdAt: -1 });
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch teams' });
    }
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create team' });
    }
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    try {
        const activities = await models_1.Activity.find().sort({ date: -1 }).limit(10);
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch activities' });
    }
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    try {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create activity' });
    }
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find().sort({ score: -1 }).limit(10);
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch leaderboard' });
    }
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    try {
        const entry = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create leaderboard entry' });
    }
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find().sort({ title: 1 });
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch workouts' });
    }
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    try {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create workout' });
    }
});
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit backend running on http://localhost:${port}`);
        console.log(`API base URL: ${(0, config_1.getApiBaseUrl)()}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
