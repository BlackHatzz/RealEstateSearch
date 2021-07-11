import React, { useState, useEffect } from "react";

export const Contact = ({ id, data, currentChat }) => {
  const deal = data?.deal;

  const dealText = data?.dealPrice + " tỷ (" + deal + ")";
  console.log("current:" + id);
  console.log("id:" + currentChat?.id);
  return (
    <div className={"contact_item"}>
      <div
        id={id}
        className={currentChat?.id === id ? "item_selected" : "item_unselect"}
      >
        <p className="contact-title">{data.title}</p>
        {deal && deal === "pending" && dealText === "đang chờ"}
        <p className="contact-info">Thỏa thuận: {deal ? dealText : "không"}</p>
      </div>
    </div>
  );
};
