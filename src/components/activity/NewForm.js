import React, { useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// Firebase
import { db } from "../../firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const NewForm = (props) => {
  const { show, setShow } = props;

  // State variables
  const [showOther, setShowOther] = useState(false);
  const [activityData, setActivityData] = useState({
    activity: "",
    date: "",
    who: "SM",
    whoOther: "",
    notes: "",
  });

  const { activity, date, who, whoOther, notes } = activityData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = collection(db, "ns_activity");
    await addDoc(collectionRef, {
      activity: activity,
      who: whoOther ? whoOther : who,
      date: Timestamp.fromDate(new Date(date)),
      notes: notes,
      complete: false,
    }).then(() => {
      setShow(false);
      window.location.reload();
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "who" && event.target.value === "Other") {
      setShowOther(true);
    } else if (event.target.name === "who" && event.target.value !== "Other") {
      setShowOther(false);
    }
    setActivityData({
      ...activityData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal show={show} centered>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              name="activity"
              aria-label="activity"
              placeholder="Activity"
              value={activity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="who">Who:</Form.Label>
            <Form.Control
              as="select"
              name="who"
              aria-label="who"
              onChange={handleChange}
              value={who}
            >
              <option value="SM">SM</option>
              <option value="PDM">PDM</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          {showOther && (
            <Form.Group>
              <Form.Control
                placeholder="Who?"
                name="whoOther"
                aria-label="who other"
                value={whoOther}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label htmlFor="date">Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={10}
              name="notes"
              aria-label="notes"
              placeholder="Notes"
              value={notes}
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
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewForm;
