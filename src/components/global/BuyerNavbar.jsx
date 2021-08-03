import React, { useState, useEffect, useContext } from "react";
import "./buyer-nav-bar.css";
import { RiArrowDropDownLine } from "react-icons/ri";
// import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import "../global/shared.css";
import { Link, useHistory } from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";
import { fb } from "../../services";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import moment from "moment";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import { Context } from "../../ChatContext";

const BuyerNavbar = () => {
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
      {/* <div className="nav-bar-wrapper">
        {/* left content 
        <div className="nav-bar-container">
          <div className="nav-bar-item">
            <Link to={role === "buyer" ? "/" : "/sell"}>
              <div className="nav-bar-logo">
                <img src="https://lh3.googleusercontent.com/E2JbcetnAv-pC4ABbv3scT2JgQXJW7OpZIZhoYE-Q7JtPPqWY6ZL3KsgpIhMRZLKeb0U-_aW8TdLRCSSakKEVowDtYxOKaIqu5XHzgJvMrF9xmVftj9Dtwnt1if5LvX54KFcLk-kan_XpkKEJcq3B3ghqfArvg5fa8WHsoM84TJJ6ltCPIpfNuFDC_BbuZoTdeSyNQBb0j8YLT9XsULKxDaMUYxDuasOTBnfzYQwLfzla72jzUuogvBPznZFC-bx91xyACfo9IIwhXJPNiDF6vCLcUSWhw4c8P9DndVHFH8DxC3kvFpG_F9uQWqe-J_mYtHUoAvv8ptUPp4BsOXZU99-8fBgbRSZ2yugg7JvzrjEc8vjfzKijGkjn1fzccUF2HZGzgjDj9hc3yi7XoP2X7kkrmL6w6qfJhSZn_OqHAqTzM5rh8eBt1E9Z2MFlSVB0AYl-I3j3fr5EzuXzFXy2zFJnR6HiBC3GMJP8Y9cL3ztyEfTQ4YGZLQLEhFtg5-VJHVJBjkhHYXec5MmVldo0Us5ACqu2GsChfXeqc2DgNyiGzPaKWJ3rrI9DoOv5EObTfUuk5UmKHi4lvF_aU9kuHO4Bg9NPPF-YnuGq_02Dfvqz7Qi_kdyAYzY-rB6EkSXSOvlkWNhxmA3On6wDJJO4XHn-QedQ0LB8a1mFlyXt3ciF7k9nSSymIjPy0KJB-bF83PQP2C1lk4JSXNAgCEp96s=w1222-h574-no?authuser=1" alt="" />
              </div>
            </Link>
          </div>
        </div>

        {/* right content 
        <div className="nav-bar-container">
          <div className="nav-bar-item" onClick={switchNotification}>
            <Badge color="secondary" badgeContent={unseen}>
              <NotificationsNoneIcon />
            </Badge>
          </div>
          <div className="nav-bar-item-horizontal">
            <div onClick={switchProfileMenu} className="nav-bar-item">
              <div className="profile-pic">

{console.log("avatar", fb.auth.currentUser)}
                <img src={fb.auth.currentUser?.photoURL} alt="" />
              </div>
              <span className="profile-name-text">
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

            {/* profile menu
            {isProfileMenuShown ? (
              <div className="profile-menu-container">
                <Link
                  className="link profile-menu-item top-item"
                  to="/profile-page"
                >
                  <AccountCircleIcon className="icon" />
                  <span className="title">Xem Hồ Sơ</span>
                </Link>
                <div className="divide"></div>
                <Link className="link profile-menu-item" to="/schedule">
                  <EventNoteOutlinedIcon className="icon" />
                  <span className="title">Lịch hẹn</span>
                </Link>
                <div className="divide"></div>
                <Link
                  className="link profile-menu-item"
                  to="/transaction-history-page"
                >
                  <HistoryIcon className="icon" />
                  <span className="title">Lịch Sử Giao Dịch</span>
                </Link>
                <div className="divide"></div>
                <div
                  className="profile-menu-item bottom-item"
                  onClick={() => {
                    resetRole();
                    fb.auth.signOut();
                  }}
                >
                  <ExitToAppIcon className="icon" />
                  <span className="title">Đăng Xuất</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div> */}



      <div className="nav-bar-wrapper">
        {/* left content */}
        <div className="nav-bar-container">
          <div className="nav-bar-item">
            <div className="nav-bar-logo">
              <Link to={role === "buyer" ? "/" : "/sell"}>
                <img src="https://lh3.googleusercontent.com/E2JbcetnAv-pC4ABbv3scT2JgQXJW7OpZIZhoYE-Q7JtPPqWY6ZL3KsgpIhMRZLKeb0U-_aW8TdLRCSSakKEVowDtYxOKaIqu5XHzgJvMrF9xmVftj9Dtwnt1if5LvX54KFcLk-kan_XpkKEJcq3B3ghqfArvg5fa8WHsoM84TJJ6ltCPIpfNuFDC_BbuZoTdeSyNQBb0j8YLT9XsULKxDaMUYxDuasOTBnfzYQwLfzla72jzUuogvBPznZFC-bx91xyACfo9IIwhXJPNiDF6vCLcUSWhw4c8P9DndVHFH8DxC3kvFpG_F9uQWqe-J_mYtHUoAvv8ptUPp4BsOXZU99-8fBgbRSZ2yugg7JvzrjEc8vjfzKijGkjn1fzccUF2HZGzgjDj9hc3yi7XoP2X7kkrmL6w6qfJhSZn_OqHAqTzM5rh8eBt1E9Z2MFlSVB0AYl-I3j3fr5EzuXzFXy2zFJnR6HiBC3GMJP8Y9cL3ztyEfTQ4YGZLQLEhFtg5-VJHVJBjkhHYXec5MmVldo0Us5ACqu2GsChfXeqc2DgNyiGzPaKWJ3rrI9DoOv5EObTfUuk5UmKHi4lvF_aU9kuHO4Bg9NPPF-YnuGq_02Dfvqz7Qi_kdyAYzY-rB6EkSXSOvlkWNhxmA3On6wDJJO4XHn-QedQ0LB8a1mFlyXt3ciF7k9nSSymIjPy0KJB-bF83PQP2C1lk4JSXNAgCEp96s=w1222-h574-no?authuser=1" alt="" />

              </Link>
            </div>
          </div>
          {/* </div> */}

          {/* right content */}
          {/* <div className="nav-bar-container"> */}
          <div className="nav-bar-item" >
            <div className="nav-bar-item-info">
              
              {/* more header item*/}
              <div onClick={switchNotification}>
                <Badge color="secondary" badgeContent={unseen}>
                  <NotificationsNoneIcon />
                </Badge>
              </div>

              <div className="nav-bar-item-horizontal">
                <div onClick={switchProfileMenu} className="nav-bar-item">
                  <div className="profile-pic">

                    {console.log("avatar", fb.auth.currentUser)}
                    <img src={fb.auth.currentUser?.photoURL} alt="" />
                  </div>
                  <span className="profile-name-text">
                    {fb.auth.currentUser?.displayName}
                  </span>
                  <RiArrowDropDownLine style={{ width: "30px", height: "30px" }} />
                </div>
              </div>
            </div>
            <div className="nav-bar-item-hidden">
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
                <div className="profile-menu-container">
                  <Link
                    className="link profile-menu-item top-item"
                    to="/profile-page"
                  >
                    <AccountCircleIcon className="icon" />
                    <span className="title">Xem Hồ Sơ</span>
                  </Link>
                  <div className="divide"></div>
                  <Link className="link profile-menu-item" to="/schedule">
                    <EventNoteOutlinedIcon className="icon" />
                    <span className="title">Lịch hẹn</span>
                  </Link>
                  <div className="divide"></div>
                  <Link
                    className="link profile-menu-item"
                    to="/transaction-history-page"
                  >
                    <HistoryIcon className="icon" />
                    <span className="title">Lịch Sử Giao Dịch</span>
                  </Link>
                  <div className="divide"></div>
                  <div
                    className="profile-menu-item bottom-item"
                    onClick={() => {
                      resetRole();
                      fb.auth.signOut();
                    }}
                  >
                    <ExitToAppIcon className="icon" />
                    <span className="title">Đăng Xuất</span>
                  </div>
                </div>
              ) : null}

            </div>


          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuyerNavbar;
