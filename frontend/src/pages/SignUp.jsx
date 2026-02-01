import React, { useContext, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { v4 as userId } from "uuid";
import happyHippo from "../assets/images/hd8ziqoq.png";
import { Link } from "react-router-dom";
import { todayDate } from "../assets/data/todaydate";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";

const SignUp = () => {
  const {
    setLoggedIn,
    profile,
    setProfile,
    users,
    setUsers,
    setRecentlyViewedBooks,
  } = useContext(HippoReadsContext);

  const [fullname, setFullname] = useState("");
  const [fullnameErr, setFullnameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const submit_signUp = (e) => {
    e.preventDefault();
    let goodfullname = false,
      goodEmail = false,
      goodpwd = false;

    if (fullname === "") {
      setFullnameErr("fullname is empty");
    } else if (/^[a-zA-Z]+$/.test(fullname)) {
      setFullnameErr("Only use letters");
    } else {
      setFullnameErr("");
      goodfullname = true;
    }
    if (email === "") {
      setEmailErr("email is empty");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailErr("email is invalid");
    } else {
      setEmailErr("");
      goodEmail = true;
    }

    if (password <= 4) {
      setPasswordErr("password is too short");
    } else {
      setPasswordErr("");
      goodpwd = true;
    }

    if (goodfullname && goodEmail && goodpwd) {
      let newUser = {
        id: userId(),
        name: fullname,
        email: email,
        password: password,
        created_at: todayDate(),
      };
      let newUserProfile = {
        id: userId(),
        userId: newUser.id,
        biography: "no Bio Yet",
        created_at: newUser.created_at,
        profile_image: null,
      };

      setUsers([...users, newUser]);
      setProfile([...profile, newUserProfile]);
      setLoggedIn(newUser);
      window.location.replace("http://localhost:3000/");
      setRecentlyViewedBooks([]);
    }
  };

  return (
    <div
      className="signUp_container d-flex align-items-center justify-content-center "
      style={{ minHeight: "100dvh" }}
    >
      <Row className="w-50 overflow-hidden rounded mx-auto mt-4">
        <Col lg={6} className="ps-0">
          <Image src={happyHippo} width="100%" />
        </Col>
        <Col lg={6}>
          <h3 className="text-center text-white mb-4">Sign up</h3>
          <form className="d-flex flex-column gap-2" onSubmit={submit_signUp}>
            <div>
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              {fullnameErr.length !== 0 && (
                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {fullnameErr}
                </b>
              )}
            </div>
            <div>
              <input
                type="email"
                className="form-control mb-1"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr.length !== 0 && (
                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {emailErr}
                </b>
              )}
            </div>
            <div>
              <input
                type="password"
                className="form-control mb-1"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr.length !== 0 && (
                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {passwordErr}
                </b>
              )}
            </div>
            <div>
              <input
                type="submit"
                className="form-control bg-dark text-white border-0"
                value="Sign Up"
              />
            </div>
          </form>

          <small className="text-center text-white">
            Already have an account?{" "}
            <Link to="/" className="text-dark fw-semibold">
              Log In
            </Link>
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
