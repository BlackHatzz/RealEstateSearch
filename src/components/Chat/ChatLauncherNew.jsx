import React, { useContext, useEffect } from "react";
import { Context } from "../../ChatContext";
import ChatBubble from "./ChatBubble";
import SmallChatWindow from "./SmallChatWindow";

const ChatLauncherNew = () => {
  const { chats } = useContext(Context);
  useEffect(() => {
    let cons = JSON.parse(localStorage.getItem("chats"));
    return () => {
      if (cons.length) {
        console.log(cons[0].data.title);
      }
    };
  }, [chats]);
  return (
    <>
      {/* <ChatBubble />
      <SmallChatWindow /> */}
    </>
  );
};

export default ChatLauncherNew;
