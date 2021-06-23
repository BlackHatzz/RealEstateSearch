import React from "react";
import { Sidebar } from "./Sidebar";
import "./Chat.css";
import Messageboard from "./Messageboard";
import { Route, Switch, useRouteMatch } from "react-router-dom";

export const Chat = () => {
  let match = useRouteMatch();

  return (
    <div className="chat">
      <Sidebar />

      <Switch>
        <Route exact path={`${match.path}`}>
          <h1>select a conversation</h1>
        </Route>
        <Route path={`${match.path}/:conId`}>
          <Messageboard />
        </Route>
      </Switch>
    </div>
  );
};
