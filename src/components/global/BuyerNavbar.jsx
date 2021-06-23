import React, { Component } from "react";
import "./buyer-nav-bar.css";
import { RiArrowDropDownLine } from "react-icons/ri";
// import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";

class BuyerNavbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="nav-bar-wrapper">
          {/* left content */}
          <div className="nav-bar-container">
            <div className="nav-bar-item">
              <div className="nav-bar-logo">
                <img src="https://i.ibb.co/MhLF1VS/abc.png" alt="" />
              </div>
            </div>
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
              <div className="nav-bar-item">
                <div className="profile-pic"></div>
                <span className="profile-name-text">Nguyen Duc Huy</span>
                <RiArrowDropDownLine
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BuyerNavbar;
