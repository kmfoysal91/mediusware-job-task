import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const DetailsModal = ({ contact }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-info" onClick={handleShow}>
        View Details
      </button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to {contact?.country?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-2">
            Thank you for choosing {contact?.country?.name}
          </h6>
          <p>For more details call to {contact?.phone} this number</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetailsModal;
