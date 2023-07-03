import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookSearch from "./searchForBooks";
import OpenBook from "./openBook";
import AddBook from "./addBook";
import AddBookForm from "./addBookForm";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);


  useEffect(() => {
    async function fetchBooks() {
    const response = await fetch('http://localhost:3000/books');
    const books = await response.json();
    setBooks(books);
    }
 
    fetchBooks();

  }, []);

  const handleButtonClick = (book) => {
    setIsDisplayOpen(true);
    setSelectedBook(book);
  };

  const handleCloseDisplay = () => {
    setIsDisplayOpen(false);
  };

  const bookCards = books.map((booksData, i) => {
    return <BookCard book={booksData} key={i} id={booksData.title} onBookClick={()=> handleButtonClick(booksData)}  />;
  });
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onAddbook = (newBook) => {
    hideModal();
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <>

      <h1 id="header">BookShelf</h1>
      <AddBook showModal={showModal} />
      <div className="bookshelf">
        <BookSearch bookCards={bookCards} />
        <div className="shelf">
          {bookCards}
        </div>
        <div className="stand">-</div>
        <div className="shelf">
        {bookCards}
        </div>
        <div className="stand">-</div>
        <div className="shelf">
        {bookCards}
        </div>
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <AddBookForm onAddBook={onAddbook} book={books} />
      </Modal>
        {isDisplayOpen && (
          <OpenBook handleCloseDisplay={handleCloseDisplay} selectedBook={selectedBook} />
        )}
      </div>
    </>
  );
}

export default App;