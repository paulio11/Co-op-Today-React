import React from "react";
// Components
import Handover from "../components/handover/Handover";
import TodaysTasks from "../components/task/TodaysTasks";
import Overdue from "../components/task/Overdue";
import Events from "../components/events/Events";
// import Countdown from "../components/Countdown";
import DailyTasks from "../components/dailytask/DailyTasks";
// Bootstrap
import Accordion from "react-bootstrap/Accordion";

const Today = () => {
  // Format date
  function formatDate(date) {
    const options = { weekday: "long", day: "numeric", month: "short" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  // Get date
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return (
    <>
      <h1>{formattedDate}</h1>
      {/* <Countdown /> */}
      <Handover />
      <Events />
      <div className="daily-task-accordion">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="accordian-header">
                <h2 className="accordion-h2">Daily Tasks</h2>
                <em className="text-muted">Tap to toggle list!</em>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <DailyTasks />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <TodaysTasks />
      <Overdue />
    </>
  );
};

export default Today;
