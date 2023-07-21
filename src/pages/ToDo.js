import React, { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
// Components
import Todo from "../components/todo/Todo";
import NewForm from "../components/todo/NewForm";

const ToDo = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState([]);
  const [notDone, setNotDone] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );

  const fetchTodo = async () => {
    const todoQuery = query(collection(db, "todo"), orderBy("date", "asc"));
    const data = await getDocs(todoQuery);
    const todo = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setDone(todo.filter((doc) => doc.done));
    setNotDone(
      todo.filter(
        (doc) =>
          (!doc.date && !doc.done) ||
          (doc.date && doc.date.toDate() > startOfDay && !doc.done)
      )
    );
    setOverdue(
      todo.filter(
        (doc) => doc.date && doc.date.toDate() < startOfDay && !doc.done
      )
    );

    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);
    fetchTodo();
    // eslint-disable-next-line
  }, []);

  if (!loaded) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1>To Do List</h1>
          <Button variant="light" style={{ marginRight: "15px" }} disabled>
            Add
          </Button>
        </div>
        <section>Loading...</section>
      </>
    );
  }

  return (
    <>
      {showForm && (
        <NewForm
          show={showForm}
          setShow={setShowForm}
          setNotDone={setNotDone}
        />
      )}
      <div className="d-flex justify-content-between align-items-center">
        <h1>To Do List</h1>
        <Button
          variant="light"
          style={{ marginRight: "15px" }}
          onClick={() => setShowForm(true)}
        >
          Add
        </Button>
      </div>
      <section>
        <h2>To Do</h2>
        {notDone.length ? (
          <>
            {notDone.map((task) => (
              <Todo key={task.id} {...task} todolist fetchTodo={fetchTodo} />
            ))}
          </>
        ) : (
          "😀 There is nothing to do, but there might be overdue tasks!"
        )}
      </section>
      <section>
        <h2>Overdue!</h2>
        {overdue.length ? (
          <>
            {overdue.map((task) => (
              <Todo
                key={task.id}
                {...task}
                todolist
                fetchTodo={fetchTodo}
                overdue
              />
            ))}
          </>
        ) : (
          "😀 There are no overdue tasks!"
        )}
      </section>
      <section>
        <h2>Done</h2>
        {done.length ? (
          <>
            {done.map((task) => (
              <Todo key={task.id} {...task} todolist fetchTodo={fetchTodo} />
            ))}
          </>
        ) : (
          "😟 Nothing has been done so go do some work!"
        )}
      </section>
    </>
  );
};

export default ToDo;
