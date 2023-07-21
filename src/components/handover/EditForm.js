import React, { useRef, useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
// Firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

const EditForm = (props) => {
  const { from, message, photo, id, setShow, getHandover } = props;
  const photoInput = useRef();

  // State variables
  const [newMessage, setNewMessage] = useState(message);
  const [newPhoto, setNewPhoto] = useState(photo);
  const [showSpinner, setShowSpinner] = useState(false);

  // Firebase variables
  const messagesCollection = collection(db, "messages");
  const documentRef = doc(messagesCollection, id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);

    let photoURL = "";

    if (newPhoto) {
      const file = photoInput.current.files[0] || photo;
      const fileName = `${file.name}_${Date.now()}`;
      const storageRef = ref(storage, `images/${fileName}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    await updateDoc(documentRef, {
      message: newMessage,
      photo: photoURL,
    }).then(() => {
      getHandover();
      setShow(false);
    });
  };

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handlePhoto = (event) => {
    event.preventDefault();
    if (event.target.files.length) {
      URL.revokeObjectURL(newPhoto);
      setNewPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const removePhoto = () => {
    if (photoInput.current) {
      photoInput.current.value = null;
    }
    setNewPhoto(null);
  };

  const handleDelete = async () => {
    await deleteDoc(documentRef).then(() => {
      getHandover();
      setShow(false);
    });
  };

  return (
    <>
      <h2>Handover from {from}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={6}
            name="message"
            placeholder="Write your handover message here."
            aria-label="message"
            value={newMessage}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          {newPhoto && (
            <img src={newPhoto} className="photo" alt="uploaded file" />
          )}
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
          <div>
            <Button onClick={() => photoInput.current.click()}>
              {newPhoto ? "Change" : "Add"} Photo
            </Button>
            {photo && <Button onClick={removePhoto}>Remove Photo</Button>}
          </div>
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
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditForm;
