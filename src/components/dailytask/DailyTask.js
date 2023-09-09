import React, { useState } from "react";
// Bootstrap
import { Badge } from "react-bootstrap";
// Firebase
import { auth, db } from "../../firebase/config";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// Components
import EditDailyForm from "./EditDailyForm";

const DailyTask = (props) => {
  const { name, id, taskPage } = props;

  // State variables
  const [showSpinner, setShowSpinner] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [done_by, setDone_by] = useState(props.done_by);
  const [done, setDone] = useState(props.done);

  // Get first name
  const [user] = useAuthState(auth);
  const firstName = user.displayName.split(" ")[0];

  const markDone = async () => {
    if (!taskPage) {
      setShowSpinner(true);

      const collectionRef = collection(db, "daily-tasks");
      const documentRef = doc(collectionRef, id);

      await updateDoc(documentRef, {
        done_by: firstName,
        done: !done,
        date: serverTimestamp(),
      }).then(() => {
        setDone(!done);
        setDone_by(firstName);
        setShowSpinner(false);
      });
    }
  };

  return (
    <>
      {showEditForm && (
        <EditDailyForm
          name={name}
          id={id}
          show={showEditForm}
          setShow={setShowEditForm}
        />
      )}
      <div className="task-container">
        <div
          onClick={markDone}
          className={`task ${!taskPage && done ? "done" : ""}`}
        >
          {name}
          {!taskPage && (
            <Badge pill bg={`${done ? "success" : "dark"}`}>
              {showSpinner ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Loading
                </>
              ) : (
                <>
                  {done ? (
                    <>
                      <i className="fas fa-check"></i> {done_by}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-xmark"></i> To do
                    </>
                  )}
                </>
              )}
            </Badge>
          )}
        </div>
        {taskPage && (
          <i
            className="fas fa-ellipsis-vertical task-edit-icon"
            onClick={() => setShowEditForm(true)}
          ></i>
        )}
      </div>
    </>
  );
};

export default DailyTask;
