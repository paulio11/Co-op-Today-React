import React, { useState } from "react";
// Firebase
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditForm = (props) => {
  const { show, setShow, name, id } = props;

  // Firebase variables
  const collectionRef = collection(db, "staff");
  const documentRef = doc(collectionRef, id);

  // State variables
  const [newName, setNewName] = useState(name);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(documentRef, {
      name: newName,
    }).then(() => window.location.reload());
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleDelete = async () => {
    await deleteDoc(documentRef).then(() => {
      window.location.reload();
    });
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Name"
              required
              value={newName}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="button-row">
            <div>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;
