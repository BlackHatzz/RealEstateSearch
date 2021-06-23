import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";

const Messageboard = () => {
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    setInput("");
  };
  return (
    <div className="messageBoard">
      <div className="messageBoard_header">
        <Avatar />
        <div className="messageBoard_header_info">
          <h3>title</h3>
          <p>last seen</p>
        </div>
        <div className="messageBoard_header_right">
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="messageBoard_realestate">info</div>
      <div className="messageBoard_container">
        <p className={`message ${true && "message_send"}`}>
          hi
          <span className="message_name">Iron</span>
        </p>
        <p className={`message ${false && "message_send"}`}>
          hi
          <span className="message_name">Iron</span>
        </p>
      </div>
      <div className="messageBoard_sendform">
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            type="text"
            placeholder="Aa"
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};

export default Messageboard;
