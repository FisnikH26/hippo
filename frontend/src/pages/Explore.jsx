import React, { useEffect, useState } from "react"; 
import { Col, Row } from "react-bootstrap";
// import Sidebar from "../components/Sidebar";
import { useDebounce } from "@uidotdev/usehooks";

import BookCard from "../components/BookCard";
import { useContext } from "react";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import axios from "axios";

const Explore = () => {
  const [selectSortValue, setSelectSortValue] = useState("sort");
  const [library, setLibrary] = useState([]);
  const [search, setSearch] = useState("");
  const { loading, setActivePage } = useContext(HippoReadsContext);
  const debouncedSearchTerm = useDebounce(search, 200);
useEffect(() => {
    setActivePage("Explore");
  });

  const getBooks = async () => {
    if (selectSortValue == "a_z") {
      library.sort((a, b) => {
        if(a < b) return -1;
      });
    } else if (selectSortValue == "z_a") {
      library.sort((a, b) => {
        if(b > a) return 1;
      });
    }

    const res = await axios.get("http://localhost:8800/books");
    try {
      if (res.status == 200) {
        setLibrary(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSearchedBooks = async () => {
    const res = await fetch( `http://localhost:8800/searchBooks?name=${encodeURIComponent(debouncedSearchTerm)}`);
    
    const data = await res.json();
  
    if (data == "Not found" || data == []) {
      setLibrary([]);
  
    }else{
      setLibrary(data);
    }
  }
  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if(debouncedSearchTerm){

      getSearchedBooks();
    }else{
      getBooks();
    }
  }, [debouncedSearchTerm]);


  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="explore py-3 px-5">
          <Row>
            <Col lg={12} className=" ">
              <div className="d-flex gap-5 w-100 align-items-end">
                {/* <select
                  name="sort"
                  className="border-0 border-bottom secondary-color-text secondary-color-border fw-semibold"
                  style={{
                    width: "70px",
                    background: "var(--background-color)",
                  }}
                  onChange={(e) => setSelectSortValue(e.target.value)}
                >
                  <option value="sort">Sort</option>
                  <option value="a_z">A_z</option>
                  <option value="z_a">Z_A</option>
                </select> */}
                <div style={{ flex: 2 }}>
                  <div className="search_container position-relative w-50">
                    <input
                      type="search"
                      className="search_input pe-3 rounded-pill border secondary-color-border main-color-bg w-100 ps-3 py-1 "
                      placeholder="Search Book..."
                      onKeyUp={(e) => setSearch(e.target.value)}
                    />
                    <span className="search_icon secondary-color-bg main-color-text rounded-circle">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                  </div>
                </div>
              </div>
              <Row className="my-5">
                {library &&
                  library.map((book, i) => {
                    return (
                      <Col
                        key={i}
                        lg={2}
                        md={4}
                        sm={6}
                        xs={12}
                        className="  py-3 "
                      >
                        <BookCard book={book} />
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Explore;
