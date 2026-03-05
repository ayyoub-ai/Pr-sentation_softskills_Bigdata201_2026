import React from 'react';

export default function GameHeader({ studentName, round, totalRounds }) {
    const initials = studentName ? studentName.split(' ').map(n => n[0]).join('').toUpperCase() : '?';

    return (
        <header className="game-header">
            <div className="game-logo">
                <span className="human">Human</span>
                <span className="vs-small">vs</span>
                <span className="ai">AI</span>
            </div>

            <div className="round-info">
                <div className="round-badge">
                    Round <span className="num">{round}/{totalRounds}</span>
                </div>
                <div className="student-badge">
                    <div className="student-avatar">{initials}</div>
                    {studentName}
                </div>
            </div>
        </header>
    );
}
