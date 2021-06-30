import React, { useEffect, useState, useRef, useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";

export const MessageContainer = ({ conversation }) => {
  const uuid = fb.auth.currentUser.uid;
  const username = fb.auth.currentUser.displayName;
  const [messages, setMessages] = useState([]);
  const { role } = useContext(Context);
  const [dealId, setDealId] = useState();

  // const [deals, setDeals] = useState([]);
  // const [appointments, setAppointments] = useState([]);
  const messageEl = useRef(null);
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
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .onSnapshot((doc) => {
          setDealId(doc.data().dealId);
        });
    }
  }, [conversation, uuid]);

  const handleAccept = () => {
    if (dealId) {
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .doc(dealId)
        .update({
          status: "accepted",
        })
        .then(() => {
          fb.firestore.collection("conversations").doc(conversation.id).update({
            deal: "accepted",
          });
        });
    }
  };
  const handleRefuse = () => {
    if (dealId) {
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .doc(dealId)
        .update({
          status: "refused",
        })
        .then(() => {
          fb.firestore.collection("conversations").doc(conversation.id).update({
            deal: "refused",
          });
        });
    }
  };
  return (
    <div className="chat_window_container_message_box_display" ref={messageEl}>
      {messages.map((message) => (
        <div
          className={`message ${message.sender === username && "message_send"}`}
        >
          {message.message ? (
            <p>{message.message}</p>
          ) : (
            <div className="deal_message">
              Thỏa thuận
              <p>giá {message.deal} tỷ</p>
              {role === "buyer" && (
                <div>
                  {message.status === "pending" && <div>đang chờ trả lời</div>}
                  {message.status === "accepted" && <div>đã chấp nhận</div>}
                  {message.status === "refused" && <div>đã từ chối</div>}
                  {message.status === "cancel" && <div>đã hủy</div>}
                </div>
              )}
              {role === "seller" && (
                <div>
                  {message.status === "pending" && (
                    <div>
                      <button onClick={handleAccept}>đồng ý</button>
                      <button onClick={handleRefuse}>từ chối</button>
                    </div>
                  )}
                  {message.status === "accepted" && <div>đã chấp nhận</div>}
                  {message.status === "refused" && <div>đã từ chối</div>}
                  {message.status === "cancel" && <div>đã hủy</div>}
                </div>
              )}
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
