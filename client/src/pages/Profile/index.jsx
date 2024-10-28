import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext.jsx";

export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { username, userId } = userData;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/borrowed_books`
        );
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          setErrorMessage("Failed to fetch books.");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setErrorMessage("An error occurred while fetching books.");
      }
    }
    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  const handleReturnBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3000/books/return`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, userId }),
      });

      if (response.ok) {
        setBooks(books.filter((book) => book.id !== bookId));
        alert("Book returned successfully");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Failed to return the book.");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      setErrorMessage("An error occurred while returning the book.");
    }
  };
  return (
    <div className="profile-container">
      <h1> Welcome {username}</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={`${book.id}-${book.borrowed_at}`}>
              {book.title} by {book.author}
              <button onClick={() => handleReturnBook(book.id)}>
                Return Book
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found for this user.</p>
      )}
    </div>
  );
}
