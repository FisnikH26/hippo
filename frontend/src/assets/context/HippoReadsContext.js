import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { v4 as id } from "uuid";
export const HippoReadsContext = createContext(null);

export function HippoReadsContextProvider(props) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("");
  
  const [theme, setTheme] = useLocalStorage("theme");

  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  const [recentlyViewedBooks, setRecentlyViewedBooks] = useLocalStorage("recentlyViewedBooks");
  const [profile, setProfile] = useLocalStorage("profile");
  const [users, setUsers] = useLocalStorage("users");
  const [booksRead, setBooksRead] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [booksToBeRead, setBooksToBeRead] = useState([]);
  const [bookComments, setBookComments] = useLocalStorage("bookComments");

  const [userFollowers, setUserFollowers] = useLocalStorage("userFollowers");

  const url_books = `https://65c5cbb5e5b94dfca2e04e3f.mockapi.io/hipporeads/books`;

  const getBooks = async () => {
    setLoading(true);
    await fetch('http://localhost:8800/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  };
const getReadBooks = async () => {
  const res = await axios.get(`http://localhost:8800/booksread/${loggedIn.id}`);
      try {
        if (res.status == 200) {
          setBooksRead(prev=> prev = res.data); 
        }
      } catch (error) {
        console.error(error);
      }
}
const getReadingBooks = async () => {
  const res = await axios.get(`http://localhost:8800/booksreading/${loggedIn.id}`);
      try {
        if (res.status == 200) {
          setBooksReading(prev=> prev = res.data); 
        }
      } catch (error) {
        console.error(error);
      }
}
const getWantToReadBooks = async () => {
  const res = await axios.get(`http://localhost:8800/books_wanttoread/${loggedIn.id}`);
      try {
        if (res.status == 200) {
          setBooksToBeRead(prev=> prev = res.data); 
        }
      } catch (error) {
        console.error(error);
      }
}
  const getAuthors = async () => {
    setLoading(true);

    await fetch(
      `https://65c5cbb5e5b94dfca2e04e3f.mockapi.io/hipporeads/authors`
    )
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
        setLoading(false);
      });
  };

  const followUser = (user) => {
    if (userFollowers == undefined) {
      setUserFollowers([]);
    } else {
      let userFollowed = {
        id: id(),
        userId: loggedIn.id,
        followerId: user.id,
      };
      setUserFollowers([...userFollowers, userFollowed]);
    }
  };
  const unFollowUser = (user) => {
    if (userFollowers == undefined) {
      setUserFollowers([]);
    } else {
      let followerToRemove = userFollowers.filter(
        (follower) =>
          follower.followerId !== user.id && follower.userId == loggedIn.id
      );
      setUserFollowers(followerToRemove);
    }
  };

  const DoIFollowThisUser = (user) => {
    if (userFollowers == undefined) {
      return false;
    } else {
      return userFollowers.find(
        (follower) =>
          follower.followerId == user.id && follower.userId == loggedIn.id
      );
    }
  };

  const addBookToShelf = async (shelfName, book) => {
    let newBook = {
      id: id(),
      userId: loggedIn.id,
      book: book,
    };

    if (shelfName == "read") {
      
      const alreadyRead = booksRead.find((book) => book.title == newBook.book.title);
      if (alreadyRead)
       {
        alert("Already added");
        return;
      } else { 
      
          try {
          const res = await axios.post('http://localhost:8800/booksread', {
            user_id: loggedIn.id,
            book_id: book.id
          });
          if (res.status === 200) {
             
            
            
            
             
          }
        } catch (error) {
          console.error("Failed to add book:", error);
          alert("Failed to add book to shelf.");
        } 
      }
      return;
    } else if (shelfName == "reading") {
      if (
        booksReading.find(
          (book) =>
            book.book.name == newBook.book.name && book.userId == loggedIn.id
        )
      ) {
        alert("Already added");
      } else {
        setBooksReading([...booksReading, newBook]);
        console.log("Added");
      }

      return;
    } else if (shelfName == "want to read") {
      if (
        booksToBeRead.find(
          (book) =>
            book.book.name == newBook.book.name && book.userId == loggedIn.id
        )
      ) {
        alert("Already added");
      } else {
        setBooksToBeRead([...booksToBeRead, newBook]);
        console.log("Added");
      }

      return;
    } else {
      alert(
        `${book.name} cannot be added to ${shelfName} because ${shelfName} does not exist`
      );
    }
  };

  useEffect(() => {
   getReadBooks()
   getReadingBooks()
   getWantToReadBooks()
    if (users == undefined) {
      setUsers([]);
    }
    if (userFollowers == undefined) {
      setUserFollowers([]);
    }
    // if (booksRead == undefined) {
    //   setBooksRead([]);
    // }
    // if (booksReading == undefined) {
    //   setBooksReading([]);
    // }
    // if (booksToBeRead == undefined) {
    //   setBooksToBeRead([]);
    // }
    if (profile == undefined) {
      setProfile([]);
    }
    if (recentlyViewedBooks == undefined) {
      setRecentlyViewedBooks([]);
    }
    if (bookComments == undefined) {
      setBookComments([]);
    }

    getBooks();
  //   getAuthors();
  }, []);

  const contextValue = {
    books,
    setBooks,
    activePage,
    setActivePage,
    loggedIn,
    setLoggedIn,
    followUser,
    unFollowUser,
    DoIFollowThisUser,
    booksRead,
    setBooksRead,
    booksReading,
    setBooksReading,
    booksToBeRead,
    setBooksToBeRead,
    addBookToShelf,
    url_books,
    loading, setLoading,
    recentlyViewedBooks, setRecentlyViewedBooks, 
    bookComments, setBookComments,
    profile, setProfile,
    users, setUsers,
    userFollowers, setUserFollowers,
    theme, setTheme
  };

  return (
    <HippoReadsContext.Provider value={contextValue}>
      {props.children}
    </HippoReadsContext.Provider>
  );
}
