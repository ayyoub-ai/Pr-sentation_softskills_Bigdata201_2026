import express from 'express';
import gameSessions from '../state.js';

const router = express.Router();

// POST /results - Save round results
router.post('/', (req, res) => {
    const { sessionId, roundData } = req.body;

    if (!sessionId || !gameSessions[sessionId]) {
        return res.status(404).json({ error: 'Session not found' });
    }

    gameSessions[sessionId].results.push(roundData);
    res.json({ status: 'saved', totalSaved: gameSessions[sessionId].results.length });
});

// GET /results/:sessionId - Get all results for a session
router.get('/:sessionId', (req, res) => {
    const session = gameSessions[req.params.sessionId];
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ results: session.results, finished: session.results.length >= 5 });
});

export default router;