import React, { useContext, useEffect, useState } from "react";
import User from "./User";
import { useDebounce } from "@uidotdev/usehooks";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { Image} from "react-bootstrap";
import default_photo from "../assets/images/OIG1.jpg";
const Sidebar = () => {
  const [userSuggestion, setUserSuggestion] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBookResult, setSearchBookResult] = useState([]);
  const [searchUserResult, setSearchUserResult] = useState([]);
  const { users, loggedIn, DoIFollowThisUser, setLoading } =
    useContext(HippoReadsContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

const getSearchedBooks = async () => {
  const res = await fetch( `http://localhost:8800/searchBooks?name=${encodeURIComponent(debouncedSearchTerm)}`);
  
  const data = await res.json();

  if (data == "Not found" || data == []) {
    setSearchBookResult([]);

  }else{
    setSearchBookResult(data);
  }
}
const getSearchedUsers = async () => {
  const res = await fetch( `http://localhost:8800/searchUsers?name=${encodeURIComponent(debouncedSearchTerm)}`);
  
  const data = await res.json();

  if (data.length !== 0) {
    setSearchUserResult(data);

  }else{
    setSearchUserResult([]);
  }
}



  const searchBook = async () => {
    if (debouncedSearchTerm.length !== 0) {
      await getSearchedBooks();
      await getSearchedUsers();
    }
    // setLoading(true);
    // await fetch(url_books + `?name=${searchTerm}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data == "Not found") {
    //       setSearchBookResult([]);
    //     } else {
    //       setSearchBookResult(data);
    //     }
    //     setLoading(false);
    //   });

    // setSearchUserResult(
    //   users.filter((user) =>
    //     user.name.toLowerCase().includes(searchTerm.toLowerCase())
    //   )
    // );
  };
  useEffect(() => {
    setUserSuggestion(
      users.filter(
        (user) =>
          user.id !== loggedIn.id && DoIFollowThisUser(user) == undefined
      )
    );
  }, []);
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchBook();
      console.log({searchBookResult, searchUserResult});
      
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="pt-3">
      <div className="position-relative">
        <h6>Quick Search</h6>
        <input
          type="search"
          className="form-control rounded-pill secondary-color-border secondary-color-text main-color-bg"
          placeholder="Search"
          onKeyUp={(e) => setSearchTerm(e.target.value)}
        />
        {debouncedSearchTerm && (
          <div className="search_result position-absolute bg-white w-100 p-2 text-secondary border">
            <div>
              <small className="fw-bold">BOOKS</small>
              {searchBookResult.map((book) => (
                <div className="d-flex align-items-center gap-1 mb-1" key={book.id}>
                  <Image src={book.cover} width={40} height={50} />
                  <h6>
                    {book.title.length >= 20
                      ? book.title.slice(0, 20) + "..."
                      : book.title}
                  </h6>
                </div>
              ))}
            </div>
            <div>
              <small className="fw-bold">USERS</small>
              {searchUserResult.map((user) => {
                return (
                  <div className="d-flex align-items-center gap-1 mb-1">
                    <Image
                      src={
                        user.profile_image !== 'default_image'
                          ? user.profile_image
                          : default_photo
                      }
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                    <h6>
                      {user.name.length >= 20
                        ? user.name.slice(0, 20) + "..."
                        : user.name}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <small className="fw-semibold">Suggestion for you</small>
        {userSuggestion.length ? (
          userSuggestion
            .slice(0, 3)
            .map((user_s) => <User key={user_s.id} user={user_s} />)
        ) : (
          <b className="d-block text-center">No Suggestions</b>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
