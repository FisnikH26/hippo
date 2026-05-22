import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BookCard from "./BookCard";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import axios from "axios";
const TopBooks = () => {
  const [topBooks, setTopbooks] = useState([]);
  const { url_books,loading, setLoading } = useContext(HippoReadsContext);


  const topbooksDB = async ()=>{
    try {
      const res = await axios.get('http://localhost:8800/topbooks')
      if(res.status == 200){
        setTopbooks(res.data); 
        
        setLoading(false);
      } 
    } catch (error) {
      console.log(error);
      
    }  

  }
  
  useEffect(()=>{
    // 
    topbooksDB()
  // 
  },[])
  return (
    <section className="py-3">
      {loading ? (
        "Loading"
      ) : (
        <Row className="">
          <h3 className="secondary-color-text">Top Books</h3> 
          {topBooks &&
            topBooks.map((book) => {
                return (
                  <Col lg={3} key={book.id}>
                    <BookCard book={book} />
                  </Col>
                );
              })}
        </Row>
      )}
    </section>
  );
};

export default TopBooks;
