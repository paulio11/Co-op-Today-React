import React, { useState } from "react";
// Firebase
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
// Bootstrap
import Badge from "react-bootstrap/Badge";
// Components
import EditForm from "./EditForm";

const Todo = (props) => {
  const { id, name, overdue, setTodo, date, todolist, fetchTodo, todayPage } =
    props;

  // State variables
  const [done, setDone] = useState(props.done);
  const [doneBy, setDoneBy] = useState(props.done_by);

  const [showEdit, setShowEdit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  let dateObj;
  let formattedDate = "";

  if (date) {
    dateObj = date.toDate();
    formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  }

  // Get first name
  const [user] = useAuthState(auth);
  const firstName = user.displayName.split(" ")[0];

  const markDone = async () => {
    setShowSpinner(true);

    const todoCollection = collection(db, "todo");
    const documentRef = doc(todoCollection, id);

    await updateDoc(documentRef, {
      done: !done,
      done_by: firstName,
    }).then(() => {
      setDone(!done);
      setDoneBy(firstName);
      if (todayPage) {
        setTodo((prevTodo) => prevTodo.filter((task) => task.id !== id));
      }
      if (todolist) {
        fetchTodo();
      }
      setShowSpinner(false);
    });
  };

  return (
    <>
      {showEdit && (
        <EditForm
          fetchTodo={fetchTodo}
          show={showEdit}
          setShow={setShowEdit}
          name={name}
          date={date}
          id={id}
        />
      )}
      <div className="task-container">
        <div
          className={`task ${done ? "done" : overdue ? "overdue" : ""}`}
          onClick={markDone}
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
                    <i className="fas fa-xmark"></i>{" "}
                    {overdue || todolist
                      ? formattedDate
                        ? formattedDate
                        : "To do"
                      : "To do"}
                  </>
                )}
              </>
            )}
          </Badge>
        </div>
        {todolist && (
          <i
            className="fas fa-ellipsis-vertical task-edit-icon"
            onClick={() => setShowEdit(!showEdit)}
          ></i>
        )}
      </div>
    </>
  );
};

export default Todo;
