import React, { useEffect, useState } from "react";
import { fb } from "../../services";

import { ChatContent } from "./ChatContent";

const SmallChatWindow = ({ currentChat, oldChat1, forceUpdate }) => {
  const [currentChatDealStatus, setCurrentChatDealStatus] = useState();
  const [currentChatBookStatus, setCurrentChatBookStatus] = useState();
  const [oldChatDealStatus, setOldChatDealStatus] = useState();
  const [oldChatBookStatus, setOldChatBookStatus] = useState();

  useEffect(() => {
    const currentChatDeal = fb.firestore
      .collection("conversations")
      .doc(currentChat?.id + "")
      .onSnapshot((snap) => {
        let data = snap.data();
        setCurrentChatDealStatus(
          data?.deal === "accepted" || data?.deal === "pending" ? true : false
        );
        setCurrentChatBookStatus(
          data?.appointment === "upcomming" ? true : false
        );
      });
    const oldChatDeal = fb.firestore
      .collection("conversations")
      .doc(oldChat1?.id + "")
      .onSnapshot((snap) => {
        let data = snap.data();
        setOldChatDealStatus(
          data?.deal === "accepted" || data?.deal === "pending" ? true : false
        );
        setOldChatBookStatus(data?.appointment === "upcoming" ? true : false);
      });
    return () => {
      currentChatDeal();
      oldChatDeal();
    };
  }, [currentChat?.id, oldChat1?.id]);
  return (
    <div className="small-chat-windows">
      {currentChat && (
        <div
          className={oldChat1 ? "small-chat-window-1" : "small-chat-window-2"}
        >
          <ChatContent
            currentChat={currentChat}
            forceUpdate={forceUpdate}
            dealStatus={currentChatDealStatus}
            bookStatus={currentChatBookStatus}
          />
        </div>
      )}
      {oldChat1 && (
        <div className="small-chat-window-2">
          <ChatContent
            currentChat={oldChat1}
            forceUpdate={forceUpdate}
            dealStatus={oldChatDealStatus}
            bookStatus={oldChatBookStatus}
          />
        </div>
      )}
    </div>
  );
};

export default SmallChatWindow;
