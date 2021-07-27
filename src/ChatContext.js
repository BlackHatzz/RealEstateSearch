import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
export const Context = React.createContext();

const ChatContext = (props) => {
  // const aCallback = () => {};

  const [chatId, setChatId] = useState("0");
  const [chatRealId, setChatRealId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useLocalStorage("role", "");
  // const [role, setRole] = useState();
  return (
    <Context.Provider
      value={{
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
        // aCallback: aCallback,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ChatContext;
