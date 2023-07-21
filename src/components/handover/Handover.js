import React, { useState, useEffect } from "react";
// Firebase
import {
  collection,
  getDocs,
  query,
  limit,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
// Bootstrap
import Button from "react-bootstrap/Button";
// Components
import NewForm from "./NewForm";
import EditForm from "./EditForm";

const Handover = () => {
  // State variables
  const [loaded, setLoaded] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [handover, setHandover] = useState([
    {
      from: "",
      id: "",
      message: "",
      photo: "",
    },
  ]);

  const { from, id, message, photo } = handover[0];

  // Get name and owner
  const [user] = useAuthState(auth);
  const firstName = user?.displayName.split(" ")[0];
  const owner = firstName === from;

  const getHandover = async () => {
    const messagesQuery = query(
      collection(db, "messages"),
      where("read", "==", false),
      orderBy("date", "desc"),
      limit(1)
    );
    const data = await getDocs(messagesQuery);
    if (data.docs.length) {
      setHandover(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      setHandover([
        {
          from: "",
          id: "",
          message: "",
          photo: "",
        },
      ]);
    }
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);
    getHandover();
  }, []);

  const markRead = () => {
    const docRef = doc(db, "messages", id);
    updateDoc(docRef, { read: true, read_by: firstName }).then(getHandover);
  };

  if (!loaded) {
    return <section>Loading...</section>;
  }

  if (id) {
    return (
      <section>
        {showEditForm ? (
          <EditForm
            setShow={setShowEditForm}
            {...handover[0]}
            getHandover={getHandover}
          />
        ) : (
          <>
            <h2>Handover from {from}</h2>
            <p className="API-TextField">{message}</p>
            {photo && showPhoto && (
              <img src={photo} alt="handover" className="photo" />
            )}
            <div className="button-row">
              <div>
                {photo && (
                  <Button onClick={() => setShowPhoto(!showPhoto)}>
                    {showPhoto ? "Hide" : "Show"} Photo
                  </Button>
                )}
                {owner ? (
                  <Button onClick={() => setShowEditForm(true)}>Edit</Button>
                ) : (
                  <Button onClick={markRead}>Mark Read</Button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    );
  }

  return (
    <section>
      {showNewForm ? (
        <NewForm
          setShow={setShowNewForm}
          user={firstName}
          getHandover={getHandover}
        />
      ) : (
        <>
          <p>There are no undread handover messages.</p>
          <Button onClick={() => setShowNewForm(true)}>New Handover</Button>
        </>
      )}
    </section>
  );
};

export default Handover;
