import React, { useEffect, useState } from "react";
// Firebase
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
// Components
import DailyTask from "./DailyTask";

const DailyTasks = () => {
  // State variables
  const [loaded, setLoaded] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksQuery = query(
        collection(db, "daily-tasks"),
        orderBy("name", "asc")
      );
      const data = await getDocs(tasksQuery);
      const taskList = [];

      data.forEach((doc) => {
        const docData = doc.data();
        const docDate = docData.date.toDate();
        taskList.push({ ...docData, id: doc.id, date: docDate });
      });

      const currentDate = new Date();

      taskList.forEach((task) => {
        const collectionRef = collection(db, "daily-tasks");
        const docDate = task.date;

        // Compare dates
        if (
          currentDate.getDate() !== docDate.getDate() ||
          currentDate.getMonth() !== docDate.getMonth() ||
          currentDate.getFullYear() !== docDate.getFullYear()
        ) {
          // If the dates are not equal, create a reference to the document and update the fields
          const docRef = doc(collectionRef, task.id);
          updateDoc(docRef, { done_by: "", done: false });
          // Update taskList task
          task.done_by = "";
          task.done = false;
        }
      });

      setTasks(taskList);
      setLoaded(true);
    };

    setLoaded(false);
    getTasks();
  }, []);

  if (!loaded) {
    return <section>Loading...</section>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between">
        <h2>Daily Tasks</h2>
        <em className="text-muted">Tap to complete!</em>
      </div>
      {tasks?.map((task) => (
        <DailyTask key={task.id} {...task} />
      ))}
    </section>
  );
};

export default DailyTasks;
