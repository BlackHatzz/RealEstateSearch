import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
export const Context = React.createContext();

const ChatContext = (props) => {
  // const aCallback = () => {};

  const [chatId, setChatId] = useState("0");
  const [chatRealId, setChatRealId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [role, setRole] = useLocalStorage("role", "");
  const [chats, setChats] = useLocalStorage("chats", []);
  const [viewchats, setViewChats] = useLocalStorage("viewchats", []);

  // const [role, setRole] = useState();

  function addItem(item) {
    if (chats.some((e) => e.id === item.id)) {
      let index = chats.findIndex((e) => e.id === item.id);
      chats.splice(index, 1);
      chats.unshift(item);
      setChats(chats);
    } else {
      setChats((prevItems) => [item, ...prevItems]);
    }
  }
  function removeItem(item) {
    if (chats.some((e) => e.id === item.id)) {
      let index = chats.findIndex((e) => e.id === item.id);
      chats.splice(index, 1);
      setChats(chats);
    }
  }

  function addViewChat(item) {
    if (viewchats.some((e) => e === item)) {
      // let index = viewchats.findIndex((e) => e.id === item.id);
      // if (index > 1) {
      //   viewchats.splice(index, 1);
      //   viewchats.unshift(item);
      //   setViewChats(viewchats);
      // }
    } else {
      if (viewchats.length > 1) {
        viewchats.splice(1, 1);
      }
      setViewChats((prevItems) => [item, ...prevItems]);
    }
  }

  function removeViewChat(item) {
    if (viewchats.some((e) => e === item)) {
      let index = viewchats.findIndex((e) => e === item);
      viewchats.splice(index, 1);
      setViewChats(viewchats);
    }
  }

  return (
    <Context.Provider
      value={{
        viewchats,
        chats,
        chatId,
        isOpen,
        role,
        chatRealId,
        isNewUser,
        triggerNewUser: (value) => setIsNewUser(value),
        updateChat: (id) => setChatId(id),
        updateChatRealId: (id) => setChatRealId(id),
        updateOpen: () => setIsOpen(true),
        updateClose: () => setIsOpen(false),
        updateSellerRole: () => setRole("seller"),
        updateBuyerRole: () => setRole("buyer"),
        resetRole: () => setRole(""),
        addItem,
        removeItem,
        addViewChat,
        removeViewChat,
        // aCallback: aCallback,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ChatContext;
