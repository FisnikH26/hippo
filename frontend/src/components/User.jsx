import { Button, Image } from "react-bootstrap";
import React, { useContext } from "react";
import photo from "../assets/images/OIG1.jpg";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { Link } from "react-router-dom";
const User = ({ user }) => {
  const { followUser, unFollowUser,DoIFollowThisUser } = useContext(HippoReadsContext);

  return (
    <div
      className="d-flex align-items-center justify-content-between border border-dark rounded-pill px-1 mt-2"
      style={{ height: "40px" }}
    >
      <div
        className="rounded-circle secondary-color-bg overflow-hidden "
        style={{ width: "34px", height: "34px" }}
      >
        <Image src={photo} width="100%" />
      </div>
      <Link to={`profile/${user.name}`} className="text-decoration-none secondary-color-text">
        <div>
          <b>{user.name}</b>
        </div>
      </Link>
      <div>
        {DoIFollowThisUser(user) === undefined ? (
          <Button
            className="bt-sm rounded-pill p-0 px-3 follow-btn" 
            variant=""
            onClick={() => followUser(user)}
          >
            <i className="fa-solid fa-user-plus"></i>
          </Button>
        ) : (
          <Button
            className="bt-sm rounded-pill border secondary-color-border p-0 px-3 unfollow-btn"
            variant=""
            onClick={() => unFollowUser(user)}
          >
            <i className="fa-solid fa-user-check"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default User;
