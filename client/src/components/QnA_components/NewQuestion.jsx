import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal, Button, Form, InputGroup,
} from 'react-bootstrap';

const NewQuestion = ({ show, onHide, product }) => {
  const [modalQuestion, setModalQuestion] = useState({
    body: '',
    name: '',
    email: '',
    product_id: 16060,
  });

  const submitQuestion = (e) => {
    const inputQuestion = {
      body: modalQuestion.body,
      name: modalQuestion.name,
      email: modalQuestion.email,
      product_id: modalQuestion.product_id,
    };
    axios.post('/api/qa/questions', inputQuestion)
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setModalQuestion({ ...modalQuestion, [e.target.name]: e.target.value }, console.log(modalQuestion));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Ask Your Question
          <Modal.Title>About [{product.name}]</Modal.Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitQuestion}>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>Your Question*</InputGroup.Text>
              </InputGroup.Prepend>
              {modalQuestion.body.length < 1 ? <Form.Control as="textarea" rows={7} name="body" onChange={(e) => handleChange(e)} maxLength={1000} required isInvalid />
                :
              <Form.Control as="textarea" rows={7} name="body" onChange={(e) => handleChange(e)} maxLength={1000} />}
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>What is your nickname?*</InputGroup.Text>
              </InputGroup.Prepend>
              {modalQuestion.name < 1 ? <Form.Control as="input" placeholder="Example: jack543!" name="name" onChange={(e) => handleChange(e)} maxLength={60} required isInvalid />
                :
              <Form.Control as="input" placeholder="Example: jackson11!" name="name" onChange={(e) => handleChange(e)} maxLength={60} />}
              <Form.Text>For privacy reasons, do not use your full name or email address</Form.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>Your email*</InputGroup.Text>
              </InputGroup.Prepend>
              {modalQuestion.email < 1 ? <Form.Control type="text" placeholder="Why did you like the product or not?" name="email" onChange={(e) => handleChange(e)} maxLength={60} required isInvalid />
                :
              <Form.Control type="text" placeholder="Example: jack@email.com" name="email" onChange={(e) => handleChange(e)} maxLength={60} />}
            </InputGroup>
            <Form.Text>For authentication reasons, you will not be emailed</Form.Text>
          </Form.Group>

          <Form.Group>
            <Button type="submit" className="float-right">Submit</Button>
          </Form.Group>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewQuestion;
