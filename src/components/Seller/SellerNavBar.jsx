import React, { Component, useState, useEffect, useContext } from "react";
import "../global/buyer-nav-bar.css";
import { RiArrowDropDownLine } from "react-icons/ri";
// import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import "../global/shared.css";
import HistoryIcon from "@material-ui/icons/History";
import "../global/shared.css";
import { Link, useHistory } from "react-router-dom";
import MessageIcon from "@material-ui/icons/Message";

import { fb } from "../../services";

import moment from "moment";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import { Context } from "../../ChatContext";

const SellerNavbar = () => {
  const { role, resetRole, addItem, chats, viewchats, addViewChat } =
    useContext(Context);
  const uuid = fb.auth.currentUser?.uid;

  const [isProfileMenuShown, setIsProfileMenuShown] = useState(false);
  const [notificationTrigger, setNotificationTrigger] = useState(false);
  const [chatTrigger, setChatTrigger] = useState(false);

  const [unseen, setUnseen] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [reals, setReals] = useState([]);

  let history = useHistory();

  const switchProfileMenu = () => {
    setIsProfileMenuShown((value) => !value);
    setNotificationTrigger(false);
    setChatTrigger(false);
  };

  const switchNotification = () => {
    setNotificationTrigger((value) => !value);
    setIsProfileMenuShown(false);
    setChatTrigger(false);
  };

  const switchChat = () => {
    setChatTrigger((value) => !value);
    setIsProfileMenuShown(false);
    setNotificationTrigger(false);
  };

  useEffect(() => {
    if (uuid !== "null") {
      const getNotifications = fb.firestore
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

      if (role === "seller") {
        const getChatData = fb.firestore
          .collection("realestates")
          .where(role + "Id", "==", uuid)
          .where("chats", "!=", [])
          .onSnapshot((snapshot) => {
            setReals(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
        return () => {
          getChatData();
          getNotifications();
        };
      }

      return () => {};
    }
  }, [role, uuid]);

  return (
    <React.Fragment>
      <div className="nav-bar-wrapper">
        {/* left content */}
        <div className="nav-bar-container">
          {/* <div className="nav-bar-item">
            <Link to={role === "buyer" ? "/" : "/sell"}>
              <div className="nav-bar-logo">
                <img src="https://i.ibb.co/MhLF1VS/abc.png" alt="" />
              </div>
            </Link>
          </div> */}
        </div>

        {/* right content */}
        <div className="nav-bar-container">
          <div className="nav-bar-item" onClick={switchChat}>
            <Badge color="secondary" badgeContent={unseen}>
              <MessageIcon />
            </Badge>
          </div>
          <div className="nav-bar-item" onClick={switchNotification}>
            <Badge color="secondary" badgeContent={unseen}>
              <NotificationsIcon />
            </Badge>
          </div>
          <div className="nav-bar-item-horizontal">
            <div onClick={switchProfileMenu} className="nav-bar-item">
              <div className="profile-pic">
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

            {chatTrigger ? (
              <div className="notification-container">
                <h3>Message</h3>
                <br></br>
                <div className="conversation-list">
                  {reals.length > 0 &&
                    reals.map((real) => (
                      <div
                        className="conversation-item"
                        key={real.id}
                        onClick={() => {
                          // addItem(real);
                          // addViewChat(real);
                          // setChatTrigger(false);
                          // fb.firestore
                          //   .collection("conversations")
                          //   .doc(conversation.id)
                          //   .update({
                          //     lastMessageRead: true,
                          //   });
                        }}
                      >
                        <div className="conversation-item-image">
                          <img
                            src="https://file4.batdongsan.com.vn/crop/350x232/2021/06/13/20210613112547-abeb_wm.jpg"
                            alt=""
                          />
                        </div>
                        <div className="conversation-item-info">
                          <p className="conversation-item-info-title">
                            {real.data.title}
                          </p>
                          {/* <p
                            className={
                              conversation.data.lastMessageRead === true
                                ? "conversation-item-info-lastmessage-seen"
                                : "conversation-item-info-lastmessage"
                            }
                          >
                            {conversation.data.lastMessage}
                          </p> */}
                        </div>
                      </div>
                    ))}
                </div>
                {conversations.length === 0 && <div>chua co tin nhan</div>}
                <div className="conversation-bottom"></div>
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
    </React.Fragment>
  );
};

export default SellerNavbar;
