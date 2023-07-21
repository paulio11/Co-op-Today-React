import React, { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
// Components
import Event from "./Event";

const Events = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState({});

  useEffect(() => {
    const currentDate = new Date();
    const startOfCurrentDay = new Date(currentDate.toDateString());
    const endOfCurrentDay = new Date(
      startOfCurrentDay.getTime() + 24 * 60 * 60 * 1000 - 1
    );

    const fetchEvents = async () => {
      const eventsQuery = query(
        collection(db, "events"),
        where("date", ">=", startOfCurrentDay),
        where("date", "<=", endOfCurrentDay)
      );
      const data = await getDocs(eventsQuery);
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoaded(true);
    };

    setLoaded(false);
    fetchEvents();
  }, []);

  if (!loaded) {
    return <section>Loading...</section>;
  }

  if (loaded && events.length) {
    return (
      <section>
        <h2>Today's Schedule</h2>
        {events.map((event) => (
          <Event key={event.id} {...event} />
        ))}
      </section>
    );
  }

  return (
    <section>
      <h2>Today's Schedule</h2>
      <span>😀 There are no events scheduled for today!</span>
    </section>
  );
};

export default Events;
