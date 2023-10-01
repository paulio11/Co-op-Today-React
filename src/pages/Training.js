import React, { useEffect, useState } from "react";
// Firebase
import { db } from "../firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
// Bootstrap
import Button from "react-bootstrap/Button";
// Components
import Module from "../components/module/Module";
import NewForm from "../components/module/NewForm";

const Training = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [modules, setModules] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);

  const fetchModules = async () => {
    const modulesQuery = query(
      collection(db, "modules"),
      orderBy("due", "desc")
    );
    const data = await getDocs(modulesQuery);
    setModules(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const fetchStaff = async () => {
      const staffQuery = query(collection(db, "staff"), orderBy("name", "asc"));
      const data = await getDocs(staffQuery);
      setStaff(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoaded(true);
    };

    setLoaded(false);
    fetchModules();
    fetchStaff();
  }, []);

  if (!loaded) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Training</h1>
          <Button variant="light" style={{ marginRight: "15px" }} disabled>
            New Module
          </Button>
        </div>
        <section>Loading...</section>
      </>
    );
  }

  return (
    <>
      {showNewForm && (
        <NewForm show={showNewForm} setShow={setShowNewForm} staff={staff} />
      )}
      <div className="d-flex justify-content-between align-items-center">
        <h1>Training</h1>
        <Button
          variant="light"
          style={{ marginRight: "15px" }}
          onClick={() => {
            setShowNewForm(true);
          }}
        >
          New Module
        </Button>
      </div>
      {!modules.length && (
        <section>There are currently no modules being tracked.</section>
      )}
      {modules.map((m) => (
        <Module key={m.id} {...m} staff={staff} />
      ))}
    </>
  );
};

export default Training;
