"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.LeaderboardEntry = exports.Workout = exports.Team = exports.Activity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    duration: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    members: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
    duration: { type: Number, default: 30 },
    focus: { type: String, default: 'general fitness' },
});
const leaderboardSchema = new mongoose_1.default.Schema({
    user: { type: String, required: true },
    score: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
});
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
});
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.User = mongoose_1.default.model('User', userSchema);
