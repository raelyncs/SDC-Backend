import React, { useState } from 'react';
import {
  Modal, Button, Col, Form, Image, InputGroup,
} from 'react-bootstrap';

const AddPhotos = ({ submission, setSubmission }) => {
  const [modalShow, setModalShow] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [photosObj, setPhotosObj] = useState('');
  const [notValidPhoto, setNotValidPhoto] = useState(null);

  const handleSubmit = () => {
    setSubmission({
      ...submission,
      photos: [...submission.photos, photosObj],
    });
    setPhotosObj('');
    setModalShow(false);
    setPhotoCount(photoCount + 1);
  };

  function showUploadedPics() {
    if (submission.photos.length > 0) {
      return (
        <Form.Row>
          {submission.photos.map((photo) => (
            <Image src={photo} key={`uploaded-${photo}`} thumbnail />
          ))}
        </Form.Row>
      );
    }
    return null;
  }

  const PreviewPhotosModal = ({ show, onHide }) => (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Photos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Image src={photosObj} fluid />
          </Form.Row>
          <Form.Row>
            <Button onClick={handleSubmit} variant="secondary" type="button">
              Confirm Upload
            </Button>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
  const handlePhotoVerify = (event) => {
    event.preventDefault();
    if (photosObj.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      setModalShow(true);
      setNotValidPhoto('');
    } else {
      setNotValidPhoto('The image URL is invalid or unable to be uploaded');
    }
  };

  return (
    <Form.Group>
      <Form.Label>
        Upload Photos
        {' '}
        {photoCount}
        /5
      </Form.Label>
      { (photoCount < 5) ? (
        <InputGroup className="uploadPhotos">
          <Form.Group />
          <Form.Control
            type="url"
            placeholder="Enter photo URL"
            value={photosObj}
            onChange={(e) => setPhotosObj(e.target.value)}
          />
          <Button onClick={(e) => { handlePhotoVerify(e); }} variant="secondary" type="submit">Add Photos</Button>
          <Col xs="1" />
          <Form.Text className="text-danger">
            {' '}
            {notValidPhoto}
          </Form.Text>
          <PreviewPhotosModal show={modalShow} onHide={() => setModalShow(false)} />
        </InputGroup>
      ) : null}
      <Form.Row>
        {showUploadedPics()}
      </Form.Row>
    </Form.Group>
  );
};

export default AddPhotos;
