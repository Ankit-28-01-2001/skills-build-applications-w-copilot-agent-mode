import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const Activity = mongoose.model('Activity', activitySchema);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).limit(10);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

app.post('/api/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity' });
  }
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit backend running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
