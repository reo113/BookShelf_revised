import { PropTypes } from "prop-types";

export default function Bookcard({ book, onBookClick, id }) {

  return (
    <div className="container">
      <div className="book">
        <button onClick={onBookClick} id={id}>
         <img className="book-image" src={book.image} alt={book.title} />
        </button>
      </div>
    </div>
  );
}

Bookcard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }),
  onBookClick: PropTypes.func,
  id: PropTypes.string,

}