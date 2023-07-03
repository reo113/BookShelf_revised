import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewDetailsPage() {
  const { id } = useParams(); // Extract the book ID from the URL

  const [note, setNote] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      const response = await fetch(`http://localhost:3000/notes`);
      const allNotes = await response.json();
    
      setNote(allNotes);
    
    }

    fetchNote();
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Notes for Book ID: {id}</h2>
        <div key={note.id}>
          <p>Rating: {note.rating}</p>
          <p>Favorite Line: {note.favoriteLine}</p>
          <p>Page: {note.page}</p>
          <p>Review: {note.review}</p>
        </div>
    </div>
  );
}

export default ViewDetailsPage;
