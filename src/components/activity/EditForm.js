import { Timestamp, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
// Firebase
import { collection, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditForm = (props) => {
  const {
    show,
    setShow,
    who,
    activity,
    notes,
    date,
    complete,
    id,
    setActivities,
  } = props;

  // Firebase variables
  const collectionRef = collection(db, "ns_activity");
  const documentRef = doc(collectionRef, id);

  // Get date
  const dateObj = date.toDate();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // State variables
  const [showOther, setShowOther] = useState(who !== "SM" && who !== "PDM");
  const [completed, setCompleted] = useState(complete);
  const [newData, setNewData] = useState({
    newActivity: activity,
    newWho: who === "SM" ? who : who === "PDM" ? who : "Other",
    whoOther: who !== "SM" && who !== "PDM" ? who : "",
    newNotes: notes,
    newDate: formattedDate,
  });

  const { newActivity, newWho, whoOther, newNotes, newDate } = newData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(documentRef, {
      activity: newActivity,
      date: Timestamp.fromDate(new Date(newDate)),
      who: showOther ? whoOther : newWho,
      notes: newNotes,
      complete: completed,
    }).then(() => {
      setActivities((prevActivities) =>
        prevActivities.map((activity) => {
          return activity.id === id
            ? {
                id: id,
                activity: newActivity,
                date: Timestamp.fromDate(new Date(newDate)),
                who: showOther ? whoOther : newWho,
                notes: newNotes,
                complete: completed,
              }
            : activity;
        })
      );

      setShow(false);
    });
  };

  const handleDelete = async () => {
    await deleteDoc(documentRef).then(() => {
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== id)
      );
      setShow(false);
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "newWho" && event.target.value === "Other") {
      setShowOther(true);
    } else if (
      event.target.name === "newWho" &&
      event.target.value !== "Other"
    ) {
      setShowOther(false);
    }
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal show={show} centered>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              name="newActivity"
              aria-label="activity"
              placeholder="Activity"
              value={newActivity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="who">Who:</Form.Label>
            <Form.Control
              as="select"
              name="newWho"
              aria-label="who"
              onChange={handleChange}
              value={newWho}
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
              name="newDate"
              value={newDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={10}
              name="newNotes"
              aria-label="notes"
              placeholder="Notes"
              value={newNotes}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              label="Done"
              aria-label="complete switch"
              name="completed"
              checked={completed}
              onChange={() => setCompleted(!completed)}
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
