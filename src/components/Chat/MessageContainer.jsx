import React, { useEffect, useState, useRef } from "react";
import { fb } from "../../services";

export const MessageContainer = ({ conversation }) => {
  const uuid = fb.auth.currentUser.uid;
  const username = fb.auth.currentUser.displayName;
  const [messages, setMessages] = useState([]);
  // const [deals, setDeals] = useState([]);
  // const [appointments, setAppointments] = useState([]);
  const messageEl = useRef(null);
  console.log("id :" + conversation.id);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  useEffect(() => {
    if (conversation) {
      // fb.firestore
      //   .collection("users")
      //   .doc(uuid)
      //   .collection("conversations")
      //   .doc(conversation.id)
      //   .onSnapshot((snapshot) => {
      //     setTitle(snapshot.data().title);
      //     setSellerName(snapshot.data().seller);
      //     setBuyerName(snapshot.data().buyer);
      //   });

      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [conversation, uuid]);
  return (
    <div className="chat_window_container_message_box_display" ref={messageEl}>
      {messages.map((message) => (
        <div
          className={`message ${message.sender === username && "message_send"}`}
        >
          {message.message ? (
            message.message
          ) : (
            <div className="deal_message">
              Thỏa thuận
              <p>giá {message.deal} tỷ</p>
              {message.status === "pending" && <div>đang chờ trả lời</div>}
              {message.status === "accepted" && <div>đang chờ trả lời</div>}
              {message.status === "refused" && <div>đang chờ trả lời</div>}
            </div>
          )}
          <span
            className={`message_name ${
              message.sender === username && "message_name_send"
            }`}
          >
            {message.sender}
          </span>
        </div>
      ))}
    </div>
  );
};
