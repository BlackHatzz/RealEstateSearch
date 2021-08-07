import React, { useEffect, useState } from "react";

import { ChatContent } from "./ChatContent";

const SmallChatWindow = ({ currentChat, oldChat1, oldChat2 }) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="small-chat-windows">
      {currentChat && (
        <div
          className={oldChat1 ? "small-chat-window-1" : "small-chat-window-2"}
        >
          <ChatContent currentChat={currentChat} />
        </div>
      )}
      {oldChat1 && (
        <div className="small-chat-window-2">
          <ChatContent currentChat={oldChat1} />
        </div>
      )}
    </div>
  );
};

export default SmallChatWindow;
