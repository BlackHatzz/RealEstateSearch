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
import { v4 as uuidv4 } from "uuid";
import { ChatContent } from "./ChatContent";

const SmallChatWindow = ({ currentChat, oldChat1, oldChat2 }) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="small-chat-windows">
      {currentChat && (
        <div
          className={oldChat1 ? "small-chat-window-1" : "small-chat-window-2"}
        >
          <ChatContent currentChat={currentChat} />
        </div>
      )}
      {oldChat1 && (
        <div className="small-chat-window-2">
          <ChatContent currentChat={oldChat1} />
        </div>
      )}
    </div>
  );
};

export default SmallChatWindow;
