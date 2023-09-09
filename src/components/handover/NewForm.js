import React, { useRef, useState } from "react";
// Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const NewForm = (props) => {
  const { setShow, user, getHandover } = props;
  const photoInput = useRef();

  // State variables
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePhoto = (event) => {
    event.preventDefault();
    if (event.target.files.length) {
      URL.revokeObjectURL(photo);
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const removePhoto = () => {
    if (photoInput.current) {
      photoInput.current.value = null;
    }
    setPhoto(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);

    let photoURL = "";

    if (photo) {
      const file = photoInput.current.files[0];
      const fileName = `${file.name}_${Date.now()}`;
      const storageRef = ref(storage, `images/${fileName}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    const messagesCollection = collection(db, "messages");

    addDoc(messagesCollection, {
      from: user,
      message: message,
      read: false,
      date: serverTimestamp(),
      photo: photoURL,
    }).then(() => {
      getHandover();
      setShow(false);
    });
  };

  return (
    <>
      <h2 className="capitalized">Handover from {user}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={6}
            name="message"
            placeholder="Write your handover message here."
            aria-label="message"
            value={message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          {photo && <img src={photo} className="photo" alt="uploaded file" />}
          <Form.Control
            aria-label="add photo"
            type="file"
            name="photo"
            accept="images/*"
            style={{ display: "none" }}
            ref={photoInput}
            onChange={handlePhoto}
            capture="camera"
          />
        </Form.Group>
        <div className="button-row">
          <Button onClick={() => photoInput.current.click()}>
            {photo ? "Change" : "Add"} Photo
          </Button>
          {photo && <Button onClick={removePhoto}>Remove Photo</Button>}
        </div>
        <div className="button-row">
          <div>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit" className="save-btn">
              {showSpinner ? (
                <Spinner animation="grow" variant="light" size="sm" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default NewForm;
