import React, { Component } from "react";
import "../global/buyer-nav-bar.css";
import { RiArrowDropDownLine } from "react-icons/ri";
// import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import "../global/shared.css";
import { Link } from "react-router-dom";
import HistoryIcon from '@material-ui/icons/History';

class BuyerNavbar extends Component {
  state = {
    isProfileMenuShown: false,
  };

  switchProfileMenu = () => {
    this.setState({
      isProfileMenuShown: !this.state.isProfileMenuShown,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="nav-bar-wrapper">
          {/* left content */}
          <div className="nav-bar-container">
            {/* <div className="nav-bar-item">
              <Link to="/">
                <div className="nav-bar-logo">
                  <img src="https://i.ibb.co/MhLF1VS/abc.png" alt="" />
                </div>
              </Link>
            </div> */}
          </div>

          {/* right content */}
          <div className="nav-bar-container">
            <div className="nav-bar-item">
              <Badge color="secondary" badgeContent={3}>
                <ChatIcon />
              </Badge>
            </div>
            <div className="nav-bar-item">
              <Badge color="secondary" badgeContent={2}>
                <NotificationsIcon />
              </Badge>
            </div>
            <div className="nav-bar-item-horizontal">
              <div onClick={this.switchProfileMenu} className="nav-bar-item">
                <div className="profile-pic"></div>
                <span className="profile-name-text">Nguyen Duc Huy</span>
                <RiArrowDropDownLine
                  style={{ width: "30px", height: "30px" }}
                />
              </div>

              {/* profile menu */}
              {this.state.isProfileMenuShown ? (
                <div className="profile-menu-container">
                  <Link className="link profile-menu-item top-item" to="/profile-page">
                      <AccountCircleIcon className="icon" />
                      <span className="title">Xem Hồ Sơ</span>
                  </Link>
                  <div className="divide"></div>
                  <Link className="link profile-menu-item" to="/transaction-history-page">
                    <HistoryIcon className="icon" />
                    <span className="title">Lịch Sử Giao Dịch</span>
                  </Link>
                  <div className="divide"></div>
                  <div className="profile-menu-item bottom-item">
                    <ExitToAppIcon className="icon" />
                    <span className="title">Đăng Xuất</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BuyerNavbar;
