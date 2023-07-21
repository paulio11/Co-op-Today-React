import React, { useState } from "react";
// Firebase
import { Timestamp, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const NewForm = (props) => {
  const { show, setShow, setNotDone } = props;

  // State variables
  const [todoData, setTodoData] = useState({
    name: "",
    date: "",
  });

  const { name, date } = todoData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = collection(db, "todo");
    const docData = {
      name: name,
      done: false,
      date: "",
    };
    if (date) {
      docData.date = Timestamp.fromDate(new Date(date));
    }
    const docRef = await addDoc(collectionRef, docData);
    const docSnapshot = await getDoc(docRef);
    const newData = { ...docSnapshot.data(), id: docSnapshot.id };
    setNotDone((prevNotDone) => [...prevNotDone, newData]);
    setShow(false);
  };

  const handleChange = (event) => {
    setTodoData({
      ...todoData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              aria-label="name"
              placeholder="Task name"
              onChange={handleChange}
              value={name}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="date">Due date (optional):</Form.Label>
            <Form.Control
              name="date"
              aria-label="date"
              type="date"
              onChange={handleChange}
              value={date}
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
