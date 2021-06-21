import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import ChatHeader from "./ChatHeader";
import Login from "./Login";

const projectID = "c0304dac-5c99-42f7-ad86-3711575f68d0";
export default function Chat() {
  if (!localStorage.getItem("username")) return <Login />;

  return (
    <>
      <ChatEngine
        height="100vh"
        projectID={projectID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatHeader={(props) => <ChatHeader {...props} />}
        //renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        //onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
      />
    </>
  );
}
