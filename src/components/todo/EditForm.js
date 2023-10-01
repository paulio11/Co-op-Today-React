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
  const { show, setShow, id, date, name, fetchTodo } = props;

  // Firebase variables
  const collectionRef = collection(db, "todo");
  const documentRef = doc(collectionRef, id);

  let dateObj;
  let formattedDate = "";

  if (date) {
    dateObj = date.toDate();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    formattedDate = `${year}-${month}-${day}`;
  }

  // State variables
  const [newData, setNewData] = useState({
    newName: name,
    newDate: formattedDate,
  });

  const { newName, newDate } = newData;

  const handleChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async () => {
    await deleteDoc(documentRef).then(() => {
      fetchTodo();
      setShow(false);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = {
      name: newName,
      date: "",
    };
    if (newDate) {
      updatedData.date = Timestamp.fromDate(new Date(newDate));
    }
    await updateDoc(documentRef, updatedData).then(() => {
      fetchTodo();
      setShow(false);
    });
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              name="newName"
              aria-label="name"
              placeholder="Task name"
              value={newName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="date">Due date (optional):</Form.Label>
            <Form.Control
              name="newDate"
              aria-label="date"
              type="date"
              value={newDate}
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
