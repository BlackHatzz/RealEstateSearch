import React, { Component } from "react";
import "./transaction-pop-up-content.css";
import "../global/shared.css";
import SolidField from "./solid-field";
import "./solid-field.css";
import { RiArrowDropDownLine } from "react-icons/ri";

class TransactionPopUpContent extends Component {
  state = {
      isBuyerMenuShown: false
  };

  handleBuyerSelection = () => {
      console.log("buyer");
      this.setState({
          isBuyerMenuShown: !this.state.isBuyerMenuShown
      });

  };

  render() {
    return (
      <React.Fragment>
        <div className="pop-up-box">
          <div className="header">Tạo Giao Dịch</div>
          <div className="divide"></div>
          <div className="content">
            <div className="content-layout">
              <div style={{ paddingTop: "12px" }} className="session-title">
                Tên Giao Dịch
              </div>
              <SolidField placeholder="Nhập tên giao dịch..." />
              <div className="session-title">Người Bán: Nguyễn Đức Huy</div>
              <div className="session-title">Người Mua:</div>
              <div onClick={this.handleBuyerSelection} className="underscore-field-container2">
                <input
                  placeholder="Chọn người mua..."
                  type="text"
                  className="underscore-field"
                />
                <RiArrowDropDownLine style={{width: "40px", height: "40px"}} />
              </div>
              
              {/* {this.state.isBuyerMenuShown ? (<p>qweasd</p>) : null} */}

              <div className="session-title">Giá Trị Ban Đầu: 2 tỷ</div>
              <div className="session-title">Giá Trị Lúc Bán:</div>
              <SolidField placeholder="Nhập số tiền lúc bán..." />
              <div style={{ height: "28px" }}></div>
              <div className="bottom">
                <div className="noselect cancel-button">HỦY</div>
                <div className="noselect confirm-button">XÁC NHẬN</div>
              </div>

              {/* {" "}
              Lorem ipsumvfdsfsadf dolor sit amet consectetur adipisicing elit.
              Atque, a nostrum.
              <br /> Dolorem, repellat quidem ut, minima sint vel eveniet
              quibusdam voluptates delectus doloremque, explicabo tempore dicta
              adipisci fugit amet dignissimos?
              <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequatur
              <br /> sit commodi beatae optio voluptatum sed eius cumque,
              delectus saepe repudi
              <br />
              andae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
              Vitae? */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionPopUpContent;
