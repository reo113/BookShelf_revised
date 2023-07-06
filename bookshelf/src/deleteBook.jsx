import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

function DeleteBook() {
  const { id, shelfId } = useParams(); // Extract the book ID from the URL
  const [isModalVisible, setIsModalVisible] = useState(true);

console.log(id);
console.log(shelfId);
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    
    try {
      // Check if the book exists
      
      console.log(id);
      const bookResponse = await fetch(`http://localhost:3000/shelf${shelfId}/${id}`);
      if (!bookResponse.ok) {
        console.error("Book not found.");
        return; // Exit the function if the book doesn't exist
      }

      // Check if the note exists
      const noteResponse = await fetch(`http://localhost:3000/notes/${id}`);
      if (!noteResponse.ok) {
        console.error("Note not found.");
        // Delete the book only if the note doesn't exist
        await fetch(`http://localhost:3000/shelf${shelfId}/${id}`, {
          method: "DELETE",
        });
        console.log("Book deleted successfully.");
        return; // Exit the function if the note doesn't exist
      }

      // Delete the note
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
      });
      console.log("Note deleted successfully.");

      // Delete the book
      await fetch(`http://localhost:3000/shelf${shelfId}/${id}`, {
        method: "DELETE",
      });
      console.log("Book deleted successfully.");
    } catch (error) {
      // Handle any error during deletion
      console.error("Error deleting book and note:", error);
    }
   window.location.href = '/';
  };

  return (
    <Modal isVisible={isModalVisible} hideModal={hideModal}>
    <div>
      <p>Are you sure you want to delete?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
    </Modal>
  );
}

DeleteBook.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteBook;