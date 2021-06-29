import React, { useState } from "react";

export const Context = React.createContext();

const ChatContext = (props) => {
  const aCallback = () => {
    // alert("HEY FROM METHOD");
    // setName("");
  };

  const [chatId, setChatId] = useState("0");

  return (
    <Context.Provider
      value={{
        chatId,
        updateChat: (id) => setChatId(id),
        // aCallback: aCallback,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ChatContext;
