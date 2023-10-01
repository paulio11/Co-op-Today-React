import React, { useState } from "react";
// Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const NewForm = (props) => {
  const { show, setShow } = props;

  // State variables
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = collection(db, "staff");
    await addDoc(collectionRef, { name: name }).then(() =>
      window.location.reload()
    );
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Name"
              aria-label="name"
              required
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <div className="button-row">
            <div>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewForm;
