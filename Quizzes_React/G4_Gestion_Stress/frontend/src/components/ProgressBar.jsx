import React from 'react';

const STEPS = ['Source', 'Why 1', 'Why 2', 'Why 3', 'Why 4', 'Why 5', 'Solution'];

export default function ProgressBar({ currentStep = 0 }) {
    return (
        <div className="progress-container">
            <div className="progress-steps">
                {STEPS.map((label, idx) => (
                    <React.Fragment key={idx}>
                        <div className="progress-step">
                            <div
                                className={`step-marker ${idx === currentStep ? 'active' :
                                        idx < currentStep ? 'completed' : ''
                                    }`}
                            >
                                {idx < currentStep ? '✓' : idx + 1}
                                <span className="step-label">{label}</span>
                            </div>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className={`step-connector ${idx < currentStep ? 'completed' : ''}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
