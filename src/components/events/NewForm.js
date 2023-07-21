import React, { useState } from "react";
// Firebase
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const NewForm = (props) => {
  const { show, setShow, getEvents } = props;

  // State variables
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "00:00",
  });

  const { name, date, time } = eventData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = collection(db, "events");
    await addDoc(collectionRef, {
      name: name,
      date: Timestamp.fromDate(new Date(date + " " + time)),
    }).then(() => {
      getEvents();
      setShow(false);
    });
  };

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
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
              name="name"
              value={name}
              onChange={handleChange}
              aria-label="name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="date">Date:</Form.Label>
            <Form.Control
              type="date"
              required
              name="date"
              aria-label="date"
              onChange={handleChange}
              value={date}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="time">Time (optional):</Form.Label>
            <Form.Control
              type="time"
              name="time"
              aria-label="time"
              onChange={handleChange}
              value={time}
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
