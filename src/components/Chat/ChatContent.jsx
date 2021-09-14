import React, { useContext, useEffect, useState, useReducer } from "react";
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
import { v4 as uuidv4 } from "uuid";
import Popover from "@material-ui/core/Popover";
import moment from "moment";

export const ChatContent = ({
  currentChat,
  forceUpdate,
  dealStatus,
  bookStatus,
  setBookStatus,
  lastDoc,
  setLastDoc,
  currentMessagesList,
  messageEl,
  messagesEndRef,
  messages,
  setMessages,
}) => {
  const { role, removeViewChat } = useContext(Context);
  const [dealId, setDealId] = useState();
  const [minimize, setMinimize] = useState(false);

  const [booktrigger, setBooktrigger] = useState(null);

  const [currentInput, setCurrentInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isNewMessage, setIsNewMessage] = useState(true);

  const username = fb.auth.currentUser?.displayName;
  const uuid = fb.auth.currentUser?.uid;
  const dealPopup = Boolean(anchorEl);
  const bookPopup = Boolean(booktrigger);
  const handleDeal = (event) => {
    setDealId(uuidv4());
    setAnchorEl(event.currentTarget);
  };
  const handleBook = (event) => {
    setBooktrigger(event.currentTarget);
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
              lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
              lastMessageReadStaff: false,
              lastMessage: "thỏa thuận mới",
            }
            // { merge: true }
          )
          .then(() => {
            // console.log("chatdata", currentChat);
            // forceUpdate();
          })
          .catch((err) =>
            console.log("error add deal info to conversation", err)
          );
      })
      .catch((err) => console.log("error create deal", err))
      .finally(() => {
        setSubmitting(false);
        setAnchorEl(null);
      });
  }

  function sendMessage() {
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
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        senderId: uuid,
      })
      .finally(() => {
        setIsNewMessage(true);
        setCurrentInput("");
        document.getElementById("textarea-send-message").style.height = "27px";
        fb.firestore.collection("conversations").doc(currentChat.id).update({
          lastMessageReadStaff: false,
          lastMessage: currentInput,
          lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
        });
        // forceUpdate();
      });
  }

  return (
    <>
      {currentChat && (
        <>
          <div className="small-chat-window-title-box">
            <p className="small-chat-window-title">
              {currentChat?.data?.title}
            </p>
            <div className="small-chat-window-buttons">
              {/* <div
            className="small-chat-window-buttons-minimize"
            onClick={() => {
              setMinimize(true);
            }}
          >
            <MinimizeIcon />
          </div> */}
              <div
                className="small-chat-window-buttons-close"
                onClick={() => {
                  removeViewChat(currentChat.id);
                  // removeItem(currentChat);
                  forceUpdate();
                }}
              >
                <CloseIcon style={{ width: 20, height: 20 }} />
              </div>
            </div>
          </div>
          <div className="chat_window_container_message_box">
            <div className="chat_window_container_message_box_display_realestate-wrapper">
              <div className="chat_window_container_message_box_display_realestate">
                <div className="chat_window_container_message_box_display_realestate_image">
                  <img src={currentChat?.data?.realIMG} alt="" />
                </div>

                <div className="chat_window_container_message_box_display_realestate_info">
                  <div className="chat_window_container_message_box_display_realestate_info_title">
                    <p>{currentChat?.data?.address}</p>
                    <p>
                      {currentChat?.data?.price +
                        " tỷ - " +
                        currentChat?.data?.area +
                        " m"}
                      <sup>2</sup>
                      {" - " +
                        currentChat?.data?.bed +
                        " PN - " +
                        currentChat?.data?.bath +
                        " WC"}
                    </p>
                  </div>
                  {role === "buyer" && currentChat?.data?.status === "active" && (
                    <div className="chat_window_container_message_box_display_realestate_info_deal_book">
                      {dealStatus ? (
                        <p className="chat_window_container_message_box_display_realestate_info_deal">
                          Thỏa thuận: {currentChat?.data?.dealPrice + " tỷ "}
                          {currentChat?.data?.deal === "pending"
                            ? "(đang chờ)"
                            : ""}
                          {/* {currentChat?.data?.deal + ""} */}
                        </p>
                      ) : (
                        <button
                          className="chat-window-deal-button"
                          onClick={handleDeal}
                          type="button"
                        >
                          Thỏa thuận
                        </button>
                      )}
                      {bookStatus === "upcoming" && (
                        <p className="chat_window_container_message_box_display_realestate_info_deal">
                          {"Lịch hẹn: " +
                            moment(currentChat?.data?.appointmentDate).format(
                              "LT"
                            ) +
                            " - " +
                            moment(currentChat?.data?.appointmentDate).format(
                              "L"
                            )}
                        </p>
                      )}
                      {bookStatus === "cancel" && (
                        <button
                          className="chat-window-deal-button"
                          onClick={handleBook}
                          type="button"
                        >
                          Đặt lịch
                        </button>
                      )}
                      {bookStatus === "none" &&
                        dealStatus &&
                        currentChat?.data && (
                          <div>
                            {currentChat.data.deal === "accepted" && (
                              <button
                                className="chat-window-deal-button"
                                onClick={handleBook}
                                type="button"
                              >
                                Đặt lịch
                              </button>
                            )}
                          </div>
                        )}
                    </div>
                  )}
                  {currentChat?.data?.status !== "active" && (
                    <p>Bất động sản đã được giao dịch</p>
                  )}
                </div>
              </div>
            </div>

            <MessageContainer
              conversation={currentChat}
              handleBook={handleBook}
              setBookStatus={setBookStatus}
              bookStatus={bookStatus}
              isNewMessage={isNewMessage}
              setIsNewMessage={setIsNewMessage}
              lastDoc={lastDoc}
              setLastDoc={setLastDoc}
              currentMessagesList={currentMessagesList}
              messageEl={messageEl}
              messagesEndRef={messagesEndRef}
              messages={messages}
              setMessages={setMessages}
            />

            <Popover
              id={dealPopup ? "simple-popover" : undefined}
              anchorEl={anchorEl}
              open={dealPopup}
              onClose={() => {
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              className="chat-mobile-confirm"
            >
              <div className="deal-popup-form">
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
                        maxLength="4"
                        size="4"
                        label="Thỏa thuận (tỷ VNĐ): "
                      />

                      <div className="deal-form-button">
                        {!isSubmitting && isValid && (
                          <button
                            disabled={isSubmitting || !isValid}
                            type="submit"
                          >
                            Gửi
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setAnchorEl(null);
                          }}
                        >
                          Đóng
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Popover>

            <Popover
              id={bookPopup ? "simple-popover" : undefined}
              anchorEl={booktrigger}
              open={bookPopup}
              onClose={() => {
                setBooktrigger(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              className="chat-mobile-confirm"
            >
              <Appointment
                setBookStatus={setBookStatus}
                trigger={booktrigger}
                setTrigger={setBooktrigger}
                conversation={currentChat}
              />
            </Popover>

            <div className="chat_window_container_message_box_input">
              <form
                className="message-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <textarea
                  disabled={currentChat?.data?.status === "disable"}
                  id="textarea-send-message"
                  maxLength="2000"
                  className="textarea-input"
                  autoComplete="off"
                  value={currentInput}
                  onChange={(e) => {
                    setCurrentInput(e.target.value);
                    const target = e.target;
                    target.style.height = "20px";
                    target.style.height = `${Math.min(
                      target.scrollHeight,
                      80
                    )}px`;
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      currentInput.trim() !== "" && sendMessage();
                    }
                  }}
                  placeholder="Gửi tin nhắn ..."
                />
                {currentInput.trim() !== "" && (
                  <button
                    className="button_send_message"
                    type="submit"
                    disabled={currentInput === "" ? true : false}
                  >
                    <TelegramIcon
                      className="send-message-icon"
                      style={{ width: 30, height: 30, color: "#0C67CE" }}
                    />
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
