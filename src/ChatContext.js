import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
export const Context = React.createContext();

const ChatContext = (props) => {
  // const aCallback = () => {};

  const [chatId, setChatId] = useState("0");
  const [chatRealId, setChatRealId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useLocalStorage("role", "");
  const [chats, setChats] = useLocalStorage("chats", []);

  // const [role, setRole] = useState();

  function addItem(item) {
    if (chats.some((e) => e.id === item.id)) {
      console.log("item exist");
      let index = chats.findIndex((e) => e.id === item.id);
      chats.splice(index, 1);
      chats.unshift(item);
      setChats(chats);
    } else {
      setChats((prevItems) => [item, ...prevItems]);
    }
  }

  return (
    <Context.Provider
      value={{
        chats,
        chatId,
        isOpen,
        role,
        chatRealId,
        updateChat: (id) => setChatId(id),
        updateChatRealId: (id) => setChatRealId(id),
        updateOpen: () => setIsOpen(true),
        updateClose: () => setIsOpen(false),
        updateSellerRole: () => setRole("seller"),
        updateBuyerRole: () => setRole("buyer"),
        resetRole: () => setRole(""),
        addItem,
        // aCallback: aCallback,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ChatContext;
