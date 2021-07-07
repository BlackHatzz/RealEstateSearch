import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router } from "react-router-dom";
import ChatContext from "./ChatContext";
ReactDOM.render(
  <React.StrictMode>
    <ChatContext>
      <Router>
        {/* <App style={{fontFamily: "'Roboto', sans-serif"}} /> */}
        <App
          style={{
            fontFamily:
              "'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        />
      </Router>
    </ChatContext>
  </React.StrictMode>,
  document.getElementById("root")
);
