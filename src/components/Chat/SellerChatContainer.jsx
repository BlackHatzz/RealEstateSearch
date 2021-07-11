import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TelegramIcon from "@material-ui/icons/Telegram";
import { fb } from "../../services";
import firebase from "firebase/app";
import { MessageContainer } from "./MessageContainer";
export const SellerChatContainer = ({ real }) => {
  const chats = real.data.chats;
  const uuid = fb.auth.currentUser.uid;
  const username = fb.auth.currentUser.displayName;
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState();

  const getConversations = () => {
    fb.firestore
      .collection("conversations")
      .where(firebase.firestore.FieldPath.documentId(), "in", chats)
      .onSnapshot((snap) => {
        setConversations(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };

  useEffect(() => {
    getConversations();
  }, [chats]);

  return (
    <div className="seller-chat-box">
      <div className="real-title">
        <p>{real.data.title}</p>
      </div>
      {conversations && (
        <div className="buyer-select-box">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
              }}
              className={
                chat.id === selectedChat?.id
                  ? "buyer-info-selected"
                  : "buyer-info-notselected"
              }
            >
              {chat.data.buyer}
            </div>
          ))}
        </div>
      )}
      <div className="seller-chat-box-body">
        <div className="seller-chat-box-body-left">
          <MessageContainer conversation={selectedChat} handleBook={() => {}} />
          <div className="chat_window_container_message_box_input">
            <Formik
              onSubmit={(values, { setSubmitting, resetForm }) => {
                fb.firestore
                  .collection("conversations")
                  .doc(selectedChat.id)
                  .collection("messages")
                  .add({
                    type: "text",
                    message: values.Input,
                    sender: username,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    senderId: uuid,
                  })
                  .finally(() => {
                    resetForm({ values: "" });
                    setSubmitting(false);
                  });
              }}
              // validateOnMount={true}
              initialValues={{ Input: "" }}
              validationSchema={Yup.object({
                Input: Yup.string().required().max(1000),
              })}
            >
              {({
                isValid,
                isSubmitting,
                resetForm,
                handleSubmit,
                values,
                handleChange,
              }) => (
                <Form
                  className="send-message-container"
                  onSubmit={handleSubmit}
                >
                  <div className="chat-field-container">
                    <input
                      maxlength="1000"
                      className="chat-field"
                      autoComplete="off"
                      id="Input"
                      value={values.Input}
                      onChange={handleChange}
                      type="text"
                      placeholder="Gửi tin nhắn..."
                    />
                  </div>
                  <button
                    className="button_send_message"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    <TelegramIcon className="send-message-icon" />
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="seller-chat-box-body-right"></div>
      </div>
    </div>
  );
};
