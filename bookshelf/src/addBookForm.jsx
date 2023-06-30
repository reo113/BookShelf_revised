import { useState } from "react";
import { PropTypes } from "prop-types"; 

const initialBookFormState = {
  image: "",
  title: "",
  author: "",
  pdf: "",
};

function AddBookForm({ onAddBook}) {
  
  const [bookFormState, setBookFormState] = useState(initialBookFormState);

  const handleInputChange = (e) => {

    setBookFormState((bookState) => ({
        ...bookState,
        [e.target.name]: e.target.value,

      }));
  
  };

  const handleAddBookFormSubmit = async (e) => {
    e.preventDefault();
  
    const newBook = {
      title: bookFormState.title,
      author: bookFormState.author,
      pdf: bookFormState.pdf,
      image: bookFormState.image,
    };
    const response = await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const savedBook = await response.json();

    console.log(newBook);
    console.log(savedBook);
    onAddBook(savedBook);
    setBookFormState(initialBookFormState);
  };

  return (
    <form
      onSubmit={handleAddBookFormSubmit}
      className="main_form"
    >
      <h1>Add Book</h1>
      <fieldset className="fields">
        <label htmlFor="title">Book Title</label>
        <input
          onChange={handleInputChange}
          value={bookFormState.title}
          type="text"
          name="title"
          id="title"
          className="input_fields"
        />
      </fieldset>
      <fieldset className="fields">
        <label htmlFor="author">Author</label>
        <input
          onChange={handleInputChange}
          value={bookFormState.author}
          type="text"
          name="author"
          id="author"
          className="input_fields"
        />
      </fieldset>
      <fieldset className="fields">
        <label htmlFor="image">Image Cover</label>
        <input
          onChange={handleInputChange}
          value={bookFormState.image}
          type="text"
          name="image"
          id="image"
          className="input_fields"
        />
      </fieldset>
      <fieldset className="fields">
        <label htmlFor="image">PDf/Link</label>
        <input
          onChange={handleInputChange}
          value={bookFormState.pdf}
          type="text"
          name="pdf"
          id="pdf"
          className="input_fields"
        />
      </fieldset>
      {/* <fieldset className="radio">
        <label htmlFor="pdf">Shelf #1</label>
          <input
            onChange={handleInputChange}
            value={bookFormState.pdf}
            type="checkbox"
            name="pdf"
            id="pdf"
            className="input_fields"
          />
          <label htmlFor="pdf">Shelf #2</label>
          <input
            onChange={handleInputChange}
            value={bookFormState.pdf}
            type="checkbox"
            name="pdf"
            id="pdf"
            className="input_fields"
          />
          <label htmlFor="pdf">Shelf #3</label>
          <input
            onChange={handleInputChange}
            value={bookFormState.pdf}
            type="checkbox"
            name="pdf"
            id="pdf"
            className="input_fields"
          />
      </fieldset> */}
      <input
        className="form_sub_btn"
        type="submit"
      ></input>
    </form>
  );
}
AddBookForm.propTypes = {
  onAddBook: PropTypes.func,
  books: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    pdf: PropTypes.string,
  }),
};

    
export default AddBookForm;