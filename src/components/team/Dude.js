import React, { useState } from "react";
// Components
import EditForm from "./EditForm";

const Dude = (props) => {
  const { id, name } = props;

  // State variables
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      {showEditForm && (
        <EditForm
          name={name}
          id={id}
          show={showEditForm}
          setShow={setShowEditForm}
        />
      )}
      <div className="team-name">
        <span>{name}</span>
        <i
          className="fas fa-ellipsis-vertical task-edit-icon"
          onClick={() => setShowEditForm(true)}
        ></i>
      </div>
    </>
  );
};

export default Dude;
