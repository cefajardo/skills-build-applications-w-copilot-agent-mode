import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const start = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected at ${mongoUri}`);

    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
};

void start();
