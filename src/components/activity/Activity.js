import React, { useState } from "react";
// Bootstrap
import Badge from "react-bootstrap/Badge";
// Components
import EditForm from "./EditForm";

const Activity = (props) => {
  const { activity, complete, notes, who, date, today, id, setActivities } =
    props;

  // State variables
  const [showEditForm, setShowEditForm] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Assign date strings
  const dateObj = date.toDate().toString();
  const dateParts = dateObj.split(" ");
  const month = dateParts[1];
  const day = dateParts[2];

  // Overdue?
  const overdue = date.toDate() < today;

  return (
    <>
      {showEditForm && (
        <EditForm
          show={showEditForm}
          setShow={setShowEditForm}
          id={id}
          activity={activity}
          who={who}
          complete={complete}
          notes={notes}
          date={date}
          setActivities={setActivities}
        />
      )}
      <div
        className={`activity ${
          complete ? "activity-complete" : overdue ? "activity-overdue" : ""
        }`}
        onClick={() => setShowNotes(!showNotes)}
      >
        <div className="activity-header">
          <Badge pill bg={complete ? "success" : overdue ? "danger" : "dark"}>
            <i className="fas fa-calendar-days"></i>
            {month} {day}
          </Badge>
          <div className="activity-header">
            <Badge pill bg={complete ? "success" : overdue ? "danger" : "dark"}>
              <i className="fas fa-user"></i>
              {who}
            </Badge>
            <i
              className="fas fa-ellipsis-vertical task-edit-icon"
              onClick={() => setShowEditForm(true)}
            ></i>
          </div>
        </div>
        <div className="activity-name">{activity}</div>
        {showNotes && (
          <>
            {notes && (
              <>
                <hr />
                <p className="API-TextField notes"> {notes}</p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Activity;
