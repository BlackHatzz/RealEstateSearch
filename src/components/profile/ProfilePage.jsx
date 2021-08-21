import React, { Component } from "react";
import BuyerNavbar from "../global/BuyerNavbar";
import "./profile.css";
import "../global/shared.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import { GrContactInfo } from "react-icons/gr";
import { AiFillIdcard } from "react-icons/ai";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import TransactionItem from "./TransactionItem";
import Constants from "../global/Constants";

class ProfilePage extends Component {
  state = {
    tabs: ["Hồ Sơ", "Giao Dịch"],
    selectedIndex: 0,
    transactions: [],
  };

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: 0,
        size: 20,
        userId: "oF91MJ3WgEYUVIpyAh9QfDb2I5y2",
      }),
    };

    fetch(Constants.getTransactionByUserId, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("get transaction from id");

          this.setState({
            transactions: result.content,
          });
          console.log(this.state.transactions);
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
  }

  renderContent = () => {
    switch (this.state.selectedIndex) {
      case 0:
        return (
          <div className="profile-content-container">
            <div className="row">
              <div className="silver-circle">
                <AiFillIdcard className="icon" />
              </div>
              <span className="title">ID</span>
              <div className="read-only-solid-field-container">
                <input
                  value="fSUJL0Vjoraru92zOuLbp0Rcff32"
                  type="text"
                  className="solid-field"
                />
              </div>
            </div>

            <div className="row">
              <div className="silver-circle">
                <PersonIcon className="icon" />
              </div>
              <span className="title">Tài khoản</span>
              <div className="read-only-solid-field-container">
                <input value="huynd123" type="text" className="solid-field" />
              </div>
            </div>

            <div className="row">
              <div className="silver-circle">
                <LockIcon className="icon" />
              </div>
              <span className="title">Mật Khẩu</span>
              <div className="solid-field-container">
                <input value="********" type="text" className="solid-field" />
              </div>
            </div>

            <div className="row">
              <div className="silver-circle">
                <GrContactInfo className="icon" />
              </div>
              <span className="title">Họ Tên</span>
              <div className="solid-field-container">
                <input
                  value="Nguyễn Đức Huy"
                  type="text"
                  className="solid-field"
                />
              </div>
            </div>

            <div className="row">
              <div className="silver-circle">
                <PhoneIcon className="icon" />
              </div>
              <span className="title">Điện Thoại</span>
              <div className="solid-field-container">
                <input value="0123456789" type="text" className="solid-field" />
              </div>
            </div>

            <div className="row">
              <div className="silver-circle">
                <MailIcon className="icon" />
              </div>
              <span className="title">Mail</span>
              <div className="solid-field-container">
                <input
                  value="huynd@gmail.com"
                  type="text"
                  className="solid-field"
                />
              </div>
            </div>
          </div>
        );
      // break;
      case 1:
        return (
          <div className="profile-content-container">
            {this.state.transactions.map((transaction) => (
              <div className="row">
                <TransactionItem transaction={transaction} />
              </div>
            ))}

            {/* <div className="row">
              <TransactionItem />
            </div>
            <div className="row">
              <TransactionItem />
            </div> */}
          </div>
        );
      default:
        break;
    }
  };

  switchTab = (index) => {
    console.log("swt " + index);
    this.setState({
      selectedIndex: index,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="profile-wrapper">
            <div style={{ height: "10px" }}></div>

            <div className="profile-container">
              <div style={{ height: "15px" }}></div>
              <div className="profile-pic-container">
                {/* <img src="https://vi.wikipedia.org/wiki/Cristiano_Ronaldo#/media/T%E1%BA%ADp_tin:Cristiano_Ronaldo_2018.jpg" alt="" /> */}
              </div>
              <div style={{ height: "15px" }}></div>

              <div className="divide"></div>

              <div className="profile-pic-tab-bar-container">
                <div onClick={() => this.switchTab(0)} className="item">
                  <span className="title">Thông Tin Hồ Sơ</span>
                </div>
              </div>

              {this.renderContent()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
