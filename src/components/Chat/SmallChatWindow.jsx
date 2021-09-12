import React, { useEffect, useState, useRef } from "react";
import { fb } from "../../services";
import { ChatContent } from "./ChatContent";

const SmallChatWindow = ({ currentChat, oldChat1, forceUpdate }) => {
  const [currentChatDealStatus, setCurrentChatDealStatus] = useState();
  const [currentChatBookStatus, setCurrentChatBookStatus] = useState();

  // const [currentChatLastDoc, setCurrentChatLastDoc] = useState(null);
  const [currentChatMessages, setCurrentChatMessages] = useState([]);

  let currentChatLastDoc = null;
  let currentChatMessagesList = [];

  const [oldChatDealStatus, setOldChatDealStatus] = useState();
  const [oldChatBookStatus, setOldChatBookStatus] = useState();

  // const [oldChatLastDoc, setOldChatLastDoc] = useState(null);
  const [oldChatMessages, setOldChatMessages] = useState([]);

  let oldChatLastDoc = null;
  let oldChatMessagesList = [];

  const currentChatMessageEl = useRef(null);
  const currentChatMessagesEndRef = useRef(null);

  const oldChatMessageEl = useRef(null);
  const oldChatMessagesEndRef = useRef(null);

  const [chat1, setChat1] = useState(null);
  const [chat2, setChat2] = useState(null);
  useEffect(() => {
    fb.firestore
      .collection("conversations")
      .doc(currentChat?.id + "")
      .onSnapshot((snap) => {
        let data = snap.data();
        setCurrentChatDealStatus(
          data?.deal === "accepted" || data?.deal === "pending" ? true : false
        );
        setCurrentChatBookStatus(
          !!data?.appointment ? data.appointment : "none"
        );
        setChat1({
          id: snap.id,
          data: data,
        });
      });
    fb.firestore
      .collection("conversations")
      .doc(oldChat1?.id + "")
      .onSnapshot((snap) => {
        let data = snap.data();
        setOldChatDealStatus(
          data?.deal === "accepted" || data?.deal === "pending" ? true : false
        );
        setOldChatBookStatus(!!data?.appointment ? data.appointment : "none");
        setChat2({
          id: snap.id,
          data: data,
        });
      });
  }, [currentChat?.id, oldChat1?.id]);

  // useEffect(() => {

  // }, [oldChat1]);
  return (
    <div className="small-chat-windows">
      {currentChat && (
        <div
          className={oldChat1 ? "small-chat-window-1" : "small-chat-window-2"}
        >
          <ChatContent
            currentChat={chat1}
            forceUpdate={forceUpdate}
            dealStatus={currentChatDealStatus}
            bookStatus={currentChatBookStatus}
            setBookStatus={setOldChatBookStatus}
            lastDoc={currentChatLastDoc}
            currentMessagesList={currentChatMessagesList}
            messageEl={currentChatMessageEl}
            messagesEndRef={currentChatMessagesEndRef}
            messages={currentChatMessages}
            setMessages={setCurrentChatMessages}
          />
        </div>
      )}
      {oldChat1 && (
        <div className="small-chat-window-2">
          <ChatContent
            currentChat={chat2}
            forceUpdate={forceUpdate}
            dealStatus={oldChatDealStatus}
            bookStatus={oldChatBookStatus}
            setBookStatus={setCurrentChatBookStatus}
            lastDoc={oldChatLastDoc}
            currentMessagesList={oldChatMessagesList}
            messageEl={oldChatMessageEl}
            messagesEndRef={oldChatMessagesEndRef}
            messages={oldChatMessages}
            setMessages={setOldChatMessages}
          />
        </div>
      )}
    </div>
  );
};

export default SmallChatWindow;
