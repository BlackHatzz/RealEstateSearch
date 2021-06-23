import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Chat.css";

export default function SidebarChat({ id, title, newChat }) {
  const [seed, setSeed] = useState("");

  const createChat = () => {
    const title = prompt("asdasdasdasd");
    if (title) {
    }
  };
  return !newChat ? (
    <div className="sidebarChat">
      <Avatar src="https://www.w3schools.com/w3images/avatar2.png" />
      <div className="sidebarChat_info">
        <h2>{title}</h2>
        <p>last ms</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>New Chat</h2>
    </div>
  );
}
