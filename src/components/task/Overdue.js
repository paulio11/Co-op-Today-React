import React, { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
// Components
import Task from "./Task";
import Todo from "../todo/Todo";

const Overdue = () => {
  // State variables
  const [tasks, setTasks] = useState({});
  const [todo, setTodo] = useState({});
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();

    const getTasks = async () => {
      const tasksQuery = query(
        collection(db, "tasks"),
        where("day", "<", currentDay),
        where("done", "==", false)
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

    const getTodo = async () => {
      const todoQuery = query(
        collection(db, "todo"),
        where("date", "<", startOfDay),
        where("done", "==", false)
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

  if ((loaded && tasks.length) || todo.length) {
    return (
      <section>
        <div className="d-flex justify-content-between">
          <h2>Overdue!</h2>
          <em className="text-muted">Tap to complete!</em>
        </div>
        {todo.length > 0 &&
          todo.map((task) => (
            <Todo key={task.id} {...task} overdue setTodo={setTodo} todayPage />
          ))}
        {tasks.length > 0 && todo.length > 0 && <hr />}
        {tasks?.map((task) => (
          <Task key={task.id} {...task} setTasks={setTasks} overdue todayPage />
        ))}
      </section>
    );
  }

  return (
    <section>
      <h2>Overdue Tasks</h2>
      <span>😀 There are no overdue tasks!</span>
    </section>
  );
};

export default Overdue;
