import React from 'react';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function Question({ questionText, stepLabel, options, selected, aiChoice, onSelect, disabled, loading }) {
    return (
        <div className="question-container">
            <div className="question-header">
                <span className="question-step-badge">{stepLabel}</span>
                <h3 className="question-title">{questionText}</h3>
            </div>

            <div className="options-grid">
                {options.map((opt, idx) => {
                    const isSelected = selected === opt;
                    const isAiSelected = aiChoice === opt;
                    const isBoth = isSelected && isAiSelected;

                    let className = 'option-btn';
                    if (isBoth) className += ' both-selected';
                    else if (isSelected) className += ' selected';
                    else if (isAiSelected) className += ' ai-selected';

                    return (
                        <button
                            key={idx}
                            className={className}
                            onClick={() => onSelect(opt)}
                            disabled={disabled || !!selected}
                            id={`option-${stepLabel}-${idx}`}
                        >
                            <span className="option-letter">{LETTERS[idx]}</span>
                            <div>
                                <span>{opt}</span>
                                {(isSelected || isAiSelected) && (
                                    <div className="option-tags">
                                        {isSelected && <span className={`tag ${isBoth ? 'tag-match' : 'tag-human'}`}>👤 Human</span>}
                                        {isAiSelected && <span className={`tag ${isBoth ? 'tag-match' : 'tag-ai'}`}>🤖 AI</span>}
                                        {isBoth && <span className="tag tag-match">✓ Match!</span>}
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-dots">
                        <span></span><span></span><span></span>
                    </div>
                    L'IA analyse la situation...
                </div>
            )}

            {selected && aiChoice && (
                <div className="comparison-panel">
                    <div className="comparison-side human">
                        <div className="comparison-label">👤 Choix Humain</div>
                        <div className="comparison-choice">{selected}</div>
                    </div>
                    <div className="comparison-vs">
                        <div className="vs-circle">VS</div>
                    </div>
                    <div className="comparison-side ai">
                        <div className="comparison-label">🤖 Choix IA</div>
                        <div className="comparison-choice">{aiChoice}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        {selected === aiChoice ? (
                            <span className="match-indicator match">✓ Accord — Human et AI sont d'accord</span>
                        ) : (
                            <span className="match-indicator differ">✗ Désaccord — Choix différents</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}