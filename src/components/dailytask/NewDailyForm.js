import React, { useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// Firebase
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const NewDailyForm = (props) => {
  const { show, setShow, setDailyTasks } = props;

  // State variables
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ref = collection(db, "daily-tasks");
    const docData = {
      name: name,
      done_by: "",
      done: false,
      date: serverTimestamp(),
    };
    const docRef = await addDoc(ref, docData);
    const docSnapshot = await getDoc(docRef);
    const newData = { ...docSnapshot.data(), id: docSnapshot.id };
    setDailyTasks((prevTasks) => [...prevTasks, newData]);
    setShow(false);
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Task name"
              aria-label="task name"
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

export default NewDailyForm;
