import React from "react";
import { Sidebar } from "./Sidebar";
import "./Chat.css";
import Messageboard from "./Messageboard";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import BuyerNavbar from "../global/BuyerNavbar";

export const Chat = () => {
  let match = useRouteMatch();

  return (
    <div className="chat_main">
      <BuyerNavbar />
      <div className="chat">
        <Sidebar />

        <Switch>
          <Route exact path={`${match.path}`}>
            <h2>Nhắn tin trực tiếp với người bán</h2>
          </Route>
          <Route path={`${match.path}/:conId?/:realId?/:sellerId?/:buyerId?`}>
            <Messageboard />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
