import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TelegramIcon from "@material-ui/icons/Telegram";
import { fb } from "../../services";
import firebase from "firebase/app";
import { MessageContainer } from "./MessageContainer";
import { SortByAlpha } from "@material-ui/icons";
import { BuyerInfoBox } from "./BuyerInfoBox";
import moment from "moment";
import "moment/locale/vi";

export const SellerChatContainer = ({ real }) => {
  const chats = real.data.chats;
  const uuid = fb.auth.currentUser.uid;
  const username = fb.auth.currentUser.displayName;
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    const unsubscribe = fb.firestore
      .collection("conversations")
      // .where(firebase.firestore.FieldPath.documentId(), "in", chats)
      .where("realId", "==", real.data.id)
      .onSnapshot((snap) => {
        setConversations(
          snap.docs
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
            .filter(
              (e) =>
                e.data.lastMessage !== "" && e.data.lastMessage !== undefined
            )
        );
      });

    return () => {
      unsubscribe();
    };
  }, [real]);

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
              <div key={chat.id}>
                <div
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                  className={
                    chat.id === selectedChat?.id
                      ? "buyer-info-selected"
                      : "buyer-info-notselected"
                  }
                >
                  <p className="buyer-info-name">{chat.data.buyer}</p>
                  {chat.data?.deal === undefined && (
                    <p className="buyer-info-deal">Chưa có thỏa thuận</p>
                  )}
                  {chat.data?.deal === "pending" && (
                    <p className="buyer-info-deal">
                      {chat.data?.dealPrice} tỷ (đang chờ)
                    </p>
                  )}
                  {chat.data?.deal === "refused" && (
                    <p className="buyer-info-deal">
                      {chat.data?.dealPrice} tỷ (từ chối)
                    </p>
                  )}
                  {chat.data?.deal === "accepted" && (
                    <p className="buyer-info-deal">
                      {chat.data?.dealPrice} tỷ (chấp nhận)
                    </p>
                  )}
                  <p className="buyer-info-lastmessage">
                    {chat.data.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="seller-chat-box-body">
            {selectedChat && (
              <>
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
                        fb.firestore
                          .collection("conversations")
                          .doc(selectedChat.id)
                          .update({
                            lastMessage: currentInput,
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

                <BuyerInfoBox selectedChat={selectedChat} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
