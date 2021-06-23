import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import SidebarChat from "./SidebarChat";
import { fb } from "../../services";

export const Sidebar = () => {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const unsubscribe = fb.firestore
      .collection("realestates")
      .onSnapshot((snapshot) => {
        setConversations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar />
      </div>
      <div className="sidebar-chatlist">
        {/* <SidebarChat newChat /> */}
        {conversations.map((con) => (
          <SidebarChat key={con.id} id={con.id} title={con.data.title} />
        ))}
      </div>
    </div>
  );
};
