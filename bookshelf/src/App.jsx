import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookSearch from "./searchForBooks";
import OpenBook from "./openBook";
import AddBook from "./addBook";
import AddBookForm from "./addBookForm";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);


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
  const handleButtonClick = (book) => {
    setIsDisplayOpen(true);
    setSelectedBook(book);
  };

  const handleCloseDisplay = () => {
    setIsDisplayOpen(false);
  };

  const row1Card = row1.map((booksData, i) => {
    return <BookCard book={booksData} key={i} id={booksData.title} onBookClick={()=> handleButtonClick(booksData)}  />;
  });
  const row2Card = row2.map((booksData, i) => {
    return <BookCard book={booksData} key={i} id={booksData.title} onBookClick={()=> handleButtonClick(booksData)}  />;
  });
  const row3Card = row3.map((booksData, i) => {
    return <BookCard book={booksData} key={i} id={booksData.title} onBookClick={()=> handleButtonClick(booksData)}  />;
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onAddbook = (newBook, shelf) => {
    hideModal();
    if(shelf === "shelf1")
    {
      setRow1((prevBooks) => [...prevBooks, newBook]);
    }
    else if(shelf === "shelf2"){
      setRow2((prevBooks) => [...prevBooks, newBook]);
    }
    else if(shelf === "shelf3"){
      setRow3((prevBooks) => [...prevBooks, newBook]);
    }
   
  };

  return (
    <>

      <h1 id="header">BookShelf</h1>
      <AddBook showModal={showModal} />
      <div className="bookshelf">
        <BookSearch row1={row1Card} row2={row2Card} row3={row3Card} />
        <div className="shelf">
          {row1Card}
        </div>
        <div className="stand">-</div>
        <div className="shelf">
        {row2Card}
        </div>
        <div className="stand">-</div>
        <div className="shelf">
        {row3Card}
        </div>
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <AddBookForm onAddBook={onAddbook} />
      </Modal>
        {isDisplayOpen && (
          <OpenBook handleCloseDisplay={handleCloseDisplay} selectedBook={selectedBook} />
        )}
      </div>
    </>
  );
}

export default App;