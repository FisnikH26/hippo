import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";

const StackCarousel = () => {
  const { booksRead, booksReading, booksToBeRead, loggedIn } =
    useContext(HippoReadsContext);
  const [currentSlide, setCurrentSlide] = useState(1); 
  const [myShelf, setMyShelf] = useState([]);

  useEffect(() => { 
    setMyShelf({
      read: booksRead.filter((book) => book.userId == loggedIn.id),
      reading: booksReading.filter((book) => book.userId == loggedIn.id),
      wantToRead: booksToBeRead.filter((book) => book.userId == loggedIn.id),
      totalBooksInShelf:
        booksRead.filter((book) => book.userId == loggedIn.id).length +
        booksReading.filter((book) => book.userId == loggedIn.id).length +
        booksToBeRead.filter((book) => book.userId == loggedIn.id).length,
    });
  }, [booksRead, booksReading, booksToBeRead]);

  function nextSlide() {
    let stackCarousel = document.querySelector("#stack-carousel");
    let stackCarouselItems = Array.from(
      document.querySelector("#stack-carousel").children
    );
    let temp = stackCarouselItems[0];
    temp.classList.add("slideLeft");
    setTimeout(() => {
      stackCarouselItems[0].remove();
      stackCarouselItems.shift();
      temp.classList.remove("slideLeft");
      stackCarouselItems.push(temp);

      stackCarousel.appendChild(temp);

      if (currentSlide >= stackCarouselItems.length) {
        setCurrentSlide(1);
      } else {
        setCurrentSlide((prev) => prev + 1);
      }
    }, 600);
  }

  function prevSlide() {
    let stackCarousel = document.querySelector("#stack-carousel");
    let stackCarouselItems = Array.from(
      document.querySelector("#stack-carousel").children
    );
    let temp = stackCarouselItems[stackCarouselItems.length - 1];
    stackCarouselItems[0].classList.add("slideLeft");
    setTimeout(() => {
      stackCarouselItems[stackCarouselItems.length - 1].remove();
      stackCarouselItems.pop();
      stackCarouselItems[0].classList.remove("slideLeft");
      stackCarouselItems.unshift(temp);

      stackCarousel.insertBefore(temp, stackCarousel.children[0]);

      if (currentSlide <= 1) {
        setCurrentSlide(stackCarouselItems.length);
      } else {
        setCurrentSlide((prev) => prev - 1);
      }
    }, 600);
  }
  return (
    <>
      <div id="stack-carousel">
        <div className="stackcarousel-item main-color-text">
          <Row className="h-100">
            <Col>
              <h2 className="text-center clicker-script-regular fw-bold">
                My Shelf
              </h2>
              <ul className="nav flex-column px-5 py-4">
                <li className="d-flex gap-2 align-items-center">
                  <span
                    className="d-block"
                    style={{ width: "10px", height: "10px",background:"#EC6B56" }}
                  ></span>
                  <span>Read ({myShelf.read && myShelf.read.length})</span>
                </li>
                <li className="d-flex gap-2 align-items-center">
                  <span
                    className="d-block"
                    style={{ width: "10px", height: "10px",background:"#FFC154" }}
                  ></span>
                  <span>Reading ({myShelf.reading && myShelf.reading.length})</span>
                </li>
                <li className="d-flex gap-2 align-items-center">
                  <span
                    className="d-block"
                    style={{ width: "10px", height: "10px",background:"#47B39C" }}
                  ></span>
                  <span>Want to Read ({myShelf.wantToRead && myShelf.wantToRead.length})</span>
                </li>
              </ul>
            </Col>
            <Col>
              <div
                id="stat"
                className="d-flex align-items-center justify-content-center h-100"
              >
                {myShelf.read && (
                  <div
                    className={`piChart ${myShelf.totalBooksInShelf == 0 && "main-color-border border"}`}
                    style={{
                      background: `conic-gradient( 
                    #EC6B56 0deg ${
                      (myShelf.read.length / myShelf.totalBooksInShelf) * 360
                    }deg, 
                      #FFC154 ${
                        (myShelf.read.length / myShelf.totalBooksInShelf) *
                          360 +
                        1
                      }deg 
                        ${
                          (myShelf.read.length / myShelf.totalBooksInShelf) *
                            360 +
                          (myShelf.reading.length / myShelf.totalBooksInShelf) *
                            360
                        }deg, 
                        #47B39C ${
                          (myShelf.read.length / myShelf.totalBooksInShelf) *
                            360 +
                          (myShelf.reading.length / myShelf.totalBooksInShelf) *
                            360 +
                          1
                        }deg)`,
                    }}
                  ></div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        {/* <div className="stackcarousel-item d-flex align-items-center justify-content-center fs-2 flex-column main-color-text">
          <q>
            If you don’t like to read, you haven’t found the right book
          </q>
          <p>– J.K. Rowling</p>
        </div>
        <div className="stackcarousel-item d-flex align-items-center justify-content-center fs-2 flex-column main-color-text text-center">
          <q>
            Today a reader, tomorrow a leader.
          </q>
          <p>– Margaret Fuller</p>
        </div> */}
      </div>
      {/* <div className="carousel-controls d-flex  align-items-center justify-content-center mt-3">
        <Button
          variant=""
          onClick={prevSlide}
          className="secondary-color-border secondary-color-text py-0 px-2"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
        <span className="secondary-color-bg main-color-text px-2 fw-semibold rounded mx-2">
          {currentSlide}/3
        </span>
        <Button
          variant=""
          onClick={nextSlide}
          className="secondary-color-border secondary-color-text py-0 px-2"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </Button>
      </div> */}
    </>
  );
};

export default StackCarousel;
