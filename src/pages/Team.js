import React, { useEffect, useState } from "react";
// Firebase
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
// Bootstrap
import Button from "react-bootstrap/Button";
// Components
import NewForm from "../components/team/NewForm";
import Dude from "../components/team/Dude";

const Team = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [team, setTeam] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      const teamQuery = query(collection(db, "staff"), orderBy("name", "asc"));
      const data = await getDocs(teamQuery);
      setTeam(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoaded(true);
    };

    setLoaded(false);
    fetchTeam();
  }, []);

  if (!loaded) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Team</h1>
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
        <h1>Team</h1>
        <Button
          variant="light"
          style={{ marginRight: "15px" }}
          onClick={() => setShowNewForm(true)}
        >
          Add
        </Button>
      </div>
      <section>
        {team.map((s) => (
          <Dude key={s.id} {...s} />
        ))}
      </section>
    </>
  );
};

export default Team;
