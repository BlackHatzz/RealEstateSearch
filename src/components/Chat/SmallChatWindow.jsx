import React, { useEffect, useState, useRef, useContext } from "react";
import { fb } from "../../services";
import { ChatContent } from "./ChatContent";
import { Context } from "../../ChatContext";

const SmallChatWindow = ({ id1, id2, forceUpdate }) => {
  const { viewchats, addViewChat } = useContext(Context);

  const [chat1DealStatus, setchat1DealStatus] = useState();
  const [chat1BookStatus, setchat1BookStatus] = useState();

  // const [chat1LastDoc, setchat1LastDoc] = useState(null);
  const [chat1Messages, setchat1Messages] = useState([]);

  let chat1LastDoc = null;
  let chat1MessagesList = [];

  const [chat2DealStatus, setchat2DealStatus] = useState();
  const [chat2BookStatus, setchat2BookStatus] = useState();

  // const [chat2LastDoc, setchat2LastDoc] = useState(null);
  const [chat2Messages, setchat2Messages] = useState([]);

  let chat2LastDoc = null;
  let chat2MessagesList = [];

  const chat1MessageEl = useRef(null);
  const chat1MessagesEndRef = useRef(null);

  const chat2MessageEl = useRef(null);
  const chat2MessagesEndRef = useRef(null);

  const [chat1, setChat1] = useState(null);
  const [chat2, setChat2] = useState(null);
  useEffect(() => {
    const getChat1 = fb.firestore
      .collection("conversations")
      .doc(id1 + "")
      .onSnapshot((snap) => {
        let data = snap.data();
        setchat1DealStatus(
          data?.deal === "accepted" || data?.deal === "pending" ? true : false
        );
        setchat1BookStatus(!!data?.appointment ? data.appointment : "none");
        setChat1({
          id: snap.id,
          data: data,
        });
      });
    const getChat2 = fb.firestore
      .collection("conversations")
      .doc(id2 + "")
      .onSnapshot((snap) => {
        let data = snap.data();
        setchat2DealStatus(
          data?.deal === "accepted" || data?.deal === "pending" ? true : false
        );
        setchat2BookStatus(!!data?.appointment ? data.appointment : "none");
        setChat2({
          id: snap.id,
          data: data,
        });
      });
    // getChat1();
    // getChat2();

    return () => {
      getChat1();
      getChat2();
    };
  }, [id1, id2]);

  // useEffect(() => {

  // }, [chat21]);
  return (
    <div className="small-chat-windows">
      {id1 && (
        <div className={id2 ? "small-chat-window-1" : "small-chat-window-2"}>
          <ChatContent
            currentChat={chat1}
            forceUpdate={forceUpdate}
            dealStatus={chat1DealStatus}
            bookStatus={chat1BookStatus}
            setBookStatus={setchat1BookStatus}
            lastDoc={chat1LastDoc}
            currentMessagesList={chat1MessagesList}
            messageEl={chat1MessageEl}
            messagesEndRef={chat1MessagesEndRef}
            messages={chat1Messages}
            setMessages={setchat1Messages}
          />
        </div>
      )}
      {id2 && (
        <div className="small-chat-window-2">
          <ChatContent
            currentChat={chat2}
            forceUpdate={forceUpdate}
            dealStatus={chat2DealStatus}
            bookStatus={chat2BookStatus}
            setBookStatus={setchat2BookStatus}
            lastDoc={chat2LastDoc}
            currentMessagesList={chat2MessagesList}
            messageEl={chat2MessageEl}
            messagesEndRef={chat2MessagesEndRef}
            messages={chat2Messages}
            setMessages={setchat2Messages}
          />
        </div>
      )}
    </div>
  );
};

export default SmallChatWindow;
