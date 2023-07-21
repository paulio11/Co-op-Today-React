import React, { useState } from "react";
// Firebase
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditForm = (props) => {
  const { show, setShow, id } = props;

  // State variables
  const [taskData, setTaskData] = useState({
    name: props.name,
    day: props.day,
  });

  const { name, day } = taskData;

  // Firebase variables
  const tasksCollection = collection(db, "tasks");
  const documentRef = doc(tasksCollection, id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(documentRef, {
      name: name,
      day: parseInt(day),
    }).then(() => window.location.reload());
  };

  const handleDelete = async () => {
    await deleteDoc(documentRef).then(() => window.location.reload());
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
              value={name}
              onChange={handleChange}
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
