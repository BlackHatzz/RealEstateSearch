import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";

export const MessageContainer = ({ conversation, handleBook }) => {
  const uuid = fb.auth.currentUser.uid;
  const username = fb.auth.currentUser.displayName;
  const [messages, setMessages] = useState([]);
  const { role } = useContext(Context);
  const [dealId, setDealId] = useState();
  const [bookId, setBookId] = useState();

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
          setBookId(doc.data().appointmentId);
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

  const handelCancelAppointment = () => {
    if (bookId) {
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .doc(bookId)
        .update({
          status: "cancel",
        })
        .then(() => {
          fb.firestore.collection("conversations").doc(conversation.id).update({
            appointment: "cancel",
          });
        });

      fb.firestore
        .collection("users")
        .doc(uuid)
        .collection("appointments")
        .doc(bookId)
        .update({
          status: "cancel",
        });

      fb.firestore
        .collection("users")
        .doc(conversation.data.sellerId)
        .collection("appointments")
        .doc(bookId)
        .update({
          status: "cancel",
        });
    }
  };
  const handleCancelDeal = () => {
    if (dealId) {
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .doc(dealId)
        .update({
          status: "cancel",
        })
        .then(() => {
          fb.firestore.collection("conversations").doc(conversation.id).update({
            deal: "cancel",
          });
        });
    }
  };

  return (
    <div className="chat_window_container_message_box_display" ref={messageEl}>
      {messages.map((message) => (
        <div
          className={`message ${
            message.sender === username ? "message_send" : "message-receive"
          }`}
        >
          {message.message && <p>{message.message}</p>}
          {message.deal && (
            <div className="deal_message">
              <p>Thỏa thuận</p>
              <p>Giá {message.deal} tỷ</p>
              {role === "buyer" && (
                <div>
                  {message.status === "pending" && (
                    <div className="buyer-deal-message">
                      <p>đang chờ trả lời</p>
                      <button onClick={handleCancelDeal}>Hủy</button>
                    </div>
                  )}
                  {message.status === "accepted" && (
                    <div className="buyer-deal-message">
                      <p>đã được chấp nhận</p>
                      <button
                        disabled={
                          conversation.data.appointment === "upcoming"
                            ? true
                            : false
                        }
                        onClick={handleBook}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  )}
                  {message.status === "refused" && <div>đã bị từ chối</div>}
                  {message.status === "cancel" && <div>đã hủy</div>}
                </div>
              )}
              {role === "seller" && (
                <div className="seller-deal-message">
                  {message.status === "pending" && (
                    <div className="seller-deal-message-pending-button">
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
          {message.appointment && (
            <div>
              {role === "buyer" && (
                <div>
                  {message.status === "upcoming" && (
                    <div className="buyer-appointment-message-upcoming">
                      <p>Lịch hẹn sắp tới</p>
                      <p>
                        {moment(message.appointment)
                          .locale("vi")
                          .format("LLLL")}
                      </p>
                      <button onClick={handelCancelAppointment}>Hủy</button>
                    </div>
                  )}
                  {message.status === "cancel" && <div>Lịch hẹn đã hủy</div>}
                </div>
              )}
              {role === "seller" && (
                <div>
                  <div>
                    {message.status === "upcoming" && (
                      <div>
                        <p>Lịch hẹn sắp tới</p>
                        {moment(message.appointment)
                          .locale("vi")
                          .format("LLLL")}
                      </div>
                    )}
                    {message.status === "cancel" && <div>Lịch hẹn đã hủy</div>}
                  </div>
                </div>
              )}
            </div>
          )}
          <span
            className={`message_name ${
              message.sender === username
                ? "message_name_send"
                : "message_name_receive"
            }`}
          >
            {message.sender}
          </span>
        </div>
      ))}
    </div>
  );
};
