import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { useParams } from "react-router-dom";
import default_img from "../assets/images/OIG1.jpg";
import no_books from "../assets/images/no-education.png";
import axios from "axios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("read");
  const [user, setUser] = useState();

  const [userLibraryLoading, setUserLibraryLoading] = useState(true);
  const [userLibrary, setUserLibrary] = useState({booksRead: [], reading: [], bookswanttoread: []}); 
  const [bookswanttoread, setBookswanttoread] = useState([]);
  const [booksRead, setBooksRead] = useState([]);
  const [reading, setReading] = useState([]);
  // const { loggedIn } = useContext(HippoReadsContext);

  const { name } = useParams();
  const {
    users,
    profile,
    userFollowers,  
    setBooksReading,
    booksToBeRead,
    setBooksToBeRead,
    DoIFollowThisUser,
    loggedIn,
    followUser,
    unFollowUser,
  } = useContext(HippoReadsContext);
  const getFollowings = async (id) => {
    const res = await axios.get(`http://localhost:8800/following/${id}`);
    try {
      if (res.status == 200) {
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getUserLibrary = async (id) => {
    setUserLibraryLoading(true);
    const res = await axios.get(`http://localhost:8800/booksread/${id}`);
    try {
      if (res.status == 200) {
        setBooksRead(prev=> prev = res.data); 
      }
    } catch (error) {
      console.error(error);
    }

    const res2 = await axios.get(
      `http://localhost:8800/booksreading/${id}`
    );
    try {
      if (res2.status == 200) {
        setReading(prev=> prev = res2.data); 
      }
    } catch (error) {
      console.error(error);
    }
    const res3 = await axios.get(
      `http://localhost:8800/books_wanttoread/${id}`
    );
    try {
      if (res3.status == 200) {
        setBookswanttoread(prev=> prev = res3.data);
      }
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setUserLibraryLoading(false);
    }, 1500);
  };
  const getProfileData = async () => {
    const res = await axios.get(`http://localhost:8800/profile/${name}`);
    const data = res.data[0];

    setUser(data);
    getUserLibrary(data.id);
  };

  const btnType = () => {
    if (name.split("-").join(" ") === loggedIn.name) {
      return <Button variant="dark">Edit Profile</Button>;
    }
    if (DoIFollowThisUser(user) === undefined) {
      return (
        <Button
          className="follow-btn"
          variant=""
          onClick={() => followUser(user)}
        >
          Follow
        </Button>
      );
    } else {
      return (
        <Button
          className="unfollow-btn secondary-color-border border"
          variant=""
          onClick={() => unFollowUser(user)}
        >
          Following
        </Button>
      );
    }
  };

  const removeBookFromShelf = (shelfname, book) => {
    if (shelfname === "read") {
      axios.delete(`http://localhost:8800/removebook/${book.id}/${loggedIn.id}/read`)
      console.log(book.id);
      console.log(loggedIn.id);
      // setBooksRead(
      //   booksRead.filter((bookToBeRemoved) => bookToBeRemoved.id !== book.id)
      // );
      return;
    }
    if (shelfname === "reading") {
      setReading(
        reading.filter((bookToBeRemoved) => bookToBeRemoved.id !== book.id)
      );
      return;
    }
    if (shelfname === "want to read") {
      setBooksToBeRead(
        booksToBeRead.filter(
          (bookToBeRemoved) => bookToBeRemoved.id !== book.id
        )
      );
      return;
    }
  };

  useEffect(() => {
    getProfileData();
  }, [name]);

  return (
    <div className="w-75 py-3 ps-5">
      {user && (
        <>
          <div>
            <div className="d-flex align-items-center gap-3 w-75 justify-content-between">
              <Image
                src={
                  user.profile_image === "default_image"
                    ? default_img
                    : user.profile_image
                }
                width={150}
                height={150}
                className="rounded-circle"
              />
              <div style={{ flex: 2 }}>
                <h4 className="secondary-color-text">{user.name}</h4>
                <p className="text-muted">@{user.username}</p>
                <div className="d-flex gap-3 fw-semibold secondary-color-text">
                  <p>{user.followers} Followers</p>
                  <p>{user.following} Followings</p>
                </div>
              </div>
              {btnType()}
            </div>
            <div className="mt-3 mb-5 secondary-color-text">{`${user.biography}`}</div>
          </div>
          <div>
            {userLibraryLoading ? (
              <h4>Loading...</h4>
            ) : (
              <>
                <div className="tabs d-flex">
                  <div
                    role="button"
                    className={`"fw-semibold w-100 text-center  border py-2 secondary-color-border ${
                      activeTab === "read"
                        ? "main-color-text secondary-color-bg"
                        : "secondary-color-text"
                    }`}
                    onClick={() => setActiveTab("read")}
                  >
                    Read ({booksRead?.length})
                  </div>
                  <div
                    role="button"
                    className={`"fw-semibold w-100 text-center  border py-2 secondary-color-border ${
                      activeTab === "reading"
                        ? "main-color-text secondary-color-bg"
                        : "secondary-color-text"
                    }`}
                    onClick={() => setActiveTab("reading")}
                  >
                    Reading ({reading?.length})
                  </div>
                  <div
                    role="button"
                    className={`"fw-semibold w-100 text-center  border py-2 secondary-color-border ${
                      activeTab === "wantToRead"
                        ? "main-color-text secondary-color-bg"
                        : "secondary-color-text"
                    }`}
                    onClick={() => setActiveTab("wantToRead")}
                  >
                    Want to read ({bookswanttoread?.length})
                  </div>
                </div>
                {activeTab === "read" && (
                  <div>
                    {booksRead?.length ? (
                      <Row>
                        {booksRead.map((book) => (
                          <Col
                            lg={3}
                            key={book.id}
                            className="position-relative"
                            id={book.id}
                          >
                            <BookCard book={book} />
                            <Button
                              variant="danger"
                              className="btn-sm rounded position-absolute me-2"
                              onClick={() =>
                                removeBookFromShelf("read", book)
                              }
                              style={{ top: "15px", right: "12px" }}
                            >
                              X
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <div className="text-center py-5">
                        <Image src={no_books} />
                        <h4 className="mt-2 secondary-color-text">
                          No books in READ section
                        </h4>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "reading" && (
                  <div>
                    {reading?.length ? (
                      <Row>
                        {reading.map((book) => (
                          <Col
                            lg={3}
                            key={book.id}
                            className="position-relative"
                          >
                            <BookCard book={book} />
                            <Button
                              variant="danger"
                              className="btn-sm rounded position-absolute me-2"
                              onClick={() => removeBookFromShelf("reading", book)}
                              style={{ top: "15px", right: "12px" }}
                            >
                              X
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <div className="text-center py-5">
                        <Image src={no_books} />
                        <h4 className="mt-2 secondary-color-text">
                          No books in READING section
                        </h4>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "wantToRead" && (
                  <div>
                    {bookswanttoread?.length ? (
                      <Row>
                        {bookswanttoread.map((book) => (
                          <Col
                            lg={3}
                            key={book.id}
                            className="position-relative"
                          >
                            <BookCard book={book} />
                            <Button
                              variant="danger"
                              className="btn-sm rounded position-absolute me-2"
                              onClick={() => removeBookFromShelf("want to read", book)}
                              style={{ top: "15px", right: "12px" }}
                            >
                              X
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <div className="text-center py-5">
                        <Image src={no_books} />
                        <h4 className="mt-2 secondary-color-text">
                          No books in READING section
                        </h4>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
