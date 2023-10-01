import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const NewForm = (props) => {
  const { show, setShow, staff } = props;
  const navigate = useNavigate();

  // State variables
  const [assignees, setAssignees] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [moduleData, setModuleData] = useState({
    name: "",
    due: "",
  });

  const { name, due } = moduleData;

  const handleCheckChange = (event, name) => {
    if (event.target.checked) {
      setAssignees([...assignees, name]);
    } else {
      setAssignees(assignees.filter((s) => s !== name));
    }
  };

  const handleCheckAll = () => {
    if (!allChecked) {
      const allAssignees = staff.map((s) => s.name);
      setAssignees(allAssignees);
    } else {
      setAssignees([]);
    }
    setAllChecked(!allChecked);
  };

  const handleChange = (event) => {
    setModuleData({
      ...moduleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const modulesCollection = collection(db, "modules");
    addDoc(modulesCollection, {
      name: name,
      due: Timestamp.fromDate(new Date(due)),
      assigned_to: assignees,
      trained: [],
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <Modal centered show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Module name"
              name="name"
              required
              aria-label="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="due">Due Date:</Form.Label>
            <Form.Control
              type="date"
              name="due"
              aria-label="due"
              required
              value={due}
              onChange={handleChange}
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
                checked={assignees.includes(s.name)}
                onChange={(event) => handleCheckChange(event, s.name)}
              />
            ))}
          </Form.Group>
          <Button onClick={handleCheckAll}>
            {allChecked ? "Clear" : "Add All"}
          </Button>
          <hr />
          <div className="button-row">
            <div>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
            <Button onClick={() => navigate("/team")} variant="dark">
              Update Team
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewForm;
