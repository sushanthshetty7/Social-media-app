import React, { useEffect, useState } from "react";
import "./profile.css";
import Feed from "../../../components/feed/Feed";
import Rightbar from "../../../components/rightbar/Rightbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const PF = process.env.REACT_APP_PIBLIC_FOLDER
  const [user, setUser] = useState({});
  const username = useParams().username;
  // console.log(params.username)

  useEffect(() => {
    const FetchUser = async () => {
      const resp = await axios.get(`/user?username=${username}`);
      setUser(resp.data)
    };
    FetchUser(); 
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.png"} alt="img" className="coverImage" />
              <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="img" className="UserImage" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username ={username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
