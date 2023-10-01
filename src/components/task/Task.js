import React, { useState } from "react";
// Firebase
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
// Bootstrap
import Badge from "react-bootstrap/Badge";
// Components
import EditForm from "./EditForm";

const Task = (props) => {
  const { name, id, setTasks, taskPage, day, overdue, todayPage } = props;

  // State variables
  const [done, setDone] = useState(props.done);
  const [doneBy, setDoneBy] = useState(props.done_by);
  const [showEdit, setShowEdit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Get first name
  const [user] = useAuthState(auth);
  const firstName = user.displayName.split(" ")[0];

  const markDone = async () => {
    setShowSpinner(true);

    const tasksCollection = collection(db, "tasks");
    const documentRef = doc(tasksCollection, id);

    await updateDoc(documentRef, {
      done: !done,
      done_by: firstName,
    }).then(() => {
      setDone(!done);
      setDoneBy(firstName);
      if (todayPage) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
      setShowSpinner(false);
    });
  };

  return (
    <>
      {showEdit && (
        <EditForm
          show={showEdit}
          setShow={setShowEdit}
          name={name}
          day={day}
          id={id}
        />
      )}
      <div
        onClick={markDone}
        className={`task ${done ? "done" : overdue ? "overdue" : ""}`}
      >
        {name}
        <Badge pill bg={`${done ? "success" : overdue ? "danger" : "dark"}`}>
          {showSpinner ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Loading
            </>
          ) : (
            <>
              {done ? (
                <>
                  <i className="fas fa-check"></i> {doneBy}
                </>
              ) : (
                <>
                  <i className="fas fa-xmark"></i> To do
                </>
              )}
            </>
          )}
        </Badge>
      </div>
      {taskPage && (
        <i
          className="fas fa-ellipsis-vertical task-edit-icon"
          onClick={() => setShowEdit(!showEdit)}
        ></i>
      )}
    </>
  );
};

export default Task;
