import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";


const initialNoteFormState = {
  rating: "",
  favoriteLine: "",
  page: "",
  review: "",
};

function AddDetailsPage() {

  const { id } = useParams(); // Extract the book ID from the URL
  const [notes, setNotes] = useState([]);
  const [NoteFormState, setNoteFormState] = useState(initialNoteFormState);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleInputChange = (e) => {
    setNoteFormState((noteState) => ({
      ...noteState,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);

  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleAddNoteFormSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      rating: NoteFormState.rating,
      favoriteLine: NoteFormState.favoriteLine,
      page: NoteFormState.page,
      review: NoteFormState.review,
      bookID: parseInt(id),
    };
    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const savedNote = await response.json();
    onAddNote(savedNote);
    setNoteFormState(initialNoteFormState);
    window.location.href = "/";
  };

  return (
     <Modal isVisible={isModalVisible} hideModal={hideModal}>
      <form onSubmit={handleAddNoteFormSubmit} className="main_form">
      <h2>Add Details</h2>
      <fieldset className="fields">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={NoteFormState.rating}
            onChange={handleInputChange}
            className="input_fields"
          />
        </fieldset>
        <fieldset className="fields">
          <label htmlFor="favoriteLine">Favorite Line:</label>
          <input
            type="text"
            id="favoriteLine"
            name="favoriteLine"
            value={NoteFormState.favoriteLine}
            onChange={handleInputChange}
            className="input_fields"
          />
        </fieldset>
        <fieldset className="fields">
          <label htmlFor="page">Page:</label>
          <input
            type="number"
            id="page"
            name="page"
            value={NoteFormState.page}
            onChange={handleInputChange}
            className="input_fields"
          />
        </fieldset>
        <fieldset className="fields">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={NoteFormState.review}
            onChange={handleInputChange}
            className="input_fields"
          ></textarea>
        </fieldset>
        <input
        className="form_sub_btn"
        type="submit"
      ></input>
      </form>
    </Modal>
  
  );
}

export default AddDetailsPage;
