import React, { useEffect, useState } from "react";
import Model from "../model/model.js";
import Header from "./header.js";
import Menu from "./menu.js";
import QuestionsHeader from "./questionsHeader.js";
import QuestionButtonsHeader from "./questionButtonsHeader.js";
import QuestionList from "./questionList.js";
import NewQuestionForm from "./newQuestionForm.js";
import QuestionAnswersPage from "./questionAnswersPage.js";
import TagsPage from "./tagsPage.js";
import axios from "axios";

const stackoverflow_data = new Model();

function FakeStackOverflow() {
  const [questions, setQuestions] = useState(
    stackoverflow_data
      .getAllQstns()
      .sort((a, b) => new Date(b.askDate) - new Date(a.askDate))
  );
  // const [questions, setQuestions] = useState([]);
  const [tempQuestions, setTempQuestions] = useState([...questions]);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [currentViewedQuestionId, setCurrentViewedQuestionId] = useState(null);
  const [activeItem, setActiveItem] = useState("questions-link");
  const [questionClick, setQuestionClick] = useState(true);

  // search bar input reaction
  const handleSearch = async (query) => {
    console.log(query);
    const searchQuestions = await axios.get(
      "http://localhost:8000/questions/all?query=" + query
    );
    console.log({ searchQuestions });
    // setTempQuestions(searchQuestions);
    setQuestions(searchQuestions.data);
    setShowNewQuestionForm(false);
    setCurrentViewedQuestionId(null);
    setActiveItem("questions-link");
  };

  // tag search when pressing tag-name
  const handleTagSearch = (query) => {
    const tagName = query.match(/\[(.*?)\]/)?.[1]?.toLowerCase();

    const filteredQuestions = questions.filter((question) =>
      question.tagIds.some(
        (tagId) =>
          // Assuming tagId is the tag name; adjust if it's actually an ID that needs to be resolved to a name
          stackoverflow_data.getTagNameById(tagId).toLowerCase() === tagName
      )
    );

    setTempQuestions(filteredQuestions);
    setShowNewQuestionForm(false);
    setCurrentViewedQuestionId(null);
    setActiveItem("questions-link");
  };

  // when ask-question button is pressed
  const handleAskQuestion = () => {
    console.log("Ask question button clicked");
    setShowNewQuestionForm(true);
    setCurrentViewedQuestionId(null);
    setActiveItem("questions-link");
  };

  // Sorting for "Newest" button
  const handleSortNewest = () => {
    const sortedQuestions = [...questions].sort(
      (a, b) => new Date(b.askDate) - new Date(a.askDate)
    );
    setTempQuestions(sortedQuestions);
  };

  // Sorting for "Active" button
  const handleSortActive = () => {
    const sortedQuestions = questions.filter(
      (question) => question.answers.length > 0
    );
    sortedQuestions.forEach((question) => {
      const latestAnswerDate = question.answers
        .map(
          (ansId) =>
            stackoverflow_data.data.answers.find(
              (answer) => answer.aid === ansId
            )?.ansDate || new Date(question.askDate)
        )
        .reduce(
          (latest, current) =>
            new Date(current) > new Date(latest) ? current : latest,
          question.askDate
        );
      question.latestActivityDate = latestAnswerDate;
    });

    sortedQuestions.sort(
      (a, b) => new Date(b.latestActivityDate) - new Date(a.latestActivityDate)
    );
    setTempQuestions(sortedQuestions);
  };

  // Sorting for "Unanswered" button
  const handleShowUnanswered = () => {
    const unansweredQuestions = questions.filter(
      (question) => question.answers.length === 0
    );
    console.log({ unansweredQuestions });
    setQuestions(unansweredQuestions);
    setTempQuestions(unansweredQuestions);
  };

  // when submit-button is pressed on question form
  const handleNewQuestionSubmit = async (question) => {
    const tagIdsArray = question.tags.split(/\s+/);
    const tagObjects = tagIdsArray.map((tagName) => {
      return { name: tagName };
    });

    console.log(tagObjects);

    const temp = {
      title: question.title,
      text: question.text,
      tags: tagObjects,
      asked_by: question.username,
    };

    console.log({ temp });

    const addQuestion = await axios.post(
      "http://localhost:8000/questions/new",
      temp
    );

    console.log({ addQuestion });
    window.location.reload();
  };

  // when question-title is clicked, bring to questionAnswerPage
  const handleQuestionClick = (qid) => {
    console.log({ qid });
    setCurrentViewedQuestionId(qid);
  };

  // when the question-link on menu is clicked
  const handleQuestionsLinkClick = () => {
    setActiveItem("questions-link");
    setCurrentViewedQuestionId(null);
    setShowNewQuestionForm(false);
    // const sortedQuestions = [...questions].sort((a, b) => new Date(b.askDate) - new Date(a.askDate));
    // setTempQuestions(sortedQuestions);
    console.log("herere");
  };

  // const fetchAllQuestions = async () => {
  //   const { data } = await axios.get("http://localhost:8000/questions/all");
  //   const temp = [];
  //   console.log({ data });
  //   data.forEach((item) => {
  //     temp.push(item);
  //   });
  //   setQuestions(temp);
  //   return data;
  // };

  // useEffect(() => {
  //   fetchAllQuestions();
  // }, []);

  return (
    <div id="body">
      <div id="header">
        <Header onSearch={handleSearch} />
      </div>
      <div id="main">
        <Menu
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          onQuestionsLinkClick={handleQuestionsLinkClick}
        />
        <div id="questions-area">
          {activeItem === "questions-link" &&
            (currentViewedQuestionId ? (
              <QuestionAnswersPage
                qid={currentViewedQuestionId}
                stackoverflow_data={stackoverflow_data}
                onAskQuestion={handleAskQuestion}
              />
            ) : (
              <>
                {showNewQuestionForm ? (
                  <NewQuestionForm onSubmit={handleNewQuestionSubmit} />
                ) : (
                  <>
                    <QuestionsHeader onAskQuestion={handleAskQuestion} />
                    <QuestionButtonsHeader
                      totalQuestions={questions.length}
                      onSortNewest={handleSortNewest}
                      onSortActive={handleSortActive}
                      onSortUnanswered={handleShowUnanswered}
                    />
                    <QuestionList
                      specificQuestions={tempQuestions}
                      stackoverflowData={stackoverflow_data}
                      onQuestionClick={handleQuestionClick}
                    />
                  </>
                )}
              </>
            ))}
          {activeItem === "tags-link" && (
            <TagsPage
              stackoverflow_data={stackoverflow_data}
              onAskQuestion={handleAskQuestion}
              onTagClick={handleTagSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default FakeStackOverflow;
