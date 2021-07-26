import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Search from './QnA_components/Search';
import QuestionList from './QnA_components/QuestionList';
import NewQuestion from './QnA_components/NewQuestion';
import config from '../../../config';

const AUTH = {
  headers: {
    Authorization: config.TOKEN,
  },
};
const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions';

const QuestionsAnswers = ({ currentItem }) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [search, setSearch] = useState('');
  const [questions, setQuestions] = useState({
    results: [],
    moreQuestions: [],
    product_id: null,
  });

  const handleMoreQuestions = () => {
    setQuestions({
      results: questions.results.concat(questions.moreQuestions.slice(0, 4)),
      moreQuestions: questions.moreQuestions.slice(4),
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterQuestions = questions.results.filter((question) => {
    return question.question_body.toLowerCase().includes(search.toLowerCase())
  });

  useEffect(() => {
    // axios.get(`${URL}/?product_id=${currentItem.id}&count=100`, AUTH)
    axios.get(`localhost:3000/api/qa/questions/1/answers`)
      .then((response) => {
        // console.log(response.data);
        setQuestions({
          results: response.data.results.slice(0, 4),
          moreQuestions: response.data.results.slice(4),
          product_id: response.product_id,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentItem.id]);

  return (
    <Container fluid className="main-container qna-wrapper">
      <h3>Questions & Answers</h3>
      <div className="Search">
        <Search handleChange={handleChange} />
      </div>
      <div className="questionList">
        {filterQuestions.map((question) => (
          <QuestionList
            question={question}
            key={question.question_id}
            product={currentItem}
          />
        ))}
      </div>
      {!questions.moreQuestions.length < 1 ?
        <input type="button" value="More Answered Questions" className="moreQuestions" onClick={handleMoreQuestions} />
        : null }
      <input type="button" value="Add Question +" className="addQuestions" onClick={() => setQuestionModal(true)} />
      <NewQuestion
        show={questionModal}
        onHide={() => setQuestionModal(false)}
        questions={questions.product_id}
        product={currentItem}
      />
    </Container>
  );
};

export default QuestionsAnswers;
