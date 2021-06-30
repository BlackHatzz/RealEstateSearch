import React, { useState, useEffect, useContext } from "react";
import { Form, Formik } from "formik";
import { defaultValues, validationSchema } from "./formikDealConfig";
import TelegramIcon from "@material-ui/icons/Telegram";
import { ChatWindowHeader } from "./ChatWindowHeader";
import { fb } from "../../services";
import { Contact } from "./Contact";
import { MessageContainer } from "./MessageContainer";
import firebase from "firebase";
import { Context } from "../../ChatContext";
import { FormField } from "../FormField";
import { v4 as uuidv4 } from "uuid";
import Appointment from "./Appointment";
import "../global/shared.css";
import { BsChevronDoubleLeft } from "react-icons/bs";
// import SendIcon from '@material-ui/icons/Send';

export const ChatWindow = ({ onClickChat, conversations }) => {
  const { role, chatId } = useContext(Context);
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState();
  const username = fb.auth.currentUser.displayName;
  const [dealId, setDealId] = useState();
  // const [appointments, setAppointments] = useState([]);
  const [dealtrigger, setDealtrigger] = useState(false);
  const [booktrigger, setBooktrigger] = useState(false);
  useEffect(() => {
    const index = conversations.findIndex((e) => e.id === chatId);
    if (index > -1) {
      setCurrentChat(conversations[index]);
    }
    setDealId(uuidv4());
  }, [chatId, conversations]);
  function submitDeal({ deal }, { setSubmitting }) {
    fb.firestore
      .collection("conversations")
      .doc(currentChat.id)
      .collection("messages")
      .doc(dealId)
      .set({
        deal: deal,
        sender: username,
        status: "pending",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        fb.firestore
          .collection("conversations")
          .doc(currentChat.id)
          .update(
            {
              deal: "pending",
              dealId: dealId + "",
            }
            // { merge: true }
          );

        setDealtrigger((value) => !value);
      })
      .finally(() => setSubmitting(false));
  }

  const sendMessage = (e) => {
    e.preventDefault();
    fb.firestore
      .collection("conversations")
      .doc(currentChat.id)
      .collection("messages")
      .add({
        message: input,
        sender: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };
  const handleDeal = () => {
    setDealtrigger((value) => !value);
  };
  const handleBook = () => {
    setBooktrigger((value) => !value);
  };
  return (
    <div className="chat_window">
      <ChatWindowHeader onClickChat={onClickChat} />
      <div className="chat_window_container">
        <div className="chat_window_container_right_box">
          {currentChat ? (
            <div key={currentChat.id} className="chat_window_container_message_box">
              {/* <div className="chat_window_container_message_box_display_realestate">
                <div className="chat_window_container_message_box_display_realestate_image">
                  <img
                    src="https://file4.batdongsan.com.vn/crop/350x232/2021/06/13/20210613112547-abeb_wm.jpg"
                    alt=""
                  />
                </div>
                <div className="chat_window_container_message_box_display_realestate_info">
                  <div className="chat_window_container_message_box_display_realestate_info_title">
                    {currentChat.data.title}
                  </div>
                  <p>
                    {currentChat.data.price} tỷ - {currentChat.data.bed} PN -{" "}
                    {currentChat.data.bath} WC
                  </p>
                </div>
              </div>
              <MessageContainer conversation={currentChat} />
              <div className="chat_window_container_message_box_popup">
                {dealtrigger && (
                  <Formik
                    onSubmit={submitDeal}
                    validateOnMount={true}
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                  >
                    {({ isValid, isSubmitting }) => (
                      <Form>
                        <p>Giá gốc: {currentChat.data.price} tỷ</p>
                        <FormField name="deal" />
                        <button
                          disabled={isSubmitting || !isValid}
                          type="submit"
                        >
                          gửi
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
                {booktrigger && (
                  <Appointment
                    trigger={booktrigger}
                    setTrigger={setBooktrigger}
                    conversation={currentChat}
                  />
                )}
              </div>
              <div className="chat_window_container_message_box_input">
                <div>
                  {role === "buyer" && (
                    <div>
                      <button
                        disabled={
                          currentChat.data.deal === "refused" ||
                          currentChat.data.deal === "none"
                            ? false
                            : true
                        }
                        onClick={handleDeal}
                        type="button"
                      >
                        Thỏa thuận
                      </button>
                      <button
                        disabled={
                          currentChat.data.appointment === "upcoming"
                            ? true
                            : false
                        }
                        onClick={handleBook}
                      >
                        Đặt lịch
                      </button>
                    </div>
              </div> */}
              <MessageContainer conversation={currentChat} dealId={dealId} />
              <div className="chat_window_container_message_box_input">
                <div>
                  {dealtrigger && (
                    <Formik
                      onSubmit={submitDeal}
                      validateOnMount={true}
                      initialValues={defaultValues}
                      validationSchema={validationSchema}
                    >
                      {({ isValid, isSubmitting }) => (
                        <Form>
                          <p>Giá gốc: {currentChat.data.price} tỷ</p>
                          <FormField name="deal" />
                          <button
                            disabled={isSubmitting || !isValid}
                            type="submit"
                          >
                            gửi
                          </button>
                        </Form>
                      )}
                    </Formik>
                  )}
                  {booktrigger && (
                  <Appointment
                    trigger={booktrigger}
                    setTrigger={setBooktrigger}
                    conversation={currentChat}
                  />
                )}
                </div>

                <div>
                  {role === "buyer" && (
                    <div className="interact-box">
                    <button
                      className="primary-box deal-button"
                      disabled={
                        currentChat.data.deal === "pending" ? true : false
                      }
                      onClick={handleDeal}
                      type="button"
                    >
                      {console.log(
                        currentChat.data.deal === "pending" ? true : false
                      )}
                      Thỏa thuận
                    </button>
                    <button
                    className="primary-box deal-button"
                        disabled={
                          currentChat.data.appointment === "upcoming"
                            ? true
                            : false
                        }
                        onClick={handleBook}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  )}
                </div>

                <form className="send-message-container" onSubmit={sendMessage}>
                  <div className="chat-field-container">
                    <input
                      className="chat-field"
                      value={input}
                      onChange={(event) => {
                        setInput(event.target.value);
                      }}
                      type="text"
                      placeholder="Gửi tin nhắn..."
                    />
                  </div>

                  <button className="button_send_message" type="submit">
                    <TelegramIcon className="send-message-icon" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div> Xin chào </div>
          )}
        </div>
        <div className="chat_window_container_contact_box">
          <div className="chat_window_container_contact_list">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setCurrentChat(conversation);
                  // refesh item list
                  const list = document.getElementsByClassName("right-content-container");
                  console.log("outtttt");
                  for(var i = 0; i < list.length; i++) {
                    list[i].style.backgroundColor = "white";
                    console.log("yahooo");
                  }
                  const selectedItem = document.getElementById(conversation.id);
                  selectedItem.style.backgroundColor = "#dadde2";
                }}
              >
                <Contact
                  // key={conversation.id}
                  id={conversation.id}
                  data={conversation.data}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
