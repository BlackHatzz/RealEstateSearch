import React, { Component } from "react";
import BuyerNavbar from "../global/BuyerNavbar";
import "./profile.css";
import "../global/shared.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from '@material-ui/icons/Lock';
import { GrContactInfo } from "react-icons/gr";
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

class ProfilePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <BuyerNavbar />
          <div className="profile-wrapper">
            <div style={{ height: "10px" }}></div>

            <div className="profile-container">
              <div style={{ height: "15px" }}></div>
              <div className="profile-pic-container"></div>
              <div style={{ height: "15px" }}></div>

              <div className="divide"></div>

              <div className="profile-pic-tab-bar-container">
                <div className="item">
                  <span className="title">item 2</span>
                </div>
                <div className="item">
                  <span className="title">item 1</span>
                </div>
              </div>

              <div className="profile-content-container">
                <div className="row">
                  <div className="silver-circle">
                    <PersonIcon className="icon" />
                  </div>
                  <span className="title">Tài khoản</span>
                  <div className="solid-field-container">
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
                    <input value="Nguyễn Đức Huy" type="text" className="solid-field" />
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
                    <input value="huynd@gmail.com" type="text" className="solid-field" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
