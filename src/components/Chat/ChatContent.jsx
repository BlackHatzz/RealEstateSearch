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

export const ChatContent = ({ currentChat, forceUpdate, dealStatus }) => {
  const { role, removeItem, removeViewChat } = useContext(Context);

  const [dealId, setDealId] = useState();
  const [minimize, setMinimize] = useState(false);
  // const [dealtrigger, setDealtrigger] = useState(false);
  const [booktrigger, setBooktrigger] = useState(null);
  const [currentInput, setCurrentInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dealinfoTrigger, setDealinfoTrigger] = useState(
    currentChat.data.deal === "accepted" || currentChat.data.deal === "pending"
      ? false
      : true
  );
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
            }
            // { merge: true }
          );
        fb.firestore.collection("conversations").doc(currentChat.id).update({
          lastMessage: "thỏa thuận",
        });
      })
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
        setCurrentInput("");
      });
    fb.firestore.collection("conversations").doc(currentChat.id).update({
      lastMessageRead: false,
      lastMessage: currentInput,
      lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <>
      <div className="small-chat-window-title-box">
        <p className="small-chat-window-title">{currentChat.data.title}</p>
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
              removeViewChat(currentChat);
              removeItem(currentChat);
              forceUpdate();
            }}
          >
            <CloseIcon style={{ width: 20, height: 20 }} />
          </div>
        </div>
      </div>
      <div className="chat_window_container_message_box">
        <div className="chat_window_container_message_box_display_realestate">
          <div className="chat_window_container_message_box_display_realestate_image">
            <img src={currentChat.data?.realIMG} alt="" />
          </div>
          <div className="chat_window_container_message_box_display_realestate_info">
            <div className="chat_window_container_message_box_display_realestate_info_title">
              <p>{currentChat.data.address}</p>
              <p>
                {currentChat.data.price} tỷ - {currentChat.data.bed} PN -{" "}
                {currentChat.data.bath} WC
              </p>
            </div>
            {role === "buyer" && (
              <div className="chat_window_container_message_box_display_realestate_info_deal_book">
                {dealStatus ? (
                  <p className="chat_window_container_message_box_display_realestate_info_deal">
                    Thỏa thuận: {currentChat?.data?.dealPrice} tỷ{" "}
                    {currentChat.data.deal === "pending" ? "(đang chờ)" : ""}
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
                {currentChat.data.deal === "accepted" &&
                  currentChat.data.appointment !== "upcoming" && (
                    <button
                      className="chat-window-deal-button"
                      onClick={handleDeal}
                      type="button"
                    >
                      Đặt lịch
                    </button>
                  )}
              </div>
            )}
          </div>
        </div>

        <MessageContainer conversation={currentChat} handleBook={handleBook} />

        {/* {booktrigger && (
          <div className="chat_window_container_message_box_popup">
            {booktrigger && (
              <Appointment
                trigger={booktrigger}
                setTrigger={setBooktrigger}
                conversation={currentChat}
              />
            )}
          </div>
        )} */}

        <div className="chat_window_container_message_box_input">
          {/* {role === "buyer" && (
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
          )} */}

          <form
            className="message-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
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
                target.style.height = `${Math.min(target.scrollHeight, 80)}px`;
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
  );
};
