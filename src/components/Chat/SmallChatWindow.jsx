import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import { MessageContainer } from "./MessageContainer";
import TelegramIcon from "@material-ui/icons/Telegram";
import CloseIcon from "@material-ui/icons/Close";
import MinimizeIcon from "@material-ui/icons/Minimize";
import firebase from "firebase";
import Appointment from "./Appointment";
import { Form, Formik } from "formik";
import { FormField } from "../FormField";
import { defaultValues, validationSchema } from "./formikDealConfig";

const SmallChatWindow = ({ currentChat }) => {
  const { role, chats, chatId, updateChat, chatRealId, updateChatRealId } =
    useContext(Context);

  const [dealId, setDealId] = useState();
  const [dealtrigger, setDealtrigger] = useState(false);
  const [booktrigger, setBooktrigger] = useState(false);
  const [currentInput, setCurrentInput] = useState("");

  const username = fb.auth.currentUser?.displayName;
  const uuid = fb.auth.currentUser?.uid;

  const handleDeal = () => {
    setBooktrigger(false);
    setDealtrigger((value) => !value);
  };
  const handleBook = () => {
    setDealtrigger(false);
    setBooktrigger((value) => !value);
  };

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

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="small-chat-windows">
      {currentChat && (
        <div className="small-chat-window">
          <div className="small-chat-window-title-box">
            <p className="small-chat-window-title">{currentChat.data.title}</p>
            <div className="small-chat-window-buttons">
              <div className="small-chat-window-buttons-minimize">
                <MinimizeIcon />
              </div>

              <CloseIcon />
            </div>
          </div>
          <div className="chat_window_container_message_box">
            <div>
              <div className="chat_window_container_message_box_display_realestate">
                <div className="chat_window_container_message_box_display_realestate_image">
                  <img
                    src="https://file4.batdongsan.com.vn/crop/350x232/2021/06/13/20210613112547-abeb_wm.jpg"
                    alt=""
                  />
                </div>
                <div className="chat_window_container_message_box_display_realestate_info">
                  <div className="chat_window_container_message_box_display_realestate_info_title"></div>
                  <p>{currentChat.data.address}</p>
                  <p>
                    {currentChat.data.price} tỷ - {currentChat.data.bed} PN -{" "}
                    {currentChat.data.bath} WC
                  </p>
                </div>
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
        </div>
      )}
    </div>
  );
};

export default SmallChatWindow;
