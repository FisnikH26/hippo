import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BookCard = ({ book }) => { 
  
  return (
    <div className="bookCard mt-2">
      <Link to={`/book/${book.id}`}>
        <div className="bookCard_imgContainer rounded-2">
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            className="w-100 h-100"
          />
        </div>
      </Link>
      <div className="bookCard_info pt-2">
        <Link
          to={`/book/${book.id}`}
          className=" text-decoration-none secondary-color-text"
        >
          <h6 className="title mb-0 " title={book.title}>
            {book.title.length > 20 ? book.title.slice(0, 20) + "..." : book.title}
          </h6>
        </Link>
        {/* {book.author.length > 1 ? (
          book.author.map((author, i) => (
            <Link
              to={`/author/${author}`}
              key={i}
              className="main-lighter-text text-decoration-none"
            >
              <small className="author me-1">{author},</small>
            </Link>
          ))
        ) : (
          <Link
            to={`/author/${book.author}`}
            className="main-lighter-text text-decoration-none"
          >
            <small className="author me-1">{book.author}</small>
          </Link>
        )} */}
        <div>
          {/* {book.genre.map((genres, i) => (
            <span
              className="d-blo badge secondary-color-bg main-color-text tag me-2"
              key={genres}
            >
              {genres}
            </span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
