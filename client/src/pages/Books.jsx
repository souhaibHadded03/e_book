import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Books.css"; 

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks(books.filter((book) => book.id !== id)); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books-container">
      <h1>eBook Library</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt={book.title} className="book-cover" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-desc">{book.description}</p>
            <span className="book-price">${book.price}</span>
            <div className="book-buttons">
              <button className="delete-button" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update-button">
                <Link to={`/update/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
