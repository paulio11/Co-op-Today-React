import React, { useState } from "react";
// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
// Components
import EditForm from "./EditForm";

const Module = (props) => {
  const { name, due, assigned_to, trained, id, staff } = props;

  // State variables
  const [showAssignees, setShowAssignees] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [trainedStaff, setTrainedStaff] = useState(trained);

  // Format date
  const dateObj = due.toDate();
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // Is module completed by all?
  const complete = trainedStaff.length === assigned_to.length;

  const markTrained = async (s) => {
    const docRef = doc(db, "modules", id);
    const updatedTrainedStaff = trainedStaff.includes(s)
      ? trainedStaff.filter((staff) => staff !== s)
      : [...trainedStaff, s];

    setTrainedStaff(updatedTrainedStaff);
    await updateDoc(docRef, { trained: updatedTrainedStaff });
  };

  return (
    <>
      {showEditForm && (
        <EditForm
          show={showEditForm}
          setShow={setShowEditForm}
          staff={staff}
          id={id}
          name={name}
          due={due}
          assigned_to={assigned_to}
          trained={trained}
        />
      )}
      <section>
        <div className="task-container module-container">
          <div style={{ width: "100%" }}>
            <div
              className={`task module ${complete && "complete"}`}
              onClick={() => setShowAssignees(!showAssignees)}
            >
              {name}
              <Badge pill bg={complete ? "success" : "danger"}>
                {formattedDate}
              </Badge>
            </div>
            <ProgressBar
              variant={complete ? "success" : "danger"}
              now={trainedStaff.length}
              max={assigned_to.length}
              className={`trained-progress ${complete && "complete"}`}
            />
          </div>
          <i
            className="fas fa-ellipsis-vertical task-edit-icon"
            onClick={() => setShowEditForm(true)}
          ></i>
        </div>

        {showAssignees && (
          <>
            {assigned_to && (
              <div className="button-row staff-btns">
                {assigned_to.map((s) => (
                  <Button
                    key={s}
                    onClick={() => markTrained(s)}
                    variant={trainedStaff.includes(s) ? "success" : "danger"}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Module;
