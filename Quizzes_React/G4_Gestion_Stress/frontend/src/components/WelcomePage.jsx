import React from 'react';

export default function WelcomePage({ onStart }) {
    return (
        <div className="welcome-page">
            <div className="welcome-badge">
                <span className="dot"></span>
                Interactive Classroom Game
            </div>

            <h1 className="welcome-title">
                <span className="gradient-text">Human</span>
                <span className="vs">vs</span>
                <span className="ai-text">AI</span>
            </h1>
            <p className="welcome-subtitle">
                Stress Source Challenge — Identifiez les sources de stress en milieu professionnel
                avec la méthode des <strong>5 Pourquoi</strong> et comparez vos réponses avec l'IA en temps réel.
            </p>

            <div className="welcome-features">
                <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <div className="feature-value">5</div>
                    <div className="feature-label">Situations</div>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">👥</div>
                    <div className="feature-value">17</div>
                    <div className="feature-label">Étudiants</div>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🤖</div>
                    <div className="feature-value">GPT-4</div>
                    <div className="feature-label">IA Adversaire</div>
                </div>
            </div>

            <button className="btn-start" onClick={onStart} id="btn-start-game">
                🚀 Lancer le Test
                <span className="arrow">→</span>
            </button>
        </div>
    );
}
