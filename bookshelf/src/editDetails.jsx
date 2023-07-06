import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, useLoaderData, Link, redirect } from "react-router-dom";
import Modal from "./Modal";


export async function loader({ params}) {

    const noteResponse = await fetch(`http://localhost:3000/notes/${params.id}`);
    const note = await noteResponse.json();

    return { note };
  }

function EditDetails(){
    const { note } = useLoaderData();
 

const { id } = useParams(); 
// Extract the book ID from the URL
const [notes, setNote] = useState({
  rating: "",
  favoriteLine: "",
  page: "",
  review: ""
});
const [isModalVisible, setIsModalVisible] = useState(true);

const handleInputChange = (e) => {
    setNote((noteState) => ({
    ...noteState,
    [e.target.name]: e.target.value,
    bookID: parseInt(id),
  }));
};

const hideModal = () => {
  setIsModalVisible(false);
};


const handleEditNoteFormSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`http://localhost:3000/notes/${id}`, { 
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(notes)
   
  });

  if (response.ok) {
    console.log("Note successfully updated!");
      window.location.href = "/";
  } else {
    console.log("Failed to update the note.");
  }


};

    return (
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
          <Form method="post" onSubmit={handleEditNoteFormSubmit} id="editform">
            <h2>Notes for Book ID: {id}</h2>
            <div key={note.id}>
            <fieldset className="fields">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            onChange={handleInputChange}
            className="input_fields"
            placeholder ={String(note.rating)}
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
            placeholder={String(note.favoriteLine)}
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
            placeholder={String(note.page)}
          />
        </fieldset>
        <fieldset className="fields">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            onChange={handleInputChange}
            className="input_fields"
            placeholder={String(note.review)}
          ></textarea>
        </fieldset>
        <input
        className="form_sub_btn"
        type="submit"
      ></input>
            </div>
          </Form>
        </Modal>
      );
}

export default EditDetails;