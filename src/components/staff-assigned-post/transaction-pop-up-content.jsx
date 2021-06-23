import React, { Component } from "react";
import "./transaction-pop-up-content.css";
import "../global/shared.css";
import SolidField from "./solid-field";
import "./solid-field.css";
import { RiArrowDropDownLine } from "react-icons/ri";

class TransactionPopUpContent extends Component {
  state = {
    isBuyerMenuShown: false,
    buyerBasicInfos: [],
    // buyerBasicInfos: [
    //   { id: "1", name: "nguyen duc huy 1", profilePicUrl: "thisisurl" },
    //   { id: "2", name: "nguyen duc huy 2", profilePicUrl: "thisisurl" },
    //   { id: "3", name: "nguyen duc huy 3", profilePicUrl: "thisisurl" },
    // ],
    selectedBuyer: null,
    // isTransactionPopupShown: false,
  };

  componentDidMount() {
    
    this.setState({
      buyerBasicInfos: this.props.buyers
    })
  }

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
        <div style={{backgroundImage: "url('" + this.state.selectedBuyer.avatar + "')"}} className="profile-pic">
        </div>
        <div className="info-container">
          <span className="dropdown-item">{this.state.selectedBuyer.buyerName}</span>
          <span className="dropdown-item2">
            ID: {this.state.selectedBuyer.buyerId}
          </span>
        </div>
      </div>
    );
  }

  handleConfirm = () => {
    console.log("confirm");
    this.props.close();
    // create a new transaction by using api
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "title": "Chung Cư Vip",
        "buyerId": "aaaaaaaaa",
        "sellerId": "bbbbbbbbb",
        "staffId": "ddddddddd",
        "realEstateId": 1,
        "downPrice": 23445,
        "createAt": "2021-02-10"
    }),
    };

    fetch("http://localhost:8080/api/v1/transaction", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("create trans");
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error,
          // });
        }
      );

  };

  render() {
    console.log("buyers ");
    console.log(this.props.buyers);

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
              <div className="session-title">Người Bán: {this.props.sellerName}{/*Nguyễn Đức Huy*/}</div>
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
                          key={buyer.buyerId}
                          onClick={() => this.handleBuyerSelection(buyer)}
                          className="dropdown-item padding-field"
                        >
                          <div style={{backgroundImage: "url('" + buyer.avatar + "')" }} className="profile-pic">
                            {/* <img src="" alt="" className="profile-pic" /> */}
                          </div>
                          <div className="info-container">
                            <span className="dropdown-item">{buyer.buyerName}</span>
                            <span className="dropdown-item2">
                              ID: {buyer.buyerId}
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

              <div className="session-title">Giá Trị Ban Đầu: {this.props.price} tỷ</div>
              <div className="session-title">Giá Trị Lúc Bán:</div>
              <SolidField
                className="padding-field"
                placeholder="Nhập số tiền lúc bán..."
              />
              <div style={{ height: "28px" }}></div>
              <div className="bottom">
                <div
                  onClick={this.props.close}
                  className="noselect cancel-button"
                >
                  HỦY
                </div>


                <div
                  onClick={this.handleConfirm}
                  className="noselect confirm-button"
                >
                  XÁC NHẬN
                </div>
                
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
        {/* {this.state.isBuyerMenuShown ? <TickPopup /> : null } */}
      </React.Fragment>
    );
  }
}

export default TransactionPopUpContent;
