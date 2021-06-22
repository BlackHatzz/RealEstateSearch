import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <App style={{fontFamily: "'Roboto', sans-serif"}} /> */}
    <App
      style={{
        fontFamily:
          "'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
