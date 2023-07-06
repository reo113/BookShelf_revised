import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";




const BookSearch = ({ row1,row2,row3 }) => {
  const [row1s, setRow1] = useState([]);
  const [row2s, setRow2] = useState([]);
  const [row3s, setRow3] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRow1, setFilteredRow1] = useState([]);
  const [filteredRow2, setFilteredRow2] = useState([]);
  const [filteredRow3, setFilteredRow3] = useState([]);
  useEffect(() => {
    async function fetchBooks() {
    const response = await fetch('http://localhost:3000/shelf1');
    const books = await response.json();
    setRow1(books);
    }
 
    fetchBooks();

  }, []);
  useEffect(() => {
    async function fetchBooks() {
    const response = await fetch('http://localhost:3000/shelf2');
    const books = await response.json();
    setRow2(books);
    }
 
    fetchBooks();

  }, []);
  useEffect(() => {
    async function fetchBooks() {
    const response = await fetch('http://localhost:3000/shelf3');
    const books = await response.json();
    setRow3(books);
    }
 
    fetchBooks();

  }, []);
  
  useEffect(() => {
    getUpdatedBookCard(filteredRow1,filteredRow2,filteredRow3);
  }, [filteredRow1,filteredRow2,filteredRow3]);


  const handleSearch = () => {

    if (searchTerm.trim() !== "") {
     
      const filteredR1 = row1s.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      const filteredR2 = row2s.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      const filteredR3 = row3s.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setFilteredRow1(filteredR1);
      setFilteredRow2(filteredR2)
      setFilteredRow3(filteredR3)
      getUpdatedBookCard(filteredR1,filteredR2,filteredR3);
    }
  };

  function getUpdatedBookCard(filteredR1,filteredR2,filteredR3) {

    row1.forEach((bookCard) => {
      const bookId = bookCard.props.id;
      const elements = document.querySelectorAll(`[id="${bookId}"]`);
      elements.forEach((element) => {
        if (element) {
          const isHighlighted = filteredR1.some((book) =>
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
    row2.forEach((bookCard) => {
      const bookId = bookCard.props.id;
      const elements = document.querySelectorAll(`[id="${bookId}"]`);
      elements.forEach((element) => {
        if (element) {
          const isHighlighted = filteredR2.some((book) =>
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
    row3.forEach((bookCard) => {
      const bookId = bookCard.props.id;
      const elements = document.querySelectorAll(`[id="${bookId}"]`);
      elements.forEach((element) => {
        if (element) {
          const isHighlighted = filteredR3.some((book) =>
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
  row1: PropTypes.array, 
  row2: PropTypes.array,
  row3: PropTypes.array,

};
export default BookSearch;
