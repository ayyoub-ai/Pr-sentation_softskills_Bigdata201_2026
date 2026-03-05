import React, { useMemo, useState } from 'react';

export default function FinalResults({ allResults, onReplay }) {
    const [expandedSituation, setExpandedSituation] = useState(null);

    // Calculate overall statistics
    const stats = useMemo(() => {
        let totalQuestions = 0;
        let matches = 0;

        allResults.forEach(result => {
            // Source
            totalQuestions++;
            if (result.humanChoices.source === result.aiChoices.source) matches++;

            // Whys
            result.humanChoices.whys.forEach((w, i) => {
                if (w) {
                    totalQuestions++;
                    if (w === result.aiChoices.whys[i]) matches++;
                }
            });
        });

        const differences = totalQuestions - matches;
        const matchRate = totalQuestions > 0 ? Math.round((matches / totalQuestions) * 100) : 0;

        return { totalQuestions, matches, differences, matchRate };
    }, [allResults]);

    // Calculate per-situation match rate
    const getMatchRate = (result) => {
        let total = 0;
        let matches = 0;

        total++;
        if (result.humanChoices.source === result.aiChoices.source) matches++;

        result.humanChoices.whys.forEach((w, i) => {
            if (w) {
                total++;
                if (w === result.aiChoices.whys[i]) matches++;
            }
        });

        return Math.round((matches / total) * 100);
    };

    const toggleExpand = (idx) => {
        setExpandedSituation(expandedSituation === idx ? null : idx);
    };

    return (
        <div className="results-page">
            {/* Header */}
            <div className="results-header">
                <h1 className="results-title">
                    <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Résultats Finaux
                    </span>
                </h1>
                <p className="results-subtitle">
                    Comparaison complète Human vs AI — {allResults.length} situations analysées
                </p>
            </div>

            {/* Score Summary */}
            <div className="score-summary">
                <div className="score-card">
                    <div className="score-value">{stats.matches}</div>
                    <div className="score-label">Accords ✓</div>
                </div>
                <div className="score-card">
                    <div className="score-value">{stats.differences}</div>
                    <div className="score-label">Désaccords ✗</div>
                </div>
                <div className="score-card">
                    <div className="score-value">{stats.matchRate}%</div>
                    <div className="score-label">Taux de concordance</div>
                </div>
            </div>

            {/* Per-situation results */}
            {allResults.map((result, idx) => {
                const matchRate = getMatchRate(result);
                const isExpanded = expandedSituation === idx;
                const rateClass = matchRate >= 60 ? 'high' : matchRate >= 30 ? 'medium' : 'low';

                return (
                    <div className="result-situation" key={idx}>
                        <div
                            className="result-situation-header"
                            onClick={() => toggleExpand(idx)}
                            id={`result-header-${idx}`}
                        >
                            <div className="result-situation-info">
                                <div className="result-round-num">{idx + 1}</div>
                                <div>
                                    <div className="result-situation-title">{result.situationTitle}</div>
                                    <div className="result-student-name">👤 {result.student}</div>
                                </div>
                            </div>
                            <div className={`result-match-rate ${rateClass}`}>
                                {matchRate}% match
                            </div>
                        </div>

                        {isExpanded && (
                            <div style={{ padding: '0 1.5rem 1.5rem' }}>
                                <table className="result-table">
                                    <thead>
                                        <tr>
                                            <th>Question</th>
                                            <th>👤 Humain</th>
                                            <th>🤖 IA</th>
                                            <th>Résultat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Source */}
                                        <tr className={result.humanChoices.source === result.aiChoices.source ? 'cell-match' : 'cell-differ'}>
                                            <td className="question-label">Source</td>
                                            <td className="cell-human">{result.humanChoices.source}</td>
                                            <td className="cell-ai">{result.aiChoices.source}</td>
                                            <td>
                                                <span className={`match-dot ${result.humanChoices.source === result.aiChoices.source ? 'green' : 'red'}`}></span>
                                                {result.humanChoices.source === result.aiChoices.source ? '✓ Accord' : '✗ Différent'}
                                            </td>
                                        </tr>

                                        {/* Whys */}
                                        {result.humanChoices.whys.map((w, i) => {
                                            if (!w) return null;
                                            const isMatch = w === result.aiChoices.whys[i];
                                            return (
                                                <tr key={i} className={isMatch ? 'cell-match' : 'cell-differ'}>
                                                    <td className="question-label">Why {i + 1}</td>
                                                    <td className="cell-human">{w}</td>
                                                    <td className="cell-ai">{result.aiChoices.whys[i]}</td>
                                                    <td>
                                                        <span className={`match-dot ${isMatch ? 'green' : 'red'}`}></span>
                                                        {isMatch ? '✓ Accord' : '✗ Différent'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {/* Solutions */}
                                <div className="solution-comparison">
                                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                                        💡 Solutions proposées
                                    </h4>
                                    <div className="solution-comparison-grid">
                                        <div className="solution-compare-box human-box">
                                            <div className="solution-compare-title">👤 Solution Humaine</div>
                                            {result.humanChoices.solution || <em style={{ color: 'var(--text-muted)' }}>Pas de solution</em>}
                                        </div>
                                        <div className="solution-compare-box ai-box">
                                            <div className="solution-compare-title">🤖 Solution IA</div>
                                            {result.aiChoices.solution || <em style={{ color: 'var(--text-muted)' }}>Pas de solution</em>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Replay button */}
            <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
                <button className="btn-replay" onClick={onReplay} id="btn-replay">
                    🔄 Relancer le Test
                </button>
            </div>
        </div>
    );
}