import React, { useEffect, useState, useRef, useContext } from "react";
import { fb } from "../../services";
import { ChatContent } from "./ChatContent";
import { Context } from "../../ChatContext";

const SmallChatWindow = ({ id1, id2, forceUpdate }) => {
  // - Context
  const { viewchats, addViewChat } = useContext(Context);

  // - deal-book button triggers
  const [chat1DealStatus, setchat1DealStatus] = useState();
  const [chat1BookStatus, setchat1BookStatus] = useState();
  const [chat2DealStatus, setchat2DealStatus] = useState();
  const [chat2BookStatus, setchat2BookStatus] = useState();

  // - set messages
  const [chat1Messages, setchat1Messages] = useState([]);
  const [chat2Messages, setchat2Messages] = useState([]);

  // - pagination
  const [chat1LastDoc, setChat1LastDoc] = useState(null);
  // let chat1LastDoc = null;
  let chat1MessagesList = [];
  const [chat2LastDoc, setChat2LastDoc] = useState(null);
  // let chat2LastDoc = null;
  let chat2MessagesList = [];

  // - ref
  const chat1MessageEl = useRef(null);
  const chat1MessagesEndRef = useRef(null);
  const chat2MessageEl = useRef(null);
  const chat2MessagesEndRef = useRef(null);

  // - set conversations
  const [chat1, setChat1] = useState(null);
  const [chat2, setChat2] = useState(null);
  useEffect(() => {
    const getChat1 = fb.firestore
      .collection("conversations")
      .doc(id1)
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
    const getChat1Messages = fb.firestore
      .collection("conversations")
      .doc(id1)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((snap) => {
        let docs = snap.docs;
        let previousDoc = docs[docs.length - 1];
        let messagesList = docs.map((doc) => doc.data()).reverse();

        setchat1Messages(messagesList);
        chat1MessagesList = messagesList;
        setChat1LastDoc(previousDoc);
        // chat1LastDoc = previousDoc;
        console.log("doc", chat1LastDoc);
      });
    const getChat2Messages = fb.firestore
      .collection("conversations")
      .doc(id2)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((snap) => {
        let docs = snap.docs;
        let previousDoc = docs[docs.length - 1];
        let messagesList = docs.map((doc) => doc.data()).reverse();

        setchat2Messages(messagesList);
        chat2MessagesList = messagesList;
        setChat2LastDoc(previousDoc);
        // chat2LastDoc = previousDoc;
        // console.log("doc", lastDoc);
      });

    return () => {
      console.log("id1", id1);
      getChat1();
      getChat1Messages();
      console.log("id2", id2);
      getChat2();
      getChat2Messages();
    };
  }, [id1, id2]);

  // useEffect(() => {

  // }, [chat21]);
  return (
    <div className="small-chat-windows">
      {id1 && (
        <div className={id2 ? "small-chat-window-1" : "small-chat-window-2"}>
          {chat1 && (
            <ChatContent
              currentChat={chat1}
              forceUpdate={forceUpdate}
              dealStatus={chat1DealStatus}
              bookStatus={chat1BookStatus}
              setBookStatus={setchat1BookStatus}
              lastDoc={chat1LastDoc}
              setLastDoc={setChat1LastDoc}
              currentMessagesList={chat1MessagesList}
              messageEl={chat1MessageEl}
              messagesEndRef={chat1MessagesEndRef}
              messages={chat1Messages}
              setMessages={setchat1Messages}
            />
          )}
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
            setLastDoc={setChat2LastDoc}
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
