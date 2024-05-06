import React from 'react';

function QuestionButtonsHeader({ totalQuestions, onSortNewest, onSortActive, onSortUnanswered }) {
  const changeTab = () =>{
    window.location.reload()
  }
  return (
    <div id="question-buttons-header">
      <p id="total-questions">{totalQuestions} Questions</p>
      <div id="sorting-buttons">
        {/* <button id="newest-button" onClick={onSortNewest}>Newest</button>
        <button id="active-button" onClick={onSortActive}>Active</button>
        <button id="unanswered-button" onClick={onSortUnanswered}>Unanswered</button> */}
        <button id="newest-button" onClick={changeTab} >Newest</button>
        <button id="active-button" onClick={onSortActive} >Active</button>
        <button id="unanswered-button"  onClick={onSortUnanswered}>Unanswered</button>
      </div>
    </div>
  );
}

export default QuestionButtonsHeader;