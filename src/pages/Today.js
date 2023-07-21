import React from "react";
// Components
import Handover from "../components/handover/Handover";
import TodaysTasks from "../components/task/TodaysTasks";
import Overdue from "../components/task/Overdue";
import Events from "../components/events/Events";

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
      <Handover />
      <Events />
      <TodaysTasks />
      <Overdue />
    </>
  );
};

export default Today;
