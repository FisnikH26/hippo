import React, { useContext, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { v4 as userId } from "uuid";
import happyHippo from "../assets/images/hd8ziqoq.png";
import { Link } from "react-router-dom";
import { todayDate } from "../assets/data/todaydate";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { use } from "react";
import axios from "axios";

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
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");


  const createUserAccount =  (userData) => {
    console.log("Creating user account with data:", userData);
    axios.post("http://localhost:8800/signup", userData)
      .then(response => {
        console.log("User account created successfully:", response.data);
        console.log();
        
        // Handle success, e.g., redirect to login page or show a success message
        axios.get(`http://localhost:8800/users/${userData.email}`)
          .then(response => {
            const createdUser = response.data[0]; // Assuming the response is an array of users
            if (createdUser) {
              const newUserProfile = {
                biography: "no Bio Yet",
                created_at: createdUser.created_at,
                profile_image: 'default-profile.png', // Set a default profile image
                user_id: createdUser.id,
              };
              axios.post("http://localhost:8800/signup/profile", newUserProfile)
                .then(profileResponse => {
                  console.log("User profile created successfully:", profileResponse.data);
                  setProfile([...profile, profileResponse.data]);
                  setLoggedIn(createdUser);
                  window.location.replace("http://localhost:3000/");
                })
                .catch(profileError => {
                  console.error("Error creating user profile:", profileError);
                  // Handle error, e.g., show an error message to the user
                });
            } else {
              console.error("Created user not found in response data");
              // Handle error, e.g., show an error message to the user
            }
          })
          .catch(error => {
            console.error("Error fetching users:", error);
            // Handle error, e.g., show an error message to the user
          });
          

      // setLoggedIn(response.data);
      //   window.location.replace("http://localhost:3000/");
      })
      .catch(error => {
        console.error("Error creating user account:", error);
        // Handle error, e.g., show an error message to the user
      });

      
    }
  

  const submit_signUp = (e) => {
    e.preventDefault();
    let newUser = {};
    let newUserProfile = {};

    let goodfullname = false,
      goodEmail = false,
      goodusername = false,
      goodpwd = false;

    if (fullname === "") {
      setFullnameErr("fullname is empty");
    } else if (/^[a-zA-Z]+$/.test(fullname)) {
      setFullnameErr("Only use letters");
    } else {
      
      setFullnameErr("");
      goodfullname = true;

    }
    if (username === "" || username.length < 4) {
      setUsernameErr("username is empty or too short");
    } else {
      setUsernameErr("");

      goodusername = true;
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

    if (goodfullname && goodusername && goodEmail && goodpwd) {
      newUser = {
        name: fullname,
        username: username,
        email: email,
        password: password,
      };
      // newUserProfile = {
      //   id: userId(),
      //   userId: newUser.id,
      //   biography: "no Bio Yet",
      //   created_at: newUser.created_at,
      //   profile_image: null,
      // };

      // setUsers([...users, newUser]);
      // setProfile([...profile, newUserProfile]);
      createUserAccount(newUser)
      // setRecentlyViewedBooks([]);
    } else {            
      
        console.log("validation failed");
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
                type="text"
                className="form-control mb-1"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr.length !== 0 && (
                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {usernameErr}
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
