import React, { useState, useCallback } from 'react';
import axios from 'axios';
import WelcomePage from './components/WelcomePage';
import GameHeader from './components/GameHeader';
import ProgressBar from './components/ProgressBar';
import SituationView from './components/Situation';
import FinalResults from './components/FinalResults';

const API_BASE = 'http://localhost:5000';

export default function App() {
    const [gameState, setGameState] = useState('welcome'); // welcome | playing | finished
    const [sessionId, setSessionId] = useState(null);
    const [currentSituation, setCurrentSituation] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [round, setRound] = useState(0);
    const [totalRounds] = useState(5);
    const [allResults, setAllResults] = useState([]);

    const startGame = useCallback(async () => {
        try {
            const res = await axios.post(`${API_BASE}/start`, {});
            setSessionId(res.data.sessionId);
            setCurrentSituation(res.data.situation);
            setStudentName(res.data.student);
            setRound(1);
            setGameState('playing');
        } catch (err) {
            console.error('Failed to start game:', err);
        }
    }, []);

    const handleRoundComplete = useCallback(async (roundData) => {
        const newResults = [...allResults, roundData];
        setAllResults(newResults);

        // Save results to backend
        try {
            await axios.post(`${API_BASE}/results`, {
                sessionId,
                roundData
            });
        } catch (err) {
            console.error('Failed to save results:', err);
        }

        // Check if game is finished
        if (newResults.length >= totalRounds) {
            setGameState('finished');
            return;
        }

        // Load next round
        try {
            const res = await axios.post(`${API_BASE}/start`, { sessionId });
            if (res.data.finished) {
                setGameState('finished');
            } else {
                setCurrentSituation(res.data.situation);
                setStudentName(res.data.student);
                setRound(res.data.round);
            }
        } catch (err) {
            console.error('Failed to load next round:', err);
        }
    }, [allResults, sessionId, totalRounds]);

    const resetGame = useCallback(() => {
        setGameState('welcome');
        setSessionId(null);
        setCurrentSituation(null);
        setStudentName('');
        setRound(0);
        setAllResults([]);
    }, []);

    return (
        <div className="app-container">
            {gameState === 'welcome' && (
                <WelcomePage onStart={startGame} />
            )}

            {gameState === 'playing' && currentSituation && (
                <>
                    <GameHeader
                        studentName={studentName}
                        round={round}
                        totalRounds={totalRounds}
                    />
                    <ProgressBar
                        round={round}
                        totalRounds={totalRounds}
                    />
                    <SituationView
                        key={`${sessionId}-${round}`}
                        studentName={studentName}
                        situation={currentSituation}
                        round={round}
                        onComplete={handleRoundComplete}
                    />
                </>
            )}

            {gameState === 'finished' && (
                <FinalResults
                    allResults={allResults}
                    onReplay={resetGame}
                />
            )}
        </div>
    );
}