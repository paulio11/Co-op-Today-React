import React, { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
// Components
import Activity from "../components/activity/Activity";
import NewForm from "../components/activity/NewForm";
// Bootstrap
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

const NewStore = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);

  const getActivities = async () => {
    const activitiesQuery = query(
      collection(db, "ns_activity"),
      orderBy("date", "asc")
    );
    const data = await getDocs(activitiesQuery);
    setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);
    getActivities();
  }, []);

  // Get days until opening
  const today = new Date();
  const opening = new Date(today.getFullYear(), 8, 15);
  const timeDiff = opening.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Count completed activities
  const completeCount = activities.filter((a) => a.complete === true).length;

  if (!loaded) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1>New Store</h1>
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
      {showNewForm && <NewForm show={showNewForm} setShow={setShowNewForm} />}
      <div className="d-flex justify-content-between align-items-center">
        <h1>New Store</h1>
        <Button
          variant="light"
          style={{ marginRight: "15px" }}
          onClick={() => setShowNewForm(true)}
        >
          Add
        </Button>
      </div>
      <section className="countdown">
        <p>The new store opens in:</p>
        <p>
          {daysDiff} day{daysDiff > 1 && "s"}!
        </p>
        <ProgressBar
          max={activities.length}
          now={completeCount}
          className="mt-4"
          striped
          variant="warning"
        />
      </section>

      {!activities.length ? (
        <section>There are no activities to display.</section>
      ) : (
        <em className="text-muted notes-instructions">
          Tap to show or hide your notes!
        </em>
      )}
      {activities.map((a) => (
        <Activity
          key={a.id}
          {...a}
          today={today}
          setActivities={setActivities}
        />
      ))}
    </>
  );
};

export default NewStore;
