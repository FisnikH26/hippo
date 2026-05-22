import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import StackCarousel from "../components/StackCarousel";
import RecentlyViewed from "../components/RecentlyView";
import TopBooks from "../components/TopBooks";
import Sidebar from "../components/Sidebar";
import RecommendedBooks from "../components/RecommendedBooks";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import axios from 'axios'

const Home = () => {
  const { setActivePage } = useContext(HippoReadsContext);
  useEffect(() => {
    setActivePage("Home");
  });

  const fetchBooks = async ()=>{
    try{
      const res = await axios.get("http://localhost:8800/books")
      console.log(res.data);
      
    } catch(err){
      console.log(err);
      
    }
  }
  useEffect(()=>{
    // fetchBooks()
  },[])
  return (
    <div >
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={9} className="pb-4  border-end  secondary-color-border ">
            <StackCarousel />
            <TopBooks />
            <Row>
              <Col lg={6}><RecentlyViewed /></Col>
              {/* <Col lg={6}><RecommendedBooks /></Col> */}
            </Row>
          </Col>
          <Col lg={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
