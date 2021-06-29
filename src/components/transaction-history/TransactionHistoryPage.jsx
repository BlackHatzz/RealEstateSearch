import React, { Component } from "react";
import BuyerNavbar from "../global/BuyerNavbar";
import "./transaction-history.css";

class TransactionHistoryPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <BuyerNavbar />

        <div className="history-wrapper">
          <div style={{ height: "40px" }}></div>
          <div className="history-container"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionHistoryPage;
