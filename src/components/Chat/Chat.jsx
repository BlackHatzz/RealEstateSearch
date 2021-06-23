import React from "react";
import { Sidebar } from "./Sidebar";
import "./Chat.css";
import Messageboard from "./Messageboard";
import { Route, Switch } from "react-router-dom";

export const Chat = () => {
  return (
    <div className="chat">
      <Switch>
        <Sidebar />
        <Route path="/chat-page/">
          <Messageboard />
        </Route>
        <Route path="/chat-page/">{/* <Messageboard /> */}</Route>
      </Switch>
    </div>
  );
};
