import React, { useCallback, useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
// React calendar
import { Calendar as Cal } from "react-calendar";
import "react-calendar/dist/Calendar.css";
// Components
import NewForm from "../components/events/NewForm";
import Event from "../components/events/Event";

const Calendar = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState({});
  const [date, setDate] = useState(new Date());
  const [showNewForm, setShowNewForm] = useState(false);

  const getEvents = useCallback(async () => {
    const startOfCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
    const endOfCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    const eventsQuery = query(
      collection(db, "events"),
      where("date", ">=", startOfCurrentMonth),
      where("date", "<=", endOfCurrentMonth)
    );
    const data = await getDocs(eventsQuery);
    setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoaded(true);
  }, [date]);

  useEffect(() => {
    setLoaded(false);
    getEvents();
  }, [getEvents]);

  const handleActiveStartDateChange = (newDate) => {
    const newMonth = newDate.activeStartDate.getMonth();
    setDate(new Date(newDate.activeStartDate.getFullYear(), newMonth, 1));
  };

  return (
    <>
      {showNewForm && (
        <NewForm
          show={showNewForm}
          setShow={setShowNewForm}
          getEvents={getEvents}
        />
      )}
      <div className="d-flex justify-content-between align-items-center">
        <h1>Calendar</h1>
        <Button
          variant="light"
          style={{ marginRight: "15px" }}
          onClick={() => setShowNewForm(true)}
        >
          New Event
        </Button>
      </div>
      <section>
        <Cal
          value={date}
          minDetail="month"
          onActiveStartDateChange={handleActiveStartDateChange}
          showNeighboringMonth={false}
          calendarType="gregory"
        />
      </section>
      <section>
        {loaded ? (
          events.length ? (
            events.map((event) => (
              <Event key={event.id} {...event} calendar getEvents={getEvents} />
            ))
          ) : (
            <span>😀 There are no events scheduled for this month!</span>
          )
        ) : (
          "Loading..."
        )}
      </section>
    </>
  );
};

export default Calendar;
