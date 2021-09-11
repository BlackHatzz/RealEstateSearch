import { LensTwoTone } from "@material-ui/icons";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import firebase from "firebase";

export const MessageContainer = ({
  conversation,
  handleBook,
  setBookStatus,
  bookStatus,
  isNewMessage,
  setIsNewMessage,
  lastDoc,
  currentMessagesList,
  messageEl,
  messagesEndRef,
}) => {
  const uuid = fb.auth.currentUser?.uid;
  const username = fb.auth.currentUser?.displayName;
  const [messages, setMessages] = useState([]);
  const { role } = useContext(Context);
  const [dealId, setDealId] = useState();
  const [bookId, setBookId] = useState();

  const [refuseInput, setRefuseInput] = useState("");
  const [refuseInputTrigger, setRefuseInputTrigger] = useState(false);
  const currentDate = new Date();

  // const messageEl = useRef(null);
  // const messagesEndRef = useRef(null);
  // let lastDoc = null;
  // let currentMessagesList = [];

  useEffect(() => {
    setIsNewMessage(true);

    if (conversation) {
      fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .onSnapshot((doc) => {
          setDealId(doc.data()?.dealId);
          setBookId(doc.data()?.appointmentId);
        });

      getMessages();
    }
  }, [conversation.id, uuid]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };
  useEffect(() => {
    // scrollToBottom();
    if (isNewMessage) {
      scrollToBottom();
    } else {
      document
        .getElementById("chat-window-message-box" + conversation.id)
        .scrollTo(0, 200);
    }
    // else {
    //   // if (scrollDoc) {
    //   //   console.log("sc", scrollDoc);
    //   //   let myElement = document?.getElementById(scrollDoc?.id);
    //   //   // let topPos = myElement.offsetTop;
    //   //   // document.getElementById("chat-window-message-box").scrollTop = topPos;
    //   //   myElement?.scrollIntoView({ behavior: "auto" });
    //   // }
    // }
  }, [messages]);

  const handleLoadOnScroll = (event) => {
    const { currentTarget: target } = event;

    if (target.scrollTop === 0) {
      setIsNewMessage(false);
      fetchMoreMessages();
    }
  };
  const getMessages = () => {
    const ref = fb.firestore
      .collection("conversations")
      .doc(conversation.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(5);
    ref.onSnapshot((snap) => {
      let docs = snap.docs;
      let previousDoc = docs[docs.length - 1];
      let messagesList = docs.map((doc) => doc.data()).reverse();

      setMessages(messagesList);
      currentMessagesList = messagesList;
      lastDoc = previousDoc;
    });
  };

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("scroll", handleLoadOnScroll);
    }
  }, []);

  const fetchMoreMessages = () => {
    console.log(lastDoc);
    if (!!lastDoc?.id) {
      const ref = fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .startAfter(lastDoc)
        .limit(5);

      ref.get().then((snap) => {
        let docs = snap?.docs;

        if (docs.length) {
          console.log("docs", docs.length);
          console.log("st", lastDoc);
          let previousDoc = docs[docs.length - 1];
          let messagesList = docs.map((doc) => doc.data()).reverse();
          let newList = [...messagesList, ...currentMessagesList];
          setMessages(newList);
          currentMessagesList = newList;
          lastDoc = previousDoc;
        } else {
          messageEl.current.removeEventListener("scroll", handleLoadOnScroll);
        }
      });
    }
  };

  const handleAccept = (message) => {
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
            lastMessage: "chấp nhận thỏa thuận",
            lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessageReadStaff: false,
            deal: "accepted",
          });

          fetch("https://api-realestate.top/apis/apis/deals/create", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              conversationId: conversation.id,
              createAt: currentDate.toISOString(),
              id: message.id,
              offeredPrice: message.deal,
              status: "accepted",
            }),
          }).then((response) => {
            console.log(response);
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
            lastMessageReadStaff: false,
            lastMessage: refuseInput,
          });

          setRefuseInputTrigger(false);
          setRefuseInput("");
        });
    }
  };

  const handelCancelAppointment = () => {
    console.log("cancel click", bookId);
    if (bookId) {
      let batch = fb.firestore.batch();
      let messageRef = fb.firestore
        .collection("conversations")
        .doc(conversation.id)
        .collection("messages")
        .doc(bookId);

      batch.update(messageRef, {
        status: "cancel",
      });

      let conversationRef = fb.firestore
        .collection("conversations")
        .doc(conversation.id);

      batch.update(conversationRef, {
        appointment: "cancel",
        lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessageReadStaff: false,
        lastMessage: "lịch hẹn đã bị hủy",
      });
      let buyerBookRef = fb.firestore
        .collection("users")
        .doc(uuid)
        .collection("appointments")
        .doc(bookId);

      batch.update(buyerBookRef, {
        status: "cancel",
      });
      let staffBookRef = fb.firestore
        .collection("users")
        .doc(conversation.data.staffId)
        .collection("appointments")
        .doc(bookId);

      batch.update(staffBookRef, {
        status: "cancel",
      });

      batch.commit().then(() => {
        console.log("cancel appointment batch commit finished");
      });
      setBookStatus("cancel");
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
            lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessageReadStaff: false,
            lastMessage: "Thỏa thuận đã bị hủy",
          });
        });
    }
  };

  return (
    <div
      id={"chat-window-message-box" + conversation.id}
      className="chat_window_container_message_box_display"
      ref={messageEl}
    >
      {messages.map((message) => (
        <div
          id={message.id}
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
                      {bookStatus !== "upcoming" && (
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
                      )}
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
                          <button onClick={() => handleAccept(message)}>
                            đồng ý
                          </button>
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
                      <button
                        onClick={() => handelCancelAppointment(message.id)}
                      >
                        Hủy
                      </button>
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
      <div ref={messagesEndRef} />
    </div>
  );
};
