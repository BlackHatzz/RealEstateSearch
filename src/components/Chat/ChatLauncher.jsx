import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import { ChatWindow } from "./ChatWindow";
import { ChatWindowButton } from "./ChatWindowButton";

export const ChatLauncher = () => {
  const { role, isOpen, updateOpen, updateClose } = useContext(Context);
  const classList = ["launcher", isOpen ? "_opened" : ""];
  const uid = fb.auth.currentUser.uid;
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscribe = fb.firestore
      .collection("conversations")
      .where(role + "Id", "==", uid)
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
  }, [role, uid]);

  return (
    <div id="launcher">
      <div className={classList.join("")}>
        {isOpen ? (
          <ChatWindow onClickChat={updateClose} conversations={conversations} />
        ) : (
          <ChatWindowButton onClickChat={updateOpen} />
        )}
      </div>
    </div>
  );
};
