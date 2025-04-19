import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript'; // Use import syntax
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/transcript', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.json(transcript);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
