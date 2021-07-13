import { LensTwoTone } from "@material-ui/icons";
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

  const [refuseInput, setRefuseInput] = useState("");
  const [refuseInputTrigger, setRefuseInputTrigger] = useState(false);
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
    let getMessages = () => {};
    let setInfo = () => {};
    if (conversation) {
      getMessages = fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));

      setInfo = fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .onSnapshot((doc) => {
          setDealId(doc.data().dealId);
          setBookId(doc.data().appointmentId);
        });
    }
    return () => {
      getMessages();
      setInfo();
    };
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

          fb.firestore.collection("conversations").doc(conversation.id).update({
            lastMessage: "chấp nhận thỏa thuận",
          });
        });
    }
  };
  const handleRefuse = (e) => {
    e.preventDefault();
    if (dealId !== undefined) {
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .doc(dealId)
        .update({
          status: "refused",
          reason: refuseInput,
        })
        .then(() => {
          fb.firestore.collection("conversations").doc(conversation.id).update({
            deal: "refused",
            dealReason: refuseInput,
          });

          fb.firestore.collection("conversations").doc(conversation.id).update({
            lastMessage: refuseInput,
          });
          setRefuseInputTrigger(false);
          setRefuseInput("");
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

      fb.firestore.collection("conversations").doc(conversation.id).update({
        lastMessage: "lịch hẹn đã hủy",
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
          key={message.id}
          className={`message ${
            message.sender === username ? "message_send" : "message-receive"
          }`}
        >
          {message.message && <p>{message.message}</p>}
          {message.deal && (
            <div className="deal_message">
              {role === "buyer" && (
                <div>
                  {message.status === "pending" && (
                    <div className="buyer-deal-message">
                      <p>Thỏa thuận</p>
                      <p>Giá {message.deal} tỷ</p>
                      <p>đang chờ trả lời</p>
                      <button onClick={handleCancelDeal}>Hủy</button>
                    </div>
                  )}
                  {message.status === "accepted" && (
                    <div className="buyer-deal-message">
                      <p>Thỏa thuận</p>
                      <p>Giá {message.deal} tỷ</p>
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
                  {message.status === "refused" && (
                    <div>
                      thỏa thuận bị từ chối
                      <p>Lý do: {message?.reason}</p>
                    </div>
                  )}
                  {message.status === "cancel" && <div>Thỏa thuận đã hủy</div>}
                </div>
              )}

              {role === "seller" && (
                <div className="seller-deal-message">
                  {message.status === "pending" && (
                    <div className="seller-deal-message-pending">
                      <p>Thỏa thuận</p>
                      <p>Giá {message.deal} tỷ</p>
                      {refuseInputTrigger ? (
                        <form onSubmit={(e) => handleRefuse(e)}>
                          <input
                            onChange={(e) => {
                              setRefuseInput(e.target.value);
                            }}
                            value={refuseInput}
                            type="text"
                            maxLength="30"
                            size="22"
                            placeholder="lý do từ chối ( tối đa 30 ký tự )"
                            required
                          />
                          <button
                            type="submit"
                            disabled={refuseInput === "" ? true : false}
                          >
                            chấp nhận
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRefuseInputTrigger(false);
                            }}
                          >
                            hủy
                          </button>
                        </form>
                      ) : (
                        <div className="seller-deal-message-pending-button">
                          <button onClick={handleAccept}>đồng ý</button>
                          <button
                            onClick={() => {
                              setRefuseInputTrigger(true);
                            }}
                          >
                            từ chối
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {message.status === "accepted" && (
                    <div>Bạn đã chấp nhận thỏa thuận giá {message.deal} tỷ</div>
                  )}
                  {message.status === "refused" && (
                    <div>
                      đã từ chối thỏa thuận
                      <p>Lý do: {message?.reason}</p>
                    </div>
                  )}
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
