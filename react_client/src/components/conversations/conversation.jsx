import axios from "axios";
import React, { useEffect, useState } from "react";

import "./conversation.css";

function Conversation({ conversation, currentuser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PIBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentuser._id);
    const getUser = async () => {
      try {
        const resp = await axios("/user?userId=" + friendId);
        setUser(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentuser, conversation]);

  
  return (
    <div className="conservation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="convoName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
