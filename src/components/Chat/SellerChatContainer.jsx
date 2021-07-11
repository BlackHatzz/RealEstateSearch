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
  const [currentInput, setCurrentInput] = useState("");

  const getConversations = () => {
    fb.firestore
      .collection("conversations")
      .where(firebase.firestore.FieldPath.documentId(), "in", chats)
      .onSnapshot((snap) => {
        setConversations(
          snap.docs
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
            .filter((e) => e.data.lastMessage !== "")
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
      {conversations.length === 0 && <div>Chưa có người mua liên lạc</div>}
      {conversations.length > 0 && (
        <div className="seller-left-chat-box">
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

          <div className="seller-chat-box-body">
            <div className="seller-chat-box-body-left">
              <MessageContainer
                conversation={selectedChat}
                handleBook={() => {}}
              />
              <div className="chat_window_container_message_box_input">
                <form
                  className="message-input-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    let docref = fb.firestore
                      .collection("conversations")
                      .doc(selectedChat.id)
                      .collection("messages")
                      .doc();
                    docref
                      .set({
                        id: docref.id,
                        type: "text",
                        message: currentInput,
                        sender: username,
                        timestamp:
                          firebase.firestore.FieldValue.serverTimestamp(),
                        senderId: uuid,
                      })
                      .finally(() => {
                        setCurrentInput("");
                      });
                  }}
                >
                  <textarea
                    maxLength="2000"
                    className="textarea-input"
                    autoComplete="off"
                    value={currentInput}
                    onChange={(e) => {
                      setCurrentInput(e.target.value);
                      const target = e.target;
                      target.style.height = "20px";
                      // target.style.height = `${target.scrollHeight}px`;
                      target.style.height = `${Math.min(
                        target.scrollHeight,
                        80
                      )}px`;
                    }}
                    placeholder="Gửi tin nhắn ..."
                  />

                  <button
                    className="button_send_message"
                    type="submit"
                    disabled={currentInput === "" ? true : false}
                  >
                    <TelegramIcon className="send-message-icon" />
                  </button>
                </form>
              </div>
            </div>
            <div className="seller-chat-box-body-right">
              {selectedChat?.data?.dealPrice === undefined && (
                <p>khong co deal</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
