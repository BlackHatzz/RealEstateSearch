import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
export const ChatWindowHeader = ({ onClickChat }) => {
  return (
    <div className="chat_window_header">
      <div className="chat-profile-header-container"></div>
      <div className="chat_window_header_title">
        <h2>Nguyen Duc Huy</h2>
      </div>
      <div className="chat_window_close_button" onClick={onClickChat}>
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
};
