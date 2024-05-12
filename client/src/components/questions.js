import React from "react";

function Question({ question, data, onQuestionClick }) {
  console.log({ question });
  console.log({ data });

  // Helper function to format the question's date
  const formatQuestionMetadata = (askDate) => {
    const date = new Date(askDate);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, "0");
    const currentTime = new Date();
    const timeDiff = Math.abs(currentTime - date);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return `asked ${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `asked ${minutes} minutes ago`;
    } else if (hours < 24) {
      return `asked ${hours} hours ago`;
    } else if (currentTime.getFullYear() === date.getFullYear()) {
      return `asked ${month} ${day} at ${hour}:${minute}`;
    } else {
      return `asked ${month} ${day}, ${year} at ${hour}:${minute}`;
    }
  };

  const tagNames = data.data.tags
    ? data.data.tags.map((tagId) => tagId.name)
    : null;

  return (
    <div id="question-section">
      <div id="questions-upperhalf">
        <dl id="question-answers-views">
          <p id="total-answers">
            <span>{question.answers && question.answers.length}</span> answers
          </p>
          <p id="total-views">
            <span>{question.views}</span> views
          </p>
        </dl>
        <div id="questions-title-area" onClick={onQuestionClick}>
          <button
            id="questionsTitle"
            onClick={(e) => e.preventDefault()}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {question.title}
          </button>
        </div>
        <div id="questions-metadata">
          <p id="nameAsked">{question.asked_by}</p>
          <span id="timeAsked">{formatQuestionMetadata(question.askDate)}</span>
        </div>
      </div>
      <div id="tags-buttons-section">
        {tagNames.map((tagName, index) => (
          <button key={index} className="tag-button">
            {tagName || "Unknown Tag"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
