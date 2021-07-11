import React from "react";

export const SellerChatItem = ({ id, currentReal, data }) => {
  return (
    <div
      className={currentReal?.id === id ? "real-item-selected" : "real-item"}
    >
      <p className="contact-title">{data.title}</p>
      <p>quan tâm: {data.chats.length}</p>
    </div>
  );
};
