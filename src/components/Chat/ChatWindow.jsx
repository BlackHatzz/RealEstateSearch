import React, { useState, useEffect, useContext, useRef } from "react";
import * as Yup from "yup";
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
import { SellerChatItem } from "./SellerChatItem";
import { SellerChatContainer } from "./SellerChatContainer";

// import SendIcon from '@material-ui/icons/Send';

export const ChatWindow = ({ onClickChat, conversations, reals }) => {
  const { role, chatId, updateChat, chatRealId, updateChatRealId } =
    useContext(Context);

  const [currentChat, setCurrentChat] = useState();
  const [currentReal, setCurrentReal] = useState();
  const username = fb.auth.currentUser.displayName;
  const uuid = fb.auth.currentUser.uid;
  const [dealId, setDealId] = useState();
  const [dealtrigger, setDealtrigger] = useState(false);
  const [booktrigger, setBooktrigger] = useState(false);
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    return () => {
      if (role === "buyer") {
        const index = conversations.findIndex((e) => e.id === chatId);
        if (index > -1) {
          setCurrentChat(conversations[index]);
        }
        setDealId(uuidv4());
      }
      if (role === "seller") {
        const index = reals.findIndex((e) => e.id === chatRealId);
        if (index > -1) {
          setCurrentReal(reals[index]);
        }
      }
    };
  }, [chatId, chatRealId, conversations, reals, role]);

  function submitDeal({ deal }, { setSubmitting }) {
    fb.firestore
      .collection("conversations")
      .doc(currentChat.id)
      .collection("messages")
      .doc(dealId)
      .set({
        id: dealId,
        type: "deal",
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
              dealPrice: deal,
            }
            // { merge: true }
          );
        fb.firestore.collection("conversations").doc(currentChat.id).update({
          lastMessage: "thỏa thuận",
        });
        setDealtrigger((value) => !value);
      })
      .finally(() => setSubmitting(false));
  }

  const handleDeal = () => {
    setBooktrigger(false);
    setDealtrigger((value) => !value);
  };
  const handleBook = () => {
    setDealtrigger(false);
    setBooktrigger((value) => !value);
  };

  return (
    <div className="chat_window">
      <ChatWindowHeader onClickChat={onClickChat} />
      <div className="chat_window_container">
        <div className="chat_window_container_left_box">
          {currentChat && (
            <div
              key={currentChat.id}
              className="chat_window_container_message_box"
            >
              <div className="chat_window_container_message_box_display_realestate">
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
                  <p>{currentChat.data.address}</p>
                  <p>
                    {currentChat.data.price} tỷ - {currentChat.data.bed} PN -{" "}
                    {currentChat.data.bath} WC
                  </p>
                </div>
              </div>
              <MessageContainer
                conversation={currentChat}
                handleBook={handleBook}
              />
              {(dealtrigger || booktrigger) && (
                <div className="chat_window_container_message_box_popup">
                  {dealtrigger && (
                    <Formik
                      onSubmit={submitDeal}
                      validateOnMount={true}
                      initialValues={defaultValues}
                      validationSchema={validationSchema}
                    >
                      {({ isValid, isSubmitting, errors }) => (
                        <Form className="deal-form">
                          <p>Giá gốc: {currentChat.data.price} tỷ</p>
                          <FormField
                            name="deal"
                            placeholder={currentChat.data.price}
                            maxlength="4"
                            size="4"
                            label="Thỏa thuận (tỷ VNĐ): "
                          />

                          <div className="deal-form-button">
                            <button
                              disabled={isSubmitting || !isValid}
                              type="submit"
                            >
                              Gửi
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDealtrigger((value) => !value);
                              }}
                            >
                              Hủy
                            </button>
                          </div>
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
              )}

              <div className="chat_window_container_message_box_input">
                {role === "buyer" && (
                  <div className="interact-box">
                    <button
                      className="deal-button"
                      disabled={
                        currentChat.data.deal === "refused" ||
                        currentChat.data.deal === "none" ||
                        currentChat.data.deal === "cancel" ||
                        currentChat.data.deal === undefined
                          ? false
                          : true
                      }
                      onClick={handleDeal}
                      type="button"
                    >
                      Thỏa thuận
                    </button>
                  </div>
                )}

                <form
                  className="message-input-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    let docref = fb.firestore
                      .collection("conversations")
                      .doc(currentChat.id)
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
                      .doc(currentChat.id)
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
          )}
          {currentReal && <SellerChatContainer real={currentReal} />}
        </div>
        <div className="chat_window_container_contact_box">
          {role === "buyer" && (
            <div className="chat_window_container_contact_list">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setCurrentChat(conversation);
                    // updateChat(conversation.id);
                    setBooktrigger(false);
                    setDealtrigger(false);
                  }}
                >
                  <Contact
                    currentChat={currentChat}
                    // key={conversation.id}
                    id={conversation.id}
                    data={conversation.data}
                  />
                </div>
              ))}
            </div>
          )}
          {role === "seller" && (
            <div className="chat_window_container_contact_list">
              {reals.map((real) => (
                <div
                  key={real.id}
                  onClick={() => {
                    // updateChatRealId(real.id);
                    setCurrentReal(real);
                  }}
                >
                  <SellerChatItem
                    currentReal={currentReal}
                    id={real.id}
                    data={real.data}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
