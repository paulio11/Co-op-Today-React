import React, { useEffect, useState } from "react";
// Firebase
import {
  collection,
  doc,
  getDocs,
  query,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
// Components
import Task from "../components/task/Task";
import NewForm from "../components/task/NewForm";

const Tasks = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState({});
  const [showNewForm, setShowNewForm] = useState(false);

  const currentDate = new Date();

  const fetchTasks = async () => {
    const tasksQuery = query(collection(db, "tasks"));
    const data = await getDocs(tasksQuery);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);
    fetchTasks();
  }, []);

  function getDayName(day) {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  }

  const resetTasks = async () => {
    const taskCollectionRef = collection(db, "tasks");
    const taskDocs = await getDocs(taskCollectionRef);

    const batch = writeBatch(db);
    taskDocs.forEach((taskDoc) => {
      const taskRef = doc(taskCollectionRef, taskDoc.id);
      batch.update(taskRef, { done: false, done_by: "" });
    });

    await batch.commit();
    window.location.reload();
  };

  if (!loaded) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Tasks</h1>
          <Button variant="light" style={{ marginRight: "15px" }} disabled>
            New Daily Task
          </Button>
        </div>
        <section>Loading...</section>
      </>
    );
  }

  return (
    <>
      <NewForm
        show={showNewForm}
        setShow={setShowNewForm}
        setTasks={setTasks}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h1>Tasks</h1>
        <Button
          variant="light"
          style={{ marginRight: "15px" }}
          onClick={() => setShowNewForm(true)}
        >
          New Daily Task
        </Button>
      </div>
      {Array.from({ length: 7 }, (_, day) => (
        <section key={day}>
          <h2>{getDayName(day)}</h2>
          {tasks.map((task) =>
            task.day === day ? (
              <div key={task.id} className="task-container">
                <Task
                  {...task}
                  taskPage
                  overdue={task.day < currentDate.getDay()}
                />
              </div>
            ) : null
          )}
        </section>
      ))}
      <Button
        variant="dark"
        style={{ marginLeft: "15px" }}
        onClick={resetTasks}
      >
        Reset Daily Tasks
      </Button>
    </>
  );
};

export default Tasks;
