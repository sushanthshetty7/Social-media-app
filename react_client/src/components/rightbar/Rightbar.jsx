import React, { useContext, useEffect, useState } from "react";
import "./Rightbar.css";
import { Users } from "../../Dummy";
import Online from "../onlile/online";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PIBLIC_FOLDER;

  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(user?._id) || false,
  );

  useEffect(() => {
    const getFriends = async () => {
      if (!user?._id) {
        return;
      }

      try {
        const friendList = await axios.get(
          "/api/user/friends/" + user._id,
        );

        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [user]);

  useEffect(() => {
    if (currentUser && user) {
      setFollowed(
        currentUser.followings?.includes(user._id) || false,
      );
    }
  }, [currentUser, user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/api/user/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });

        dispatch({
          type: "UNFOLLOW",
          payload: user._id,
        });
      } else {
        await axios.put("/api/user/" + user._id + "/follow", {
          userId: currentUser._id,
        });

        dispatch({
          type: "FOLLOW",
          payload: user._id,
        });
      }

      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src={PF + "gift.png"}
            alt=""
            className="birthdayImage"
          />

          <span className="birthdayText">
            <b>Pola foster</b> and <b>3 other friends</b> have
            their birthday today
          </span>
        </div>

        <img
          src={PF + "ad.png"}
          alt=""
          className="rightbarAd"
        />

        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="rightbarfList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {currentUser &&
          (user.username !== currentUser.username ? (
            <button
              className="followbutton"
              onClick={handleClick}
            >
              {followed ? "Unfollow" : "Follow"}

              {followed ? <Remove /> : <Add />}
            </button>
          ) : (
            <button
              className="logoutButton"
              onClick={handleLogout}
            >
              Logout
            </button>
          ))}

        <h4 className="rBartitle">User Information</h4>

        <div className="rightbarInfo">
          <div className="rightBarInfoItm">
            <span className="RbarInfoKey">City:</span>

            <span className="RbarInfoValue">
              {user.city}
            </span>
          </div>

          <div className="rightBarInfoItm">
            <span className="RbarInfoKey">From:</span>

            <span className="RbarInfoValue">
              {user.from}
            </span>
          </div>

          <div className="rightBarInfoItm">
            <span className="RbarInfoKey">
              Relationship:
            </span>

            <span className="RbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                  ? "Married"
                  : ""}
            </span>
          </div>
        </div>

        <h4 className="rBartitle">User Friends</h4>

        <div className="Followings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="following">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="followingImage"
                />

                <span className="follUsername">
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}