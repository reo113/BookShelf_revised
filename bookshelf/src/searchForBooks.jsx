
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import db from "./db.json";

const BookSearch = ({ bookCards }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    getUpdatedBookCard(filteredBooks);
  }, [filteredBooks]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const filtered = db.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      
      setFilteredBooks(filtered);
      getUpdatedBookCard(filteredBooks);
    }
  };

  function getUpdatedBookCard(filteredBooks) {
    
    bookCards.forEach((bookCard) => {
      const bookId = bookCard.props.id;
      const elements = document.querySelectorAll(`[id="${bookId}"]`);
      elements.forEach((element) => {
        if (element) {
          const isHighlighted = filteredBooks.some((book) =>
            bookId.toLowerCase().includes(book.title.toLowerCase())
          );
  
          if (isHighlighted) {
            element.classList.add("highlight");
          } else {
            element.classList.remove("highlight");
          }
  
          setTimeout(() => {
            element.classList.remove("highlight");
          }, 5000);
        }
      });
    });
  }

  return (
    <div className="search_container">
      <input
        type="text"
        id="searchbar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books"
      />
      <button id="search_btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

BookSearch.propTypes = {
  bookCards: PropTypes.array,
};
export default BookSearch;