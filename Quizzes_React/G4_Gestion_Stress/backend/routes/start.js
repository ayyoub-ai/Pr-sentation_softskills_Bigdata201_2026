import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { situations, students } from '../data/situations.js';
import gameSessions from '../state.js';

const router = express.Router();

// POST /start - Start a new game or get next situation
router.post('/', (req, res) => {
    const { sessionId } = req.body;

    // New game
    if (!sessionId) {
        const newSessionId = uuidv4();
        const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
        const shuffledSituations = [...situations].sort(() => Math.random() - 0.5).slice(0, 5);

        gameSessions[newSessionId] = {
            students: shuffledStudents,
            situations: shuffledSituations,
            currentRound: 0,
            usedStudentIndices: [],
            results: []
        };

        const session = gameSessions[newSessionId];
        const studentIndex = session.currentRound;
        session.usedStudentIndices.push(studentIndex);

        return res.json({
            sessionId: newSessionId,
            student: session.students[studentIndex],
            situation: session.situations[0],
            round: 1,
            totalRounds: 5,
            allStudents: students
        });
    }

    // Continue existing game - next round
    const session = gameSessions[sessionId];
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    session.currentRound++;
    const round = session.currentRound;

    if (round >= 5) {
        return res.json({ finished: true, results: session.results });
    }

    const studentIndex = round;

    return res.json({
        sessionId,
        student: session.students[studentIndex],
        situation: session.situations[round],
        round: round + 1,
        totalRounds: 5
    });
});

// GET /start/students - Get list of all students
router.get('/students', (req, res) => {
    res.json({ students });
});

export default router;