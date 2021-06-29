import React, { useState } from "react";

export const Context = React.createContext();

const ChatContext = (props) => {
  const aCallback = () => {
    // alert("HEY FROM METHOD");
    // setName("");
  };

  const [chatId, setChatId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Context.Provider
      value={{
        chatId,
        isOpen,
        updateChat: (id) => setChatId(id),
        updateOpen: () => setIsOpen(true),
        updateClose: () => setIsOpen(false),
        // aCallback: aCallback,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ChatContext;
