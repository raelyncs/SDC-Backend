import React, { useState } from 'react';
import {
  Modal, Button, Col, Row, Form, InputGroup, FormControl, Container,
} from 'react-bootstrap';
import Rating from 'react-rating';
import axios from 'axios';

import DisplayCharNewReview from './DisplayCharNewReview';
import ReviewBody from './ReviewBody';
import AddPhotos from './AddPhotos';

const NewReview = (props) => {
  const {
    show, onHide, name, characteristics, id,
  } = props;
  const [submission, setSubmission] = useState({
    product_id: id,
    rating: 0,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  });
  const [errorSubmit, setErrorSubmit] = useState('');

  const ratingSelectionText = () => {
    const ratingChosen = submission.rating;
    if (ratingChosen === 5) {
      return (
        <span className="overallRating-Stars">
          5 stars - Great
        </span>
      );
    }
    if (ratingChosen === 4) {
      return (
        <span className="overallRating-Stars">
          4 stars - Good
        </span>
      );
    }
    if (ratingChosen === 3) {
      return (
        <span className="overallRating-Stars">
          3 stars - Average
        </span>
      );
    }
    if (ratingChosen === 2) {
      return (
        <span className="overallRating-Stars">
          2 stars - Fair
        </span>
      );
    }
    if (ratingChosen === 1) {
      return (
        <span className="overallRating-Stars">
          1 star - Poor
        </span>
      );
    }
    return null;
  };

  const overallRating = (
    <Form.Group>
      <Form.Row>
        <Form.Label>Overall Rating*</Form.Label>
      </Form.Row>
      <Form.Row>
        <Rating
          onChange={(rate) => setSubmission({
            ...submission,
            rating: rate,
          })}
          initialRating={submission.rating}
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
        />
        <span className="overallRating-Stars">
          {ratingSelectionText()}
        </span>
      </Form.Row>
    </Form.Group>
  );
  const recommendProduct = (
    <Form.Group>
      <Form.Label>Do you recommend this product?*</Form.Label>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            required
            inline
            label="Yes"
            name="group2"
            type={type}
            id={`inline-${type}-Yes`}
            onChange={() => {
              setSubmission({
                ...submission,
                recommend: true,
              });
            }}
          />
          <Form.Check
            required
            inline
            label="No"
            name="group2"
            type={type}
            id={`inline-${type}-No`}
            onChange={() => {
              setSubmission({
                ...submission,
                recommend: false,
              });
            }}
          />
        </div>
      ))}
    </Form.Group>
  );

  const findCharacteristics = () => {
    if (Object.keys(characteristics).length > 0) {
      return (
        Object.entries(characteristics).map((characteristicArr) => (
          <DisplayCharNewReview
            characteristic={characteristicArr[0]}
            characteristicObj={characteristicArr[1]}
            key={characteristicArr[1].id}
            submission={submission}
            setSubmission={setSubmission}
          />
        ))
      );
    }
    return null;
  };

  const handleChange = (eventInput) => {
    setSubmission({ ...submission, [eventInput.target.id]: eventInput.target.value });
  };

  const handleSubmit = (e) => {
    // console.log(submission);
    e.preventDefault();
    const errStatement = 'You must enter the following:';
    if (submission.rating === 0) {
      setErrorSubmit(`${errStatement} Overall Rating`);
      e.stopPropagation();
    }
    if (submission.body.length < 50) {
      setErrorSubmit(`${errStatement} Review Body with minimum 50 characters`);
      e.stopPropagation();
    }
    if (submission.rating > 0 && submission.body.length > 49) {
      setErrorSubmit('');
      onHide();
      axios.post('/api/reviews2/postReview', submission)
        .then(() => {
          setSubmission({
            product_id: id,
            rating: 0,
            summary: '',
            body: '',
            recommend: null,
            name: '',
            email: '',
            photos: [],
            characteristics: {},
          });
          // console.log('success in posting!');
        })
        .catch((err) => {
          console.log('postReview Err', err);
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      name={name}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Write Your Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          About the
          {' '}
          {name}
        </h5>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Row>
            {overallRating}
          </Form.Row>
          <Form.Row>
            {recommendProduct}
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Label>Characteristics*</Form.Label>
              {findCharacteristics()}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Review Summary</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="summary" value={submission.summary} onChange={(event) => handleChange(event)} maxLength={60} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Example: Best purchase ever!" />
            </InputGroup>
          </Form.Row>
          <ReviewBody submission={submission} handleChange={handleChange} />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email*</Form.Label>
              <Form.Control id="email" value={submission.email} onChange={(event) => handleChange(event)} maxLength={60} required type="email" placeholder="Example: jackson11@email.com" />
              <Form.Text className="text-muted">
                For authentication reasons, you will not be emailed
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Nickname*</Form.Label>
              <Form.Control id="name" value={submission.name} onChange={(event) => handleChange(event)} maxLength={60} required type="nickname" placeholder="Example: jackson11!" />
              <Form.Text className="text-muted">
                For privacy reasons, do not use your full name or email address
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <AddPhotos submission={submission} setSubmission={setSubmission} />
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Form.Text className="text-danger">
            {errorSubmit}
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewReview;
