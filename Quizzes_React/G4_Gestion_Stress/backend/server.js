import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import startRoute from './routes/start.js';
import answerRoute from './routes/answer.js';
import solutionRoute from './routes/solution.js';
import resultsRoute from './routes/results.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/start', startRoute);
app.use('/answer', answerRoute);
app.use('/solution', solutionRoute);
app.use('/results', resultsRoute);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Stress Challenge Backend running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/health\n`);
});