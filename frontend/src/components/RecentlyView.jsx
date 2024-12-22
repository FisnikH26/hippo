import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { Link } from "react-router-dom";

const RecentlyView = () => {
  const { recentlyViewedBooks } = useContext(HippoReadsContext);
 
  
  return (
    <div>
      <h4 className="secondary-color-text">Recently Viewed</h4>
      <div>
        {recentlyViewedBooks.length == 0
          ? <p className="secondary-color-text"> No book viewed</p>
          : recentlyViewedBooks
              .slice(0, 4)
              .reverse()
              .map((book, i) => {
                return (
                  <div className="d-flex gap-2 mt-1 align-items-center" key={book.id}>
                    <Link to={`/book/${book.id}`}>
                      <Image src={book.cover} width="70px" height={100} />
                    </Link>
                    <div>
                      <Link
                        to={`/book/${book.id}`}
                        className="text-decoration-none secondary-color-text"
                      > 
                        <h5 className=" mb-0">
                          {book.title.length > 20
                            ? book.title.slice(0, 20) + "..."
                            : book.title}
                        </h5>
                      </Link>
                      <div className="d-flex gap-2"> 
                            <small>
                              <i>{book.author}</i> 
                            </small>  
                      </div>
                      {book.genre.split(",").map((tag) => (
                        <small
                          key={tag}
                          className="secondary-color-text me-1 pt-1 fw-bold border-bottom secondary-color-border"
                        >
                          {tag}
                        </small>
                        ))}
                    </div>
                  </div>
                );
              })}
      </div>
    </div>
  );
};

export default RecentlyView;
