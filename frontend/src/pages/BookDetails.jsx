import React, { useContext, useEffect, useState } from "react";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { useParams } from "react-router-dom";
import { todayDate } from "../assets/data/todaydate";
import { formatDate } from "../assets/data/formatDate";
import { v4 as commentId } from "uuid";

import { Button, Col, Image, Row } from "react-bootstrap";
import axios from "axios";

import default_image from "../assets/images/OIG1.jpg"
const BookDetails = () => {
  const { id } = useParams();

  const { 
    setLoading,
    recentlyViewedBooks,
    setRecentlyViewedBooks,
    addBookToShelf,
    loggedIn,
    bookComments,
    setBookComments,
    profile,
  } = useContext(HippoReadsContext);
  const [book, setBook] = useState();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const getBook = async () => {
    setLoading(true);
     

    const res = await axios.get(`http://localhost:8800/book/${id}`)
    if(res.status == 200){
        setBook(res.data[0]);
        setLoading(false);
        setRecentlyViewedBooks([...recentlyViewedBooks, res.data[0]]);
    }  

    
      
  };
  const addComment = () => {
    let userProfile = profile.find((user) => user.userId == loggedIn.id);
      
    
    // let newComment = {
    //   id: commentId(),
    //   book: book.id,
    //   userId: loggedIn.id,
    //   commentText: commentText,
    //   name: loggedIn.name,
    //   profile_image: userProfile.profile_image,
    //   created_at: todayDate(),
    // }; 

    // setBookComments([...bookComments, newComment]);
    function CommentDate() {
    return(`${todayDate()[0].year +"-" +todayDate()[0].month+"-" +todayDate()[0].day} ${todayDate()[1].hour +":" +todayDate()[1].minutes+":" +todayDate()[1].seconds}`);
      
    }
    axios.post(`http://localhost:8800/book/${id}/comments`, {
      id: commentId(),
      text: commentText,
      user_id: loggedIn.id,
      book_id: book.id,
      date: CommentDate(),
    }  )
      .then((res)=>{
        if(res.status == 200){
          console.log(res.data);
        }
      })
      .catch((err)=>{
        console.log("Error adding comment:", err);
      });
    setCommentText("");
    getComment();
  };
  const getComment = async () => {
    const res = await axios.get(`http://localhost:8800/book/${id}/comments`)
    if(res.status == 200){
      setComments(res.data);
    }
  }
  useEffect(() => {
    
    getBook();
    getComment()
  }, [id]);
const deleteComent = (commentId) => {
  axios.delete(`http://localhost:8800/book/${id}/comments/${commentId}`)
    .then((res) => {
      if(res.status == 200){
        console.log("Comment deleted");
        getComment();
      }
    })
    .catch((err) => {
      console.log("Error deleting comment:", err);
    });
}
  // useEffect(() => {
  //   if (book) {
  //     setComments(
  //       bookComments.filter(
  //         (bookComment) =>
  //           bookComment.book === book.id && bookComment.userId === loggedIn.id
  //       )
  //     );
  //   }
  // }, [book, bookComments]);

  return (
    <>
      {book && (
        <div>
          <Row>
            <Col lg={3}>
              <Image src={book.cover} width="100%" />
              <div className="d-flex gap-1 mt-3">
                <Button className="read-btn main-color-text" variant="" onClick={() => addBookToShelf("read", book)}>
                  Read
                </Button>
                <Button className="reading-btn main-color-text" variant="" onClick={() => addBookToShelf("reading", book)}>
                  Reading
                </Button>
                <Button className="wanttoread-btn main-color-text" variant="" onClick={() => addBookToShelf("want to read", book)}>
                  Want to read
                </Button>
              </div>
            </Col>
            <Col lg={9}>
              <h3>{book.title}</h3>
              {book.author.split(",").map((author) => (
                <h5 key={author}>{author}</h5>
              ))}

              <div>
                <ul className="nav flex-column">
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg text-white rounded px-1 me-2">
                      Isbn:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.isbn ? book.isbn : <i>Not available</i>}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Genre:
                    </span>
                     {book.genre.split(", ").map((genre) => ( 
                      <span key={genre} className="fw-semibold secondary-color-text">
                        {book.genre}
                      </span>
                    ))} 
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Pages:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.pages}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Language:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.language}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Published:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.published}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Description:
                    </span>
                    <br />
                    {/* {book.description.includes("\n") ? (
                      book.description.split("\n").map((des) => {
                        <p className="fw-semibold secondary-color-text">{des}</p>;
                      })
                    ) : ( */}
                      <p className="fw-semibold secondary-color-text">{book.description}</p>
                    {/* )} */}
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="comment mt-5">
            <div className="border-bottom border-2 border-black">
              <h4 className="secondary-color-bg pb-1 px-3 m-0 d-inline-block rounded-top main-color-text">
                Comments ({comments.length})
              </h4>
            </div>
            <div className="writeAComment pt-3">
              <textarea
                className="w-100"
                style={{ resize: "none" }}
                placeholder="Write a comment"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <Button className="secondary-color-bg main-color-text" variant="" onClick={addComment}>
                Comment
              </Button>
            </div>

            <div className="comments pt-5">
              {comments.length !== 0 &&
                comments.map((comment) => {
                  return (
                    <div className="comment d-flex gap-3" key={comment.id}>
                      <div>
                        <Image
                          src={comment.profile_image ? comment.profile_image  : default_image}
                          width={80}
                          height={80}
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <div className="d-flex gap-3">
                          <h5 className="secondary-color-text">{comment.name}</h5>
                          <small className="main-lighter-text">{formatDate(comment.date)}</small>
                        </div>
                        <div className="secondary-color-text">{comment.text}</div>
                        {loggedIn.length !== 0 &&
                        (
                           <>
                            <Button variant="outline-danger" className="mt-2 py-0 px-2 " title={comment.name == loggedIn.name ? "Delete your comment" : "Report this comment"} 
                              onClick={() => {
                              if(comment.name == loggedIn.name){
                                deleteComent(comment.id); 
                              } else {
                                alert("Comment reported");
                              }
                            }}>
                              {comment.name == loggedIn.name ? "Delete" : "Report"}
                            </Button>
                            <Button 
                              variant="outline-primary" 
                              className="mt-2 py-0 px-2 " 
                              title={comment.name == loggedIn.name ? "Edit your comment" : "You can only edit your own comments"} 
                              onClick={() => {
                                if(comment.name == loggedIn.name){
                                  const newText = prompt("Edit your comment:", comment.text); 
                                  if (newText !== null && newText.trim() !== "") {
                                    axios.put(`http://localhost:8800/book/${id}/edit/comments/${comment.id}`, {
                                      text: newText,
                                    })
                                      .then((res) => {
                                        if(res.status == 200){
                                          console.log("Comment edited");
                                          getComment();
                                        }
                                      })
                                      .catch((err) => {
                                        console.log("Error editing comment:", err);
                                      });
                                  }
                                } else {
                                  alert("You can only edit your own comments");
                                }
                              }}
                              disabled={comment.name != loggedIn.name}  >
                              Edit
                            </Button>
                        </>
                       )}
                          
                      </div>
                    </div>
                  );
                }).reverse()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
