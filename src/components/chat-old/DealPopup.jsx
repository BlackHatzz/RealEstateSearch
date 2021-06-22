import React, { useState, useEffect } from "react";

export default function DealPopup(props) {
  const [text, setText] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    props.setTrigger(false);
    fetch("http://localhost:8080/apis/apis/deals/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: 6,
        createAt: "",
        id: 7,
        offeredPrice: text,
        status: false,
      }),
    });
    window.location.reload();
  }
  return props.trigger ? (
    <div className="popup-box">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
