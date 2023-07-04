import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";

function ViewDetailsPage() {
  const { id } = useParams(); // Extract the book ID from the URL
  const [note, setNote] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    async function fetchNote() {
      const response = await fetch(`http://localhost:3000/notes/`);
      const allNotes = await response.json();
      setNote(allNotes);
    }

    fetchNote();
  }, []);

  if (!note) {
    return <div>Loading...</div>;
  }

  const matchedNote = note.find((note) => note.bookID === parseInt(id));

  try {
    if (matchedNote.bookID === parseInt(id)) {
      return (
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
          <div>
            <h2>Notes for Book ID: {id}</h2>
            <div key={matchedNote.id}>
              <p>Rating: {matchedNote.rating}</p>
              <p>Favorite Line: {matchedNote.favoriteLine}</p>
              <p>Page: {matchedNote.page}</p>
              <p>Review: {matchedNote.review}</p>
            </div>
            <Link to={`/edit-details/${id}`}>Edit</Link>
          </div>
        </Modal>
      );
    } else {
      return (
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
          <div>No match found. Return to the home page...</div>
        </Modal>
      );
    }
  } catch (error) {
    return (
      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <div>Error. Return to the home page...</div>
      </Modal>
    );
  }
}

export default ViewDetailsPage;
