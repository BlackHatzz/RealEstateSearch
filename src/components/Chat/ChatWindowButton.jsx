import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
export const ChatWindowButton = ({ onClickChat }) => {
  return (
    <div className="chat_window_button" onClick={onClickChat}>
      <div className="chat_window_button_content">
        <ChatIcon />
        <p>Chat</p>
      </div>
    </div>
  );
};
