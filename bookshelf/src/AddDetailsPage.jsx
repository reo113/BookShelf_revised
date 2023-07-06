import { useState } from "react";
import { useParams,useLoaderData } from "react-router-dom";
import Modal from "./Modal";


const initialNoteFormState = {
  rating: "",
  favoriteLine: "",
  page: "",
  review: "",
};

export async function loader({ params}) {

  const noteResponse = await fetch(`http://localhost:3000/notes/${params.id}`);
  const note = await noteResponse.json();

  return { note };
}

function AddDetailsPage() {
  const { note } = useLoaderData();
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
    if (note.length > 0) {
  
      // Note exists, perform PATCH request
      const response = await fetch(`http://localhost:3000/notes/${note.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
  
      if (response.ok) {
        console.log("Note successfully updated!",note.id);
        const updatedNote = await response.json();
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.map((note) =>
            note.bookID === note.bookID ? updatedNote : note
          );
          return updatedNotes;
        });
        setNoteFormState(initialNoteFormState);
       window.location.href = "/";
      } else {
        console.log("Failed to update the note.");
      }
    } else {
      // Note does not exist, perform POST request
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
  
      if (response.ok) {
        console.log("Note successfully added!");
        const savedNote = await response.json();
        onAddNote(savedNote);
        setNoteFormState(initialNoteFormState);
        window.location.href = "/";
      } else {
        console.log("Failed to add the note.");
      }
    }
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
