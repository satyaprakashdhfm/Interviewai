import React from "react";
import './instruct.css'

const Instructions = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }} className="display-flex justify-start">
      <h2 className="ready justify-start">Mock Interview Instructions</h2>
      <ol style={{ lineHeight: "1.8" }}>
        <li>
          <strong>Log in:</strong> Access the application with your credentials.
        </li>
        <li>
          <strong>Start Interview:</strong> Click the "Start Interview" button to
          proceed.
        </li>
        <li>
          <strong>Microphone Setup:</strong> Allow microphone access and test
          functionality.
        </li>
        <li>
          <strong>Questions Display:</strong> Questions will be presented as
          text and speech.
        </li>
        <li>
          <strong>Answer Submission:</strong> Respond verbally or type your
          answer if needed.
        </li>
        <li>
          <strong>Speech Recognition:</strong> Spoken answers will be converted
          to text automatically.
        </li>
        <li>
          <strong>Evaluation:</strong> Answers are evaluated using cosine
          similarity and BERT score.
        </li>
        <li>
          <strong>Results Overview:</strong> Visit the "Overview" page to see
          questions, answers, scores, and the total score.
        </li>
        <li>
          <strong>Resume Upload (Optional):</strong> Upload your resume without
          authentication.
        </li>
        <li>
          <strong>Feedback:</strong> Review scores and improve based on system
          suggestions.
        </li>
      </ol>
    </div>
  );
};

export default Instructions;
