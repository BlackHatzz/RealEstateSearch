import React, { useState, useEffect, useContext } from "react";
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

// import SendIcon from '@material-ui/icons/Send';

export const ChatWindow = ({ onClickChat, conversations, reals }) => {
  const { role, chatId, updateChat } = useContext(Context);
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState();
  const username = fb.auth.currentUser.displayName;
  const uuid = fb.auth.currentUser.uid;
  const [dealId, setDealId] = useState();
  // const [appointments, setAppointments] = useState([]);
  const [dealtrigger, setDealtrigger] = useState(false);
  const [booktrigger, setBooktrigger] = useState(false);

  useEffect(() => {
    if (role === "buyer") {
      const index = conversations.findIndex((e) => e.id === chatId);
      if (index > -1) {
        setCurrentChat(conversations[index]);
      }
      setDealId(uuidv4());
    }
  }, [chatId, conversations, role]);

  function submitDeal({ deal }, { setSubmitting }) {
    fb.firestore
      .collection("conversations")
      .doc(currentChat.id)
      .collection("messages")
      .doc(dealId)
      .set({
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
        <div className="chat_window_container_right_box">
          {currentChat ? (
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
                            size="1"
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

                <Formik
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    fb.firestore
                      .collection("conversations")
                      .doc(currentChat.id)
                      .collection("messages")
                      .add({
                        type: "text",
                        message: values.Input,
                        sender: username,
                        timestamp:
                          firebase.firestore.FieldValue.serverTimestamp(),
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
          ) : (
            <div> Xin chào </div>
          )}
        </div>
        <div className="chat_window_container_contact_box">
          {role === "buyer" && (
            <div className="chat_window_container_contact_list">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    updateChat(conversation.id);
                    setCurrentChat(conversation);
                    setBooktrigger(false);
                    setDealtrigger(false);
                  }}
                >
                  <Contact
                    currentChat={currentChat}
                    key={conversation.id}
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
                <div key={real.id} onClick={() => {}}>
                  <div>{real.data.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
