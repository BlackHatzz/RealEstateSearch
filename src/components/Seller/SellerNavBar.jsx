import "./seller-navbar.css";
import React, { Component, useState, useEffect, useContext } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
// import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import "../global/shared.css";
import HistoryIcon from "@material-ui/icons/History";
import "../global/shared.css";
import { Link, useHistory } from "react-router-dom";

import { fb } from "../../services";

import moment from "moment";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import { Context } from "../../ChatContext";

const SellerNavbar = (props) => {
  const {isShowMenu, setShowMenu} = props;
  const uuid = fb.auth.currentUser?.uid;
  const { role, resetRole } = useContext(Context);
  const [isProfileMenuShown, setIsProfileMenuShown] = useState(false);
  const [notificationTrigger, setNotificationTrigger] = useState(false);
  const [unseen, setUnseen] = useState(0);
  const [notifications, setNotifications] = useState([]);
  let history = useHistory();

  const switchProfileMenu = () => {
    setIsProfileMenuShown((value) => !value);
    setNotificationTrigger(false);
  };

  const switchNotification = () => {
    setNotificationTrigger((value) => !value);
    setIsProfileMenuShown(false);
  };

  useEffect(() => {
    if (uuid !== "null") {
      const unsubscribe = fb.firestore
        .collection("users")
        .doc(uuid)
        .collection("notifications")
        .orderBy("createAt", "desc")
        .onSnapshot((snapshot) => {
          setNotifications(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setUnseen(
            snapshot.docs.filter((doc) => doc.data().seen === false).length
          );
        });
      return () => {
        unsubscribe();
      };
    }
  }, [uuid]);

  return (
    <React.Fragment>
      <div className="seller-nav-bar-wrapper">
        {/* left content */}
        <div className="seller-nav-bar-container">
          {/* <div className="seller-nav-bar-item">
            <Link to={role === "buyer" ? "/" : "/sell"}>
              <div className="nav-bar-logo">
                <img src="https://i.ibb.co/MhLF1VS/abc.png" alt="" />
              </div>
            </Link>
          </div> */}
          {!isShowMenu &&<div className="logo-container">
            <div style={{ width: 30, height: 30, marginRight: 10 }}  onClick={() => {setShowMenu(!isShowMenu) }}>
                <MenuIcon style={{ width: 30, height: 30 }} />
              </div>
              <img src="logo.png" className="logo-box" />
              
            </div> }
          
        </div>

        {/* right content */}
        <div className="seller-nav-bar-container">
          <div className="seller-nav-bar-item" onClick={switchNotification}>
            <Badge color="secondary" badgeContent={unseen}>
              <NotificationsIcon />
            </Badge>
          </div>
          <div className="seller-nav-bar-item-horizontal">
            <div onClick={switchProfileMenu} className="seller-nav-bar-item">
              <div className="seller-profile-pic">
                <img src={fb.auth.currentUser?.photoURL} alt="" />
              </div>
              <span className="seller-profile-name-text">
                {fb.auth.currentUser?.displayName}
              </span>
              <RiArrowDropDownLine style={{ width: "30px", height: "30px" }} />
            </div>

            {notificationTrigger ? (
              <div className="notification-container">
                <h3>Thông báo</h3>
                <br></br>
                {notifications.length > 0 &&
                  notifications.map((notification) => (
                    <div
                      className="notification-item"
                      key={notification.id}
                      onClick={() => {
                        history.push("/schedule");
                        setNotificationTrigger(false);
                        fb.firestore
                          .collection("users")
                          .doc(uuid)
                          .collection("notifications")
                          .doc(notification.id)
                          .update({
                            seen: true,
                          });
                      }}
                    >
                      <div className="notification-item-left">
                        <p className="notification-title-text">Buổi hẹn mới</p>
                        <p>{moment(notification.data.date).format("L")}</p>
                        <p>{moment(notification.data.date).format("LT")}</p>
                        <p className="notification-time-text">
                          {moment(
                            notification.data.createAt.toDate()
                          ).fromNow()}
                        </p>
                      </div>
                      <div className="notification-item-right">
                        {notification.data.seen === false && (
                          <div className="seen-dot"></div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : null}

            {/* profile menu */}
            {isProfileMenuShown ? (
              <div className="seller-profile-menu-container">
                <Link
                  className="link seller-profile-menu-item top-item"
                  to="/profile-page"
                >
                  <AccountCircleIcon className="icon" />
                  <span className="seller-profile-menu-item-title">Xem Hồ Sơ</span>
                </Link>
                <div className="divide"></div>
                <Link className="link seller-profile-menu-item" to="/schedule">
                  <EventNoteOutlinedIcon className="icon" />
                  <span className="seller-profile-menu-item-title">Lịch hẹn</span>
                </Link>
                <div className="divide"></div>
                <Link
                  className="link seller-profile-menu-item"
                  to="/transaction-history-page"
                >
                  <HistoryIcon className="icon" />
                  <span className="seller-profile-menu-item-title">Lịch Sử Giao Dịch</span>
                </Link>
                <div className="divide"></div>
                <div
                  className="seller-profile-menu-item bottom-item"
                  onClick={() => {
                    resetRole();
                    fb.auth.signOut();
                  }}
                >
                  <ExitToAppIcon className="icon" />
                  <span className="seller-profile-menu-item-title">Đăng Xuất</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SellerNavbar;