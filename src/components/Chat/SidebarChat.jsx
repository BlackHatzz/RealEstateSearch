import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Chat.css";
import { Link, useRouteMatch } from "react-router-dom";

export default function SidebarChat({ id, title, newChat }) {
  let match = useRouteMatch();

  const createChat = () => {
    const title = prompt("asdasdasdasd");
    if (title) {
    }
  };
  return !newChat ? (
    <Link to={`${match.url}/${id}`}>
      <div className="sidebarChat">
        <Avatar src="https://www.w3schools.com/w3images/avatar2.png" />
        <div className="sidebarChat_info">
          <h2>{title}</h2>
          <p>last ms</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>New Chat</h2>
    </div>
  );
}
