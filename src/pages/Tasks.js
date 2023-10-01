import React, { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
// Components
import Task from "../components/task/Task";
import NewForm from "../components/task/NewForm";
import WeekSummary from "../components/task/WeekSummary";
import DailyTask from "../components/dailytask/DailyTask";
import NewDailyForm from "../components/dailytask/NewDailyForm";

const Tasks = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState({});
  const [dailyTasks, setDailyTasks] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showNewDailyForm, setShowNewDailyForm] = useState(false);

  const currentDate = new Date();

  const fetchTasks = async () => {
    const tasksQuery = query(collection(db, "tasks"), orderBy("name", "asc"));
    const taskData = await getDocs(tasksQuery);
    setTasks(taskData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    const dailyTasksQuery = query(
      collection(db, "daily-tasks"),
      orderBy("name", "asc")
    );
    const dailyData = await getDocs(dailyTasksQuery);
    setDailyTasks(dailyData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

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

  if (!loaded) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Tasks</h1>
          <div
            className="button-row"
            style={{ marginRight: "15px", marginTop: "0" }}
          >
            <Button variant="light" disabled>
              + Weekly
            </Button>
            <Button variant="light" disabled>
              + Daily
            </Button>
          </div>
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
      <NewDailyForm
        show={showNewDailyForm}
        setShow={setShowNewDailyForm}
        setDailyTasks={setDailyTasks}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h1>Tasks</h1>
        <div
          className="button-row"
          style={{ marginRight: "15px", marginTop: "0" }}
        >
          <Button variant="light" onClick={() => setShowNewForm(true)}>
            + Weekly
          </Button>
          <Button variant="light" onClick={() => setShowNewDailyForm(true)}>
            + Daily
          </Button>
        </div>
      </div>
      <section>
        <WeekSummary taskPage />
      </section>
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
      <section>
        <h2>Everyday Tasks</h2>
        {dailyTasks?.map((task) => (
          <DailyTask key={task.id} {...task} taskPage />
        ))}
      </section>
    </>
  );
};

export default Tasks;
