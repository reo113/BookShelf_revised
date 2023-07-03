import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";


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


  useEffect(() => {
    async function fetchNotes() {
    const response = await fetch('http://localhost:3000/notes');
    const notes = await response.json();
    setNotes(notes);
    }
 
    fetchNotes();

  }, []);
 
  const handleInputChange = (e) => {
    setNoteFormState((noteState) => ({
      ...noteState,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };


  const handleAddNoteFormSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      rating: NoteFormState.rating,
      favoriteLine: NoteFormState.favoriteLine,
      page: NoteFormState.page,
      review: NoteFormState.review,
      bookID: id,
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
  
  );
}

export default AddDetailsPage;
