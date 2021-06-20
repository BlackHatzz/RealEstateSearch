import React, { Component } from "react";
import "./transaction-pop-up-content.css";
import "../global/shared.css";
import SolidField from "./solid-field";
import "./solid-field.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineConsoleSql } from "react-icons/ai";

class TransactionPopUpContent extends Component {
  state = {
    isBuyerMenuShown: false,
    buyerBasicInfos: [
      { id: "1", name: "nguyen duc huy 1", profilePicUrl: "thisisurl" },
      { id: "2", name: "nguyen duc huy 2", profilePicUrl: "thisisurl" },
      { id: "3", name: "nguyen duc huy 3", profilePicUrl: "thisisurl" },
    ],
    selectedBuyer: null,
  };

  showBuyerMenu = () => {
    this.setState({
      isBuyerMenuShown: !this.state.isBuyerMenuShown,
    });
  };
  handleBuyerSelection = (buyer) => {
    this.setState({
      selectedBuyer: buyer,
      isBuyerMenuShown: false,
    });
  };
  renderSelectedBuyer() {
    if (this.state.selectedBuyer == null) {
      return (
        <input
          style={{ cursor: "pointer" }}
          readOnly
          placeholder="Chọn người mua..."
          type="text"
          className="underscore-field"
        />
      );
    }

    return (
      <div className="dropdown-item padding-field">
        <div className="profile-pic">
          <img src="" alt="" className="profile-pic" />
        </div>
        <div className="info-container">
          <span className="dropdown-item">{this.state.selectedBuyer.name}</span>
          <span className="dropdown-item2">ID: {this.state.selectedBuyer.id}</span>
        </div>
      </div>
    );
  }

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
              <SolidField
                className="padding-field"
                placeholder="Nhập tên giao dịch..."
              />
              <div className="session-title">Người Bán: Nguyễn Đức Huy</div>
              <div className="session-title">Người Mua:</div>

              <div className="dropdown-container">
                <div
                  onClick={this.showBuyerMenu}
                  className="underscore-field-container2 padding-field"
                >
                  {this.renderSelectedBuyer()}
                  <RiArrowDropDownLine
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
                <div className="dropdown-menu">
                  {this.state.isBuyerMenuShown
                    ? this.state.buyerBasicInfos.map((buyer) => (
                        <div
                          key={buyer.id}
                          onClick={() => this.handleBuyerSelection(buyer)}
                          className="dropdown-item padding-field"
                        >
                          <div className="profile-pic">
                            <img src="" alt="" className="profile-pic" />
                          </div>
                          <div className="info-container">
                            <span className="dropdown-item">{buyer.name}</span>
                            <span className="dropdown-item2">
                              ID: {buyer.id}
                            </span>
                          </div>
                        </div>
                      ))
                    : null}

                  {/* <div className="dropdown-item padding-field">
                    <div className="profile-pic"><img src="" alt="" className="profile-pic" /></div>
                    <div className="info-container">
                      <span className="dropdown-item">Nguyen Duc Huy</span>
                      <span className="dropdown-item2">ID: 123456</span>
                    </div>
                  </div>

                  <div className="dropdown-item padding-field">
                  <div className="profile-pic"><img src="" alt="" className="profile-pic" /></div>
                  <div className="info-container">
                      <span className="dropdown-item">Nguyen Duc Huy</span>
                      <span className="dropdown-item2">ID: 123456</span>
                    </div>
                  </div>
                  <div className="dropdown-item padding-field">
                  <div className="profile-pic"><img src="" alt="" className="profile-pic" /></div>
                  <div className="info-container">
                      <span className="dropdown-item">Nguyen Duc Huy</span>
                      <span className="dropdown-item2">ID: 123456</span>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* <div onClick={this.handleBuyerSelection} className="underscore-field-container2">
                <input
                  readOnly
                  placeholder="Chọn người mua..."
                  type="text"
                  className="underscore-field"
                />
                <RiArrowDropDownLine style={{width: "40px", height: "40px"}} />
              </div> */}

              {/* {this.state.isBuyerMenuShown ? (<p>qweasd</p>) : null} */}

              <div className="session-title">Giá Trị Ban Đầu: 2 tỷ</div>
              <div className="session-title">Giá Trị Lúc Bán:</div>
              <SolidField
                className="padding-field"
                placeholder="Nhập số tiền lúc bán..."
              />
              <div style={{ height: "28px" }}></div>
              <div className="bottom">
                <div onClick={this.props.close} className="noselect cancel-button">HỦY</div>
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
