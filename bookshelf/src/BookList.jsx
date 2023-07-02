import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import BookCard from "./BookCard";

export async function loader() {
    const response = await fetch("http://localhost:3000/books");
    const books = await response.json();
    return { books };
    }
   
export default function BookList() {
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
 const handleButtonClick = () => {
        setIsDisplayOpen(true);
      };
      const handleCloseDisplay = () => {
        setIsDisplayOpen(false);
      };
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const hideModal = () => {
        setIsModalVisible(false);
      };
    const { books } = useLoaderData();

    const bookCards = books.map((booksData, i) => {
        return <BookCard book={booksData} key={i} id={booksData.title} onBookClick={()=> handleButtonClick()}  />;
      });

      return ( <>{bookCards}</>)
        }
