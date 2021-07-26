import React from 'react';
import {
  Modal, Button, Col, Row, Form, InputGroup, FormControl, Container,
} from 'react-bootstrap';

const ReviewBody = ({ submission, handleChange }) => {
  const counter = () => {
    if (submission.body.length < 50) {
      return (
        <Form.Text>
          Minimum required characters left:
          {' '}
          {50 - submission.body.length}
        </Form.Text>
      );
    }
    return (
      <Form.Text className="text-muted">
        Minimum reached
      </Form.Text>
    );
  };

  return (
    <Form.Row>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Review Body*</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="body" value={submission.body} onChange={(event) => handleChange(event)} maxLength={1000} required as="textarea" aria-label="With textarea" placeholder="Why did you like the product or not?" />
      </InputGroup>
      <Form.Row>
        <Col>
          {counter()}
        </Col>
      </Form.Row>
    </Form.Row>
  );
};

export default ReviewBody;
