import React, { useState } from "react";
// Firebase
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditForm = (props) => {
  const { show, setShow, name, date, getEvents, id } = props;

  // Firebase variables
  const collectionRef = collection(db, "events");
  const documentRef = doc(collectionRef, id);

  // Get formatted date
  const dateObj = date.toDate();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // State variables
  const [newData, setNewData] = useState({
    newName: name,
    newDate: formattedDate,
    newTime: "00:00",
  });

  const { newName, newDate, newTime } = newData;

  const handleChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async () => {
    await deleteDoc(documentRef).then(() => {
      getEvents();
      setShow(false);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(documentRef, {
      name: newName,
      date: Timestamp.fromDate(new Date(newDate + " " + newTime)),
    }).then(() => {
      getEvents();
      setShow(false);
    });
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Event name"
              required
              name="newName"
              value={newName}
              onChange={handleChange}
              aria-label="name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="newDate">Date:</Form.Label>
            <Form.Control
              type="date"
              required
              name="newDate"
              aria-label="date"
              onChange={handleChange}
              value={newDate}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="time">Time (optional):</Form.Label>
            <Form.Control
              type="time"
              name="newTime"
              aria-label="time"
              onChange={handleChange}
              value={newTime}
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
