import React, { useState } from "react";
// Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const NewForm = (props) => {
  const { show, setShow, setTasks } = props;

  // State variables
  const [taskData, setTaskData] = useState({
    name: "",
    day: 0,
  });

  const { name, day } = taskData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = collection(db, "tasks");
    const data = await addDoc(collectionRef, {
      name: name,
      day: parseInt(day),
    });
    setTasks((prevTasks) => [
      ...prevTasks,
      { name: name, day: parseInt(day), id: data.id },
    ]);
    setTaskData({
      name: "",
      day: 0,
    });
    setShow(false);
  };

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Task name"
              aria-label="task name"
              onChange={handleChange}
              value={name}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              aria-label="day"
              onChange={handleChange}
              value={day}
              name="day"
              required
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </Form.Control>
          </Form.Group>
          <div className="button-row">
            <div>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Task</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewForm;
