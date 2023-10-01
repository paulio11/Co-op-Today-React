import React, { useState } from "react";
// Bootstrap
import Badge from "react-bootstrap/Badge";
// Components
import EditForm from "./EditForm";

const Event = ({ name, date, calendar, id, getEvents }) => {
  // State variables
  const [showForm, setShowForm] = useState(false);

  // Get formatted date or "All Day"
  const myDate = date.toDate().toString();
  const dateParts = myDate.split(" ");
  const dayOfWeek = dateParts[0]; // "Tue"
  const dayOfMonth = dateParts[2]; // "18"
  const time = dateParts[4]; // "00:00:00"
  var timeWithoutSecs = time.slice(0, 5); // "00:00"
  if (timeWithoutSecs === "00:00") {
    timeWithoutSecs = "All Day";
  }

  // If used on "/calendar"
  if (calendar) {
    return (
      <>
        {showForm && (
          <EditForm
            show={showForm}
            setShow={setShowForm}
            name={name}
            id={id}
            date={date}
            getEvents={getEvents}
          />
        )}
        <div className="event calendar-event">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginBottom: "12px" }}
          >
            <Badge pill bg="dark">
              {dayOfWeek} {dayOfMonth} - {timeWithoutSecs}
            </Badge>
            <i
              className="fas fa-ellipsis-vertical"
              onClick={() => setShowForm(true)}
            ></i>
          </div>
          {name}
        </div>
      </>
    );
  }

  return (
    <div className="event">
      <Badge pill bg="dark">
        {timeWithoutSecs}
      </Badge>
      {name}
    </div>
  );
};

export default Event;
