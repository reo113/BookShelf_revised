import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, useLoaderData, Link } from "react-router-dom";
import Modal from "./Modal";


export async function loader({ params}) {
    const noteResponse = await fetch(`http://localhost:3000/notes/${params.id}`);
    const note = await noteResponse.json();
    return { note };
  }

function EditDetails(){
    const { note } = useLoaderData();

const { id } = useParams(); // Extract the book ID from the URL
const [notes, setNotes] = useState([note]);
const [isModalVisible, setIsModalVisible] = useState(true);

const handleInputChange = (e) => {
    setNotes((noteState) => ({
    ...noteState,
    [e.target.name]: e.target.value,
  }));
};

const hideModal = () => {
  setIsModalVisible(false);
};


const handleEditNoteFormSubmit = async (e) => {
    e.preventDefault();
    window.location.href = '/';
    };

    return (
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
          <form onSubmit={handleEditNoteFormSubmit} id="editform">
            <h2>Notes for Book ID: {id}</h2>
            <div key={notes[parseInt(id) - 1].id}>
            <fieldset className="fields">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            onChange={handleInputChange}
            className="input_fields"
            placeholder ={String(notes[parseInt(id) - 1].rating)}
          />
        </fieldset>
        <fieldset className="fields">
          <label htmlFor="favoriteLine">Favorite Line:</label>
          <input
            type="text"
            id="favoriteLine"
            name="favoriteLine"
            onChange={handleInputChange}
            className="input_fields"
            placeholder={String(notes[parseInt(id) - 1].favoriteLine)}
          />
        </fieldset>
        <fieldset className="fields">
          <label htmlFor="page">Page:</label>
          <input
            type="number"
            id="page"
            name="page"
            onChange={handleInputChange}
            className="input_fields"
            placeholder={String(notes[parseInt(id) - 1].page)}
          />
        </fieldset>
        <fieldset className="fields">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            onChange={handleInputChange}
            className="input_fields"
            placeholder={String(notes[parseInt(id) - 1].review)}
          ></textarea>
        </fieldset>
        <input
        className="form_sub_btn"
        type="submit"
      ></input>
            </div>
          </form>
        </Modal>
      );
}

export default EditDetails;