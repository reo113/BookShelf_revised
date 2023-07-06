import { PropTypes } from "prop-types";
import { useState } from "react";
import { Link } from 'react-router-dom';

function OpenBook({handleCloseDisplay, selectedBook}){
  const [animationDone, setAnimationDone] = useState(false);

  const handleAnimationEnd = () => {
    setAnimationDone(true);
  };
    return(
        <div className="display">
        <div className="open_book" onAnimationEnd={handleAnimationEnd} >
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="cover"></span>
          <span className="page"></span>
          <span className="cover turn"></span>
        
        </div>
        {animationDone && (
        <div className="buttons-container">
           <Link to={`/view-details/${selectedBook.id}`} className="view-details-btn">
            View Details
          </Link>
          <Link to={`/add-details/${selectedBook.id}`} className="add-details-btn">
            Add Details
          </Link>
          <Link to={`/delete-book/${selectedBook.id} `} className="delete-book-btn">
            Delete Book
          </Link>
         <a  href={selectedBook.pdf} target="_blank" rel="noopener noreferrer" className="read-book-btn">Read Book</a>
          <button id="close_display_btn" onClick={handleCloseDisplay}>
          Close
        </button>
        </div>
      )}
      
      </div>
    )
}
OpenBook.propTypes = {
    handleCloseDisplay: PropTypes.func,
    selectedBook: PropTypes.object,
    };
export default OpenBook;