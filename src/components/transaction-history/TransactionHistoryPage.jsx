import React, { Component } from "react";
import BuyerNavbar from "../global/BuyerNavbar";
import "./transaction-history.css";
import "./transaction-history.css";
import Constants from "../global/Constants";
import { fb } from "../../services/firebase";

class TransactionHistoryPage extends Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    fetch(
      Constants.Buyer.getTransactionHistory(fb.auth.currentUser?.uid, 0)
      // "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/transaction/getTransactionByUserId/QvZgwUs2DlYEHmdlrZITsI88ZIq2/0"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("transaction history data");
          console.log(result);
          this.setState({
            transactions: result.content,
          });
        },
        (error) => {}
      );
  }

  render() {
    return (
      <React.Fragment>
        {/* <BuyerNavbar /> */}

        <div className="history-wrapper">
          <div style={{ height: "40px" }}></div>
          <div className="history-container">
            <div className="transaction-history-container">
              <div className="grid-header">Thời gian</div>
              <div className="grid-header">Địa điểm</div>
              <div className="grid-header">Bên mua</div>
              <div className="grid-header">Môi giới viên</div>
              <div className="grid-header">Ghi chú</div>
              <div className="grid-header">Số Tiền(tỷ VND)</div>

              {this.state.transactions.map((transaction, index) => (
                <React.Fragment key={index}>
                  <div className="grid-item">{transaction.createAt}</div>
                  <div className="grid-item">
                    <span>
                      {transaction.streetName}, {transaction.disName},{" "}
                      {transaction.wardName}
                    </span>
                  </div>
                  <div className="grid-item">{transaction.sellerName}</div>
                  <div className="grid-item">{transaction.staffName}</div>
                  <div className="grid-item">{transaction.note}</div>
                  <div className="grid-item">{transaction.downPrice}</div>
                </React.Fragment>
              ))}
              
              {/* <div className="grid-item">7</div>
              <div className="grid-item">8</div>
              <div className="grid-item">9</div>
              <div className="grid-item">10</div>
              <div className="grid-item">1reg; rhe</div>
              <div className="grid-item">12</div> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionHistoryPage;
