/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import AnswerEntry from './AnswerEntry';
import NewAnswer from './NewAnswer';

const QuestionList = ({ question, product }) => {
  const [answers, setAnswers] = useState({
    results: [],
    moreAnswers: [],
  });
  const [qHelpful, setqHelpful] = useState(question.question_helpfulness);
  const [qClick, setqClick] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);
  const [qReported, setqReported] = useState(false);

  const handleMoreAnswers = () => {
    setAnswers({
      results: answers.results.concat(answers.moreAnswers.slice(0, 2)),
      moreAnswers: answers.moreAnswers.slice(2),
    });
  };

  const handleQuestionHelpfulness = (id, help) => {
    const questionHelp = {
      questionHelpfulness: help + 1,
    };
    axios.put(`/api/qa/questions/${question.question_id}/helpful`, questionHelp)
      .catch((err) => console.error(err));
  };

  const handleQuestionReport = (id) => {
    const report = {
      reported: true,
    };
    axios.put(`/api/qa/questions/${question.question_id}/report`, report)
      .catch((err) => console.error(err));
  };

  useEffect(async () => {
    await axios.get(`/api/qa/questions/${question.question_id}/answers`)
      .then((response) => {
        // console.log('answers', response.data);
        setAnswers({
          results: response.data.results.slice(0, 2),
          moreAnswers: response.data.results.slice(2),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div className="question">
        <span className="bolder">Q: {question.question_body}</span>
        <span className="addAnswer addAnswerContainer">Helpful? &nbsp;
          {!qClick ?
            (
              <span>
                <u onClick={() => {
                  handleQuestionHelpfulness(question.question_id, qHelpful);
                  setqHelpful(qHelpful + 1);
                  setqClick(true);
                }}>
                  Yes
                </u>({qHelpful})
              </span>
            ) : (<span><u>Yes</u> ({qHelpful}) </span>)}
          &nbsp;
          <span className="divider" />
          &nbsp;
          {!qReported ? (
            <u onClick={() => {
              handleQuestionReport(question.question_id, qReported);
              setqReported(true);
            }}>
              Report
            </u>
          ) : (
            <span>Reported</span>
          )}
          &nbsp;
          <span className="divider" />
          &nbsp;
          <u onClick={() => setAnswerModal(true)}>Add Answer</u>
          <NewAnswer
            show={answerModal}
            onHide={() => setAnswerModal(false)}
            question={question}
            product={product}
          />
        </span>
      </div>
      <div className="answerListScroll">
        {answers.results.map((answer) => (
          <AnswerEntry
            answer={answer}
            key={answer.answer_id}
          />
        ))}
        {!answers.moreAnswers.length < 1 ?
          (
            <input
              className="moreAnswers"
              type="button"
              value="Load More Answers"
              onClick={handleMoreAnswers}
            />
          ) :
          (null)}
      </div>
      {/* <hr /> */}
    </div>
  );
};

export default QuestionList;
