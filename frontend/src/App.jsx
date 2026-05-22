import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { HippoReadsContext } from "./assets/context/HippoReadsContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Button, Col, Image, Row } from "react-bootstrap";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import AuthorProfile from "./pages/AuthorProfile";
import logo from "./assets/images/hippo.png";

function App() {
  const { loggedIn, setLoggedIn, theme, setTheme } =
    useContext(HippoReadsContext);
  return (
    <BrowserRouter>
      {loggedIn == undefined ? (
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      ) : (
        <div className={`App ${theme}`}>
          <Row className="mx-0 mh100">
            <Col lg={2} className="mh100 pt-3 border-end secondary-color-border ">
              <header className="App-header mb-5">
                <Link
                  to="/"
                  className="d-flex gap-1 align-items-center text-decoration-none fs-3 secondary-color-text"
                >
                  <Image src={logo} width={50} height={50} />
                  <div>
                    <span className="protest-guerrilla-regular secondary-color-text">
                      Hippo
                    </span>
                    <span className="text-primary fw-bold">Reads</span>
                  </div>
                </Link>
              </header>
              <aside>
                <ul className="nav flex-column gap-3">
                  <Link
                    className="text-decoration-none secondary-color-text fw-semibold fs-5"
                    to="/"
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    className="text-decoration-none secondary-color-text fw-semibold fs-5"
                    to="/explore"
                  >
                    <li>Explore</li>
                  </Link>
                  <Link
                    className="text-decoration-none secondary-color-text fw-semibold fs-5"
                    to={`/profile/${loggedIn.name.split(" ").join("-")}`}
                  >
                    <li>Profile</li>
                  </Link>
                </ul>
                <Button
                  className="btn-sm mt-3"
                  variant="danger"
                  onClick={() => {
                    setLoggedIn();
                    window.location.replace("http://localhost:3000/");
                  }}
                >
                  Log out
                </Button>
                <div className="mt-3">
                  <p className=" mb-0 secondary-color-text">Themes:</p>
                  <Button
                    className={`btn-sm theme-btn ${
                      theme == "light" ? "active" : ""
                    }`}
                    variant=""
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button
                    className={`btn-sm theme-btn ${
                      theme == "dark" ? "active" : ""
                    }`}
                    variant=""
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    className={`btn-sm theme-btn ${
                      theme == "sepia" ? "active" : ""
                    }`}
                    variant=""
                    onClick={() => setTheme("sepia")}
                  >
                    Sepia
                  </Button>
                </div>
              </aside>
            </Col>
            <Col lg={10} >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/author/:name" element={<AuthorProfile />} />
              </Routes>
            </Col>
          </Row>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
