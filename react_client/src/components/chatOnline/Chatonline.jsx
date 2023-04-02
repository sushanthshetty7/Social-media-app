import React, { useEffect, useState } from "react";
import "./Chatonline.css";
import axios from "axios";

export default function Chatonline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PIBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const resp = await axios.get("/user/friends/" + currentId);
      setFriends(resp.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  // console.log(onlineUsers)
  const handleClick = async (user)=>{
    try{
      const resp = await axios.get(`/conversiation/find/${currentId}/${user._id}`)
      setCurrentChat(resp.data)
    }catch(err){
      console.log(err)
    }
  }

 
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatfriend" onClick={()=>handleClick(o)}>
          <div className="chatOnlineImag">
            <img
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="ChatImage"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}


