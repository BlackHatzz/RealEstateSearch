import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import { fb } from "../../services";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";
import Realestate from "./Realestate";

const Messageboard = () => {
  // const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const { conId, realId, sellerId } = useParams();
  const [title, setTitle] = useState("");
  const [sellerName, setSellerName] = useState("");

  const [messages, setMessages] = useState([]);
  const uuid = fb.auth.currentUser.uid;
  const username = fb.auth.currentUser.displayName;

  useEffect(() => {
    if (conId) {
      fb.firestore
        .collection("users")
        .doc(uuid)
        .collection("conversations")
        .doc(conId)
        .onSnapshot((snapshot) => {
          setTitle(snapshot.data().title);
          setSellerName(snapshot.data().seller);
        });

      fb.firestore
        .collection("users")
        .doc(uuid)
        .collection("conversations")
        .doc(conId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [conId]);

  const sendMessage = (e) => {
    e.preventDefault();

    fb.firestore
      .collection("users")
      .doc(uuid)
      .collection("conversations")
      .doc(conId)
      .collection("messages")
      .add({
        message: input,
        sender: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };

  console.log("sellerid" + sellerId);
  return (
    <div className="messageBoard">
      <div className="messageBoard_header">
        <Avatar />
        <div className="messageBoard_header_info">
          <h3>{sellerName}</h3>
          {/* <p>last seen</p> */}
        </div>
        <div className="messageBoard_header_right">
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="messageBoard_realestate">
        <Realestate sellerId={sellerId} realId={realId} convId={conId} />
      </div>
      <div className="messageBoard_container">
        {messages.map((message) => (
          <p className={`message ${true && "message_send"}`}>
            {message.message}
            <span className="message_name">{message.sender}</span>
          </p>
        ))}
      </div>
      <div className="messageBoard_sendform">
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            type="text"
            placeholder="Aa"
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};

export default Messageboard;
