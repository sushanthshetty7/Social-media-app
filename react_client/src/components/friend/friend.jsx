import React from "react";

export default function Friend({user}) {
  const PF = process.env.REACT_APP_PIBLIC_FOLDER
  return (
    <li className="sidebarFriend">
      <img
        src={PF+user.profilePicture}
        alt="img"
        className="sidebarFriendImage"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
