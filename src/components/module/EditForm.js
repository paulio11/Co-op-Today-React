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
  const { show, setShow, staff, id, name, due, assigned_to, trained } = props;

  // Firebase variables
  const collectionRef = collection(db, "modules");
  const documentRef = doc(collectionRef, id);

  // Get formatted date
  const dateObj = due.toDate();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // State variables
  const [newData, setNewData] = useState({
    newName: name,
    newDue: formattedDate,
    newAssignedTo: assigned_to,
    newTrained: trained,
  });

  const { newName, newDue, newAssignedTo, newTrained } = newData;

  const handleDelete = async () => {
    await deleteDoc(documentRef).then(() => {
      window.location.reload();
    });
  };

  const handleChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(documentRef, {
      name: newName,
      due: Timestamp.fromDate(new Date(newDue)),
      assigned_to: newAssignedTo,
      trained: newTrained,
    }).then(() => window.location.reload());
  };

  const handleCheckChange = (event, name) => {
    setNewData({
      ...newData,
      newTrained: event.target.checked
        ? newTrained
        : newTrained.filter((s) => s !== name),
      newAssignedTo: event.target.checked
        ? [...newAssignedTo, name]
        : newAssignedTo.filter((s) => s !== name),
    });
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Module name"
              name="newName"
              required
              aria-label="name"
              onChange={handleChange}
              value={newName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="due">Due Date:</Form.Label>
            <Form.Control
              type="date"
              name="newDue"
              aria-label="due"
              required
              onChange={handleChange}
              value={newDue}
            />
          </Form.Group>
          <Form.Group>
            <p>Assigned to:</p>
            {staff.map((s) => (
              <Form.Check
                aria-label={s.name}
                key={s.id}
                label={s.name}
                inline
                value={s.name}
                checked={newAssignedTo.includes(s.name)}
                onChange={(event) => handleCheckChange(event, s.name)}
              />
            ))}
          </Form.Group>
          <hr />
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
