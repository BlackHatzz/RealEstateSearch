import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import { ChatWindow } from "./ChatWindow";
import { ChatWindowButton } from "./ChatWindowButton";

export const ChatLauncher = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { role, isOpen, updateOpen, updateClose } = useContext(Context);
  const classList = ["launcher", isOpen ? "_opened" : ""];
  const uid = fb.auth.currentUser.uid;
  const [conversations, setConversations] = useState([]);
  // const [currentChat, setCurrentChat] = useState(conversations[0]);
  // const { chatId, updateChat } = useContext(Context);
  // console.log("win" + chatId);
  // if (conversations.findIndex((e) => e.id === chatId) > -1) {
  //   const index = conversations.findIndex((e) => e.id === chatId);
  //   console.log("found");
  //   // setCurrentChat(conversations[index]);
  // } else {
  //   console.log("not found");
  // }
  useEffect(() => {
    console.log(role + "Id");
    const unsubscribe = fb.firestore
      .collection("conversations")
      .where(role + "Id", "==", uid)
      // .orderBy("lastvisit", "desc")
      .onSnapshot((snapshot) => {
        setConversations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, [uid]);
  // const handleClick = () => {
  //   setIsOpen((value) => !value);
  // };
  return (
    <div id="launcher">
      {/* {console.log("asdasd" + currentChat.id)} */}
      <div className={classList.join("")}>
        {isOpen ? (
          <ChatWindow
            onClickChat={updateClose}
            conversations={conversations}
            // currentChat={currentChat}
            // setChat={setCurrentChat}
          />
        ) : (
          <ChatWindowButton onClickChat={updateOpen} />
        )}
      </div>
    </div>
  );
};
