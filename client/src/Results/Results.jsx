import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const { totalScore } = location.state || {}; // Access totalScore from navigation state

    return (
        <div className="results-container">
            <h1 className="text-xl font-bold text-center">Interview Results</h1>
            <p className="text-lg mt-4">Total Score: {totalScore}</p>
        </div>
    );
};

export default Results;
