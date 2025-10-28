import React, { useEffect, useState } from "react";
// Firebase
import {
  collection,
  getDocs,
  // query,
  // orderBy,
  doc,
  // updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";

const WeekSummary = (props) => {
  const { taskPage } = props;

  // State variables
  const [loaded, setLoaded] = useState(false);
  // const [weekTasks, setWeekTasks] = useState([]);

  useEffect(() => {
    const getWeekTasks = async () => {
      // const tasksQuery = query(
      //   collection(db, "week-tasks"),
      //   orderBy("name", "asc")
      // );
      // const data = await getDocs(tasksQuery);
      // setWeekTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoaded(true);
    };

    setLoaded(false);
    getWeekTasks();
  }, []);

  // const searchDone = (index) => weekTasks[index]?.done;

  // const toggleDone = async (index) => {
  //   const updatedWeekTasks = [...weekTasks];
  //   updatedWeekTasks[index].done = !updatedWeekTasks[index].done;
  //   setWeekTasks(updatedWeekTasks);

  //   const weekTasksCollection = collection(db, "week-tasks");
  //   const documentRef = doc(weekTasksCollection, updatedWeekTasks[index].id);

  //   await updateDoc(documentRef, {
  //     ...updatedWeekTasks[index],
  //     done: updatedWeekTasks[index].done,
  //   });
  // };

  // Get week number
  const weekNumber = (() => {
    const now = new Date();
    const sundayStart = new Date(now.getFullYear(), 0, 0);
    sundayStart.setDate(sundayStart.getDate() - sundayStart.getDay());
    return Math.floor((now - sundayStart) / 604800000);
  })();

  const resetTasks = async () => {
    const taskCollectionRef = collection(db, "tasks");
    const taskDocs = await getDocs(taskCollectionRef);
    const taskBatch = writeBatch(db);
    taskDocs.forEach((taskDoc) => {
      const taskRef = doc(taskCollectionRef, taskDoc.id);
      taskBatch.update(taskRef, { done: false, done_by: "" });
    });
    await taskBatch.commit();

    const weekTasksCollectionRef = collection(db, "week-tasks");
    const weekTaskDocs = await getDocs(weekTasksCollectionRef);
    const weekTaskBatch = writeBatch(db);
    weekTaskDocs.forEach((taskDoc) => {
      const taskRef = doc(weekTasksCollectionRef, taskDoc.id);
      weekTaskBatch.update(taskRef, { done: false });
    });
    await weekTaskBatch.commit();

    window.location.reload();
  };

  if (!loaded) {
    return <>Loading...</>;
  }

  return (
    <>
      {taskPage && (
        <div className="d-flex justify-content-between align-items-center">
          <h2>Week {weekNumber}</h2>
          <Button variant="dark" onClick={resetTasks}>
            Reset Week
          </Button>
        </div>
      )}
      <div>
        {/* <div className="week-detail">
          Weekly Searches:
          <div>
            {[0, 1, 2].map((index) => (
              <i
                key={index}
                className={`fas week-prog ${
                  searchDone(index) ? "fa-check week-prog-done" : "fa-xmark"
                }`}
                onClick={() => toggleDone(index)}
              ></i>
            ))}
          </div>
        </div> */}
        {/* <div>
          Waste parade:
          <i
            className={`fas week-prog ${
              searchDone(3) ? "fa-check week-prog-done" : "fa-xmark"
            }`}
            onClick={() => toggleDone(3)}
          ></i>
        </div> */}
      </div>
    </>
  );
};

export default WeekSummary;
