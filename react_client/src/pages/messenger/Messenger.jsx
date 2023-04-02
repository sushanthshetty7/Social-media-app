import "./Messenger.css";
import axios from "axios";

import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/conversations/conversation";
import Message from "../../components/message/Message";
import Chatonline from "../../components/chatOnline/Chatonline";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

function Messenger() {
  const [convo, setConvo] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8500");
    socket.current.on("getMsg", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(()=>{
  //   setSocket(io("ws://localhost:8500"))
  // },[])

  // useEffect(()=>{
  //   socket?.on("welcome",message=>{
  //     console.log(message)
  //   })
  // },[socket])

  // console.log(socket)

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversiations = async () => {
      try {
        const res = await axios.get("/conversiation/" + user._id);
        setConvo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversiations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const resp = await axios.get("/message/" + currentChat?._id);
        setMessages(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  // console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      convoId: currentChat._id,
    };

    const reciverId = currentChat.members.find(
      (member) => member !== user._id);

    socket.current.emit("sendMsg", {
      senderId: user._id,
      reciverId,
      text: newMessage,
    });

    try {
      const resp = await axios.post("/message", message);
      setMessages([...messages, resp.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Seaerch for friends"
              className="chatMenuInput"
            />
            {convo.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentuser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMsgInput"
                    placeholder="write something"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="submitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConvo">open a conversiation</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="onlineWrapper">
            <Chatonline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
