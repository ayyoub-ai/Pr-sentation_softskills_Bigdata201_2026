import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Question from './Question';
import ProgressBar from './ProgressBar';

const API_BASE = 'http://localhost:5000';

const SITUATION_ICONS = ['⚡', '🔥', '💀', '🌪️', '⚠️'];

export default function Situation({ studentName, situation, round, onComplete }) {
    // Steps: 0=Source, 1-5=Why1-5, 6=Solution, 7=Review
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [humanChoices, setHumanChoices] = useState({
        source: null,
        whys: [null, null, null, null, null],
        solution: ''
    });

    const [aiChoices, setAiChoices] = useState({
        source: null,
        whys: [null, null, null, null, null],
        solution: ''
    });

    const solutionRef = useRef(null);

    // Build AI context from current state
    const buildAiContext = useCallback(() => {
        const ctx = {};
        if (aiChoices.source) ctx.source = aiChoices.source;
        const filledWhys = aiChoices.whys.filter(w => w !== null);
        if (filledWhys.length > 0) ctx.whys = filledWhys;
        return ctx;
    }, [aiChoices]);

    // Handle QCM selection
    const handleSelect = useCallback(async (choice) => {
        setLoading(true);

        // Determine question label for AI context
        let questionLabel, options;
        if (currentStep === 0) {
            questionLabel = 'Source du stress';
            options = situation.source;
            setHumanChoices(prev => ({ ...prev, source: choice }));
        } else {
            const whyIdx = currentStep - 1;
            questionLabel = `Why ${currentStep} (Pourquoi ${currentStep})`;
            options = situation.whys[whyIdx];
            setHumanChoices(prev => {
                const newWhys = [...prev.whys];
                newWhys[whyIdx] = choice;
                return { ...prev, whys: newWhys };
            });
        }

        try {
            const res = await axios.post(`${API_BASE}/answer`, {
                situationText: situation.text,
                questionLabel,
                options,
                aiContext: buildAiContext()
            });

            if (currentStep === 0) {
                setAiChoices(prev => ({ ...prev, source: res.data.aiChoice }));
            } else {
                const whyIdx = currentStep - 1;
                setAiChoices(prev => {
                    const newWhys = [...prev.whys];
                    newWhys[whyIdx] = res.data.aiChoice;
                    return { ...prev, whys: newWhys };
                });
            }
        } catch (err) {
            console.error('Error getting AI answer:', err);
            // Set a fallback
            const fallback = options[Math.floor(Math.random() * options.length)];
            if (currentStep === 0) {
                setAiChoices(prev => ({ ...prev, source: fallback }));
            } else {
                const whyIdx = currentStep - 1;
                setAiChoices(prev => {
                    const newWhys = [...prev.whys];
                    newWhys[whyIdx] = fallback;
                    return { ...prev, whys: newWhys };
                });
            }
        }

        setLoading(false);
    }, [currentStep, situation, buildAiContext]);

    // Go to next step
    const goNext = useCallback(() => {
        if (currentStep < 6) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep]);

    // Check if current step has both answers
    const canProceed = () => {
        if (currentStep === 0) return humanChoices.source && aiChoices.source;
        if (currentStep >= 1 && currentStep <= 5) {
            const idx = currentStep - 1;
            return humanChoices.whys[idx] && aiChoices.whys[idx];
        }
        return false;
    };

    // Handle solution submission
    const handleSolutionSubmit = useCallback(async () => {
        const studentSolution = solutionRef.current?.value?.trim();
        if (!studentSolution) return;

        setHumanChoices(prev => ({ ...prev, solution: studentSolution }));
        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE}/solution`, {
                situationText: situation.text,
                aiContext: buildAiContext(),
                studentSolution
            });
            setAiChoices(prev => ({ ...prev, solution: res.data.aiSolution }));
        } catch (err) {
            console.error('Error getting AI solution:', err);
            setAiChoices(prev => ({ ...prev, solution: 'Solution IA indisponible.' }));
        }

        setLoading(false);
        setCurrentStep(7); // review state
    }, [situation, buildAiContext]);

    // Handle finishing this situation
    const handleFinish = useCallback(() => {
        onComplete({
            situationId: situation.id,
            situationTitle: situation.title,
            situationText: situation.text,
            student: studentName,
            humanChoices,
            aiChoices
        });
    }, [situation, studentName, humanChoices, aiChoices, onComplete]);

    // Get current question text and options
    const getCurrentQuestion = () => {
        if (currentStep === 0) {
            return {
                label: 'Source',
                text: situation.questions ? situation.questions[0] : 'Quelle est la source principale du stress dans cette situation?',
                options: situation.source,
                selected: humanChoices.source,
                aiChoice: aiChoices.source
            };
        }
        if (currentStep >= 1 && currentStep <= 5) {
            const idx = currentStep - 1;
            return {
                label: `Why ${currentStep}`,
                text: situation.questions ? situation.questions[currentStep] : `Pourquoi ${currentStep}? — Pourquoi cette cause existe-t-elle?`,
                options: situation.whys[idx],
                selected: humanChoices.whys[idx],
                aiChoice: aiChoices.whys[idx]
            };
        }
        return null;
    };

    const currentQ = getCurrentQuestion();
    const icon = SITUATION_ICONS[(round - 1) % SITUATION_ICONS.length];

    return (
        <div>
            {/* Progress */}
            <ProgressBar currentStep={currentStep} />

            {/* Situation Card */}
            <div className="situation-card">
                <div className="situation-header">
                    <div className="situation-icon">{icon}</div>
                    <div className="situation-meta">
                        <div className="situation-label">Situation {round}/5</div>
                        <h2 className="situation-title">{situation.title}</h2>
                    </div>
                </div>
                <p className="situation-text">{situation.text}</p>
            </div>

            {/* QCM Phase (steps 0-5) */}
            {currentStep <= 5 && currentQ && (
                <>
                    <Question
                        key={currentStep}
                        stepLabel={currentQ.label}
                        questionText={currentQ.text}
                        options={currentQ.options}
                        selected={currentQ.selected}
                        aiChoice={currentQ.aiChoice}
                        onSelect={handleSelect}
                        disabled={loading}
                        loading={loading}
                    />

                    {canProceed() && (
                        <div className="next-section">
                            <button className="btn-next" onClick={goNext} id="btn-next-step">
                                {currentStep < 5 ? `Passer au Why ${currentStep + 1}` : 'Passer à la Solution'}
                                <span>→</span>
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Solution Phase (step 6) */}
            {currentStep === 6 && (
                <div className="solution-phase">
                    <div className="solution-header">
                        <span className="solution-icon">💡</span>
                        <h3 className="question-title">Phase Solution — Proposez votre solution</h3>
                    </div>

                    <div className="solution-grid">
                        <div className="solution-box human">
                            <div className="solution-box-header">
                                👤 Votre Solution
                            </div>
                            <textarea
                                ref={solutionRef}
                                className="solution-textarea"
                                placeholder="Écrivez votre solution pour résoudre cette situation de stress..."
                                id="solution-textarea"
                            />
                        </div>

                        <div className="solution-box ai">
                            <div className="solution-box-header">
                                🤖 Solution IA
                            </div>
                            <div className="ai-solution-text">
                                {loading ? (
                                    <div className="loading-container" style={{ background: 'transparent', border: 'none' }}>
                                        <div className="loading-dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                        L'IA rédige sa solution...
                                    </div>
                                ) : (
                                    <em style={{ color: 'var(--text-muted)' }}>La solution de l'IA apparaîtra après votre soumission</em>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            className="btn-submit-solution"
                            onClick={handleSolutionSubmit}
                            disabled={loading}
                            id="btn-submit-solution"
                        >
                            {loading ? 'Analyse en cours...' : '📤 Soumettre ma solution'}
                        </button>
                    </div>
                </div>
            )}

            {/* Review Phase (step 7) — Show solutions side by side */}
            {currentStep === 7 && (
                <div className="solution-phase">
                    <div className="solution-header">
                        <span className="solution-icon">📊</span>
                        <h3 className="question-title">Comparaison des Solutions</h3>
                    </div>

                    <div className="solution-grid">
                        <div className="solution-box human">
                            <div className="solution-box-header">👤 Votre Solution</div>
                            <div className="ai-solution-text" style={{ borderLeftColor: 'var(--accent-human)' }}>
                                {humanChoices.solution}
                            </div>
                        </div>

                        <div className="solution-box ai">
                            <div className="solution-box-header">🤖 Solution IA</div>
                            <div className="ai-solution-text">
                                {aiChoices.solution}
                            </div>
                        </div>
                    </div>

                    {/* Summary of all answers for this situation */}
                    <div className="comparison-panel" style={{ marginTop: '2rem' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                                📋 Récapitulatif — {situation.title}
                            </h4>
                            <table className="result-table">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>👤 Humain</th>
                                        <th>🤖 IA</th>
                                        <th>Match</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={humanChoices.source === aiChoices.source ? 'cell-match' : 'cell-differ'}>
                                        <td className="question-label">Source</td>
                                        <td className="cell-human">{humanChoices.source}</td>
                                        <td className="cell-ai">{aiChoices.source}</td>
                                        <td>
                                            <span className={`match-dot ${humanChoices.source === aiChoices.source ? 'green' : 'red'}`}></span>
                                            {humanChoices.source === aiChoices.source ? 'Accord' : 'Différent'}
                                        </td>
                                    </tr>
                                    {humanChoices.whys.map((w, i) => (
                                        <tr key={i} className={w === aiChoices.whys[i] ? 'cell-match' : 'cell-differ'}>
                                            <td className="question-label">Why {i + 1}</td>
                                            <td className="cell-human">{w}</td>
                                            <td className="cell-ai">{aiChoices.whys[i]}</td>
                                            <td>
                                                <span className={`match-dot ${w === aiChoices.whys[i] ? 'green' : 'red'}`}></span>
                                                {w === aiChoices.whys[i] ? 'Accord' : 'Différent'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="next-section">
                        <button className="btn-next" onClick={handleFinish} id="btn-next-situation">
                            {round >= 5 ? '📊 Voir les Résultats Finaux' : `Situation Suivante (${round + 1}/5)`}
                            <span>→</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}