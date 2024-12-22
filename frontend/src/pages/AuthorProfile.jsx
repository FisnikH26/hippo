 
import React, { useContext, useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import default_img from "../assets/images/OIG1.jpg";

const AuthorProfile = () => {
  const [author, setAuthor] = useState();
  const [authorBooks, setAuthorBooks] = useState();

  const { name } = useParams();
  const { books, setLoading } = useContext(HippoReadsContext);

  const getAuthor = async () => {
    setLoading(true);

    await fetch(
      `https://65c5cbb5e5b94dfca2e04e3f.mockapi.io/hipporeads/authors?name=${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data[0]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAuthor();
    setAuthorBooks(books.filter((book) => book.author.includes(name)));
  }, [name]);

  return (
    <div className="w-75 py-3 ps-5">
      {author && (
        <>
          <div>
            <div className="d-flex gap-3 align-items-center w-75 ">
              <Image
                src={
                  author.image == null
                    ? default_img
                    : author.image
                }
                width={150}
                height={150}
                className="rounded-circle"
              />
              <div>
                <h2>{author.name}</h2>
                <h6>{authorBooks.length} Book  <i>({author.number_published_books} total books)</i></h6>
              </div>
            </div>
            <div className="mt-3 mb-5">
              {author?.biography?.includes("\n")
                ? author.biography
                    .split("\n")
                    .map((paragraph, i) => <p key={i}>{paragraph}</p>)
                : author.biography}
            </div>
          </div>
          <div>
            <div className="tabs d-flex">
              <div
                role="button"
                className="fw-semibold w-100 text-center border secondary-color-border py-2"
              >
                {author.name}'s books 
              </div>
            </div>
            <div>
              <Row>
                {authorBooks.map((book) => (
                  <Col lg={3} key={book.id}>
                    <BookCard book={book} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorProfile;
