import React, { useState } from "react";
// Bootstrap
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const HandoverItem = (props) => {
  const { date, from, message, photo, read, read_by } = props;

  // State variables
  const [showPhoto, setShowPhoto] = useState(false);

  // Format date
  const dateObj = date.toDate();
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-GB", options);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          {formattedDate} from {from}
        </h2>
        <Badge
          bg={`${read ? "secondary" : "danger"}`}
          pill
          style={{ fontSize: "12px" }}
        >
          {read ? (
            <>
              <i className="fas fa-check"></i> {read_by}
            </>
          ) : (
            <>
              <i className="fas fa-xmark"></i> Unread
            </>
          )}
        </Badge>
      </div>

      <p className="API-TextField">{message}</p>
      {photo && showPhoto && (
        <img src={photo} alt="handover" className="photo" />
      )}
      {photo && (
        <div className="button-row">
          <Button onClick={() => setShowPhoto(!showPhoto)}>
            {showPhoto ? "Hide" : "Show"} Photo
          </Button>
        </div>
      )}
    </section>
  );
};

export default HandoverItem;
