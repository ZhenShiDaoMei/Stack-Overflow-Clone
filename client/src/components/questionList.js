import React from 'react';
import Question from './questions.js'; // Ensure the path matches the location of your Question component

function QuestionList({ specificQuestions, stackoverflowData, onQuestionClick }) {
    const questions = stackoverflowData;
    console.log({specificQuestions})
    console.log({stackoverflowData})
    console.log({questions})
    if (!questions || questions.length === 0) {
        return (
            <div id="questions-list">
                <p id ="no-question-found">No Questions Found.</p>
            </div>
        );
    }

    return (
        <div id="questions-list">
            {questions && questions.map((question) => (
                <Question
                    key={question._id} // Ensure each question has a unique id
                    question={question}
                    data={stackoverflowData}
                    onQuestionClick={() => onQuestionClick(question._id)}
                />
            ))}
        </div>
    );
}

export default QuestionList;