import React from 'react'
import "./Message.css"
import {format} from "timeago.js"

function Message({message, own}) {
  const PF = process.env.REACT_APP_PIBLIC_FOLDER

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src={PF +"person/1.jpeg"} alt="" className="msgImage" />
            <p className='msgText'>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message