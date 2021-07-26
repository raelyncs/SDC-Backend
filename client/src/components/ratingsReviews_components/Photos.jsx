import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Photos = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const PhotoModal = () => {
    const { onHide } = props;
    return (
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xl"
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton />
        <img src={url} alt="review" />
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const { url } = props;
  return (
    <div className="reviews-photo-entry">
      <img onClick={() => setModalShow(true)} className="reviews-photo-single" src={url} alt="review" aria-hidden="true" />
      <PhotoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Photos;
