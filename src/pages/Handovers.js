import React, { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
// Components
import HandoverItem from "../components/handover/HandoverItem";

const Handovers = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [handovers, setHandovers] = useState([]);

  useEffect(() => {
    const fetchHandovers = async () => {
      const handoversQuery = query(
        collection(db, "messages"),
        orderBy("date", "desc")
      );
      const data = await getDocs(handoversQuery);
      setHandovers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoaded(true);
    };

    setLoaded(false);
    fetchHandovers();
  }, []);

  if (!loaded) {
    return (
      <>
        <h1>Handover Archive</h1>
        <section>Loading...</section>
      </>
    );
  }

  return (
    <>
      <h1>Handover Archive</h1>
      {handovers.map((handover) => (
        <HandoverItem key={handover.id} {...handover} />
      ))}
    </>
  );
};

export default Handovers;
