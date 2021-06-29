import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Chat.css";
import { Link, useRouteMatch } from "react-router-dom";

export default function SidebarChat({
  real,
  seller,
  buyer,
  id,
  title,
  newChat,
}) {
  let match = useRouteMatch();

  const createChat = () => {
    const title = prompt("asdasdasdasd");
  };
  return !newChat ? (
    <Link to={`${match.url}/${id}/${real}/${seller}/${buyer}`}>
      <div className="sidebarChat">
        {/* <Avatar src="https://www.w3schools.com/w3images/avatar2.png" /> */}
        <div className="sidebarChat_info">
          <h2>{title}</h2>
          {/* <p>last ms</p> */}
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>New Chat</h2>
    </div>
  );
}
