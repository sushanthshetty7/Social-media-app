import React from "react";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PIBLIC_FOLDER
  return (
    <li className="rightbarFriend">
      <div className="rightbarImgCont">
        <img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="RightbarUserName">{user.username}</span>
    </li>
  );
}
