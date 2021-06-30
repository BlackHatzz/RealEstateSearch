import React from "react";

export const Contact = ({ id, data }) => {
  return (
    <div
      className="contact_item"
      onClick={() => {
        console.log(data.title);
      }}
    >
      <h4>{data.title}</h4>
    </div>
  );
};
