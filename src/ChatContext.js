import React, { useState } from "react";

export const Context = React.createContext();

const ChatContext = (props) => {
  const aCallback = () => {};

  const [chatId, setChatId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("buyer");
  return (
    <Context.Provider
      value={{
        chatId,
        isOpen,
        role,
        updateChat: (id) => setChatId(id),
        updateOpen: () => setIsOpen(true),
        updateClose: () => setIsOpen(false),
        updateRole: (value) => setRole(value),
        // aCallback: aCallback,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ChatContext;
