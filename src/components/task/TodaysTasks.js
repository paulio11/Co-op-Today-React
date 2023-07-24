import React, { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
// Components
import Task from "./Task";
import Todo from "../todo/Todo";
import WeekSummary from "./WeekSummary";

const TodaysTasks = (props) => {
  // State variables
  const [tasks, setTasks] = useState({});
  const [todo, setTodo] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();

    const getTasks = async () => {
      const tasksQuery = query(
        collection(db, "tasks"),
        where("day", "==", currentDay)
      );
      const data = await getDocs(tasksQuery);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );

    const getTodo = async () => {
      const todoQuery = query(
        collection(db, "todo"),
        where("date", ">=", startOfDay),
        where("date", "<=", endOfDay)
      );
      const data = await getDocs(todoQuery);
      setTodo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoaded(true);
    };

    setLoaded(false);
    getTasks();
    getTodo();
  }, []);

  if (!loaded) {
    return <section>Loading...</section>;
  }

  return (
    <section id="today-page-tasks">
      <div className="d-flex justify-content-between">
        <h2>Tasks / To Do</h2>
        <em className="text-muted">Tap to complete!</em>
      </div>
      {todo.length !== 0 && (
        <>
          {todo.map((task) => (
            <Todo key={task.id} {...task} />
          ))}
          <hr />
        </>
      )}
      {tasks?.map((task) => (
        <Task key={task.id} {...task} />
      ))}
      <WeekSummary />
    </section>
  );
};

export default TodaysTasks;
