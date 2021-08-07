import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
} from "react";
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
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import moment from "moment";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import { Context } from "../../ChatContext";
import MessageIcon from "@material-ui/icons/Message";
import ChatBubble from "../Chat/ChatBubble";
import SmallChatWindow from "../Chat/SmallChatWindow";

const BuyerNavbar = () => {
  const uuid = fb.auth.currentUser?.uid;
  const { role, resetRole, addItem, chats, viewchats, addViewChat } =
    useContext(Context);
  const [isProfileMenuShown, setIsProfileMenuShown] = useState(false);
  const [notificationTrigger, setNotificationTrigger] = useState(false);
  const [chatTrigger, setChatTrigger] = useState(false);
  const [unseen, setUnseen] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
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

      if (role === "buyer") {
        const getChatData = fb.firestore
          .collection("conversations")
          .where(role + "Id", "==", uuid)
          .orderBy("lastvisit", "desc")
          .onSnapshot((snapshot) => {
            setConversations(
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
      <ChatBubble />
      <SmallChatWindow
        currentChat={viewchats[0]}
        oldChat1={viewchats[1]}
        oldChat2={viewchats[2]}
        forceUpdate={forceUpdate}
      />

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
          <div className="nav-bar-item" onClick={switchChat}>
            <Badge color="secondary" badgeContent={unseen}>
              <MessageIcon />
            </Badge>
          </div>
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
                <div className="conversation-list">
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
                          <p className="notification-title-text">
                            Buổi hẹn mới
                          </p>
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
              </div>
            ) : null}

            {chatTrigger ? (
              <div className="notification-container">
                <h3>Message</h3>
                <br></br>
                <div className="conversation-list">
                  {conversations.length > 0 &&
                    conversations.map((conversation) => (
                      <div
                        className="conversation-item"
                        key={conversation.id}
                        onClick={() => {
                          addItem(conversation);
                          setCurrentChat(conversation);
                          addViewChat(conversation);
                          setChatTrigger(false);

                          fb.firestore
                            .collection("conversations")
                            .doc(conversation.id)
                            .update({
                              lastMessageRead: true,
                            });
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
                            {conversation.data.title}
                          </p>
                          <p
                            className={
                              conversation.data.lastMessageRead === true
                                ? "conversation-item-info-lastmessage-seen"
                                : "conversation-item-info-lastmessage"
                            }
                          >
                            {conversation.data.lastMessage}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                {conversations.length === 0 && <div>chua co tin nhan</div>}
                <div className="conversation-bottom"></div>
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
                <img src="https://i.ibb.co/cXDw5FW/logo.png" alt="" />
              </Link>
            </div>
          </div>
          {/* </div> */}

          {/* right content */}
          {/* <div className="nav-bar-container"> */}
          <div className="nav-bar-item">
            <div className="nav-bar-item-info">
              <div className="nav-bar-item" onClick={switchChat}>
                <Badge color="secondary" badgeContent={unseen}>
                  <MessageIcon style={{ width: "30px", height: "30px" }} />
                </Badge>
              </div>

              {/* more header item*/}
              <div onClick={switchNotification}>
                <Badge color="secondary" badgeContent={unseen}>
                  <NotificationsNoneIcon
                    style={{ width: "30px", height: "30px" }}
                  />
                </Badge>
              </div>

              <div className="nav-bar-item-horizontal">
                <div onClick={switchProfileMenu} className="nav-bar-item">
                  <div
                    style={{
                      backgroundImage:
                        "url('" + fb.auth.currentUser?.photoURL + "')",
                    }}
                    className="profile-pic"
                  ></div>
                  <span className="profile-name-text">
                    {fb.auth.currentUser?.displayName}
                  </span>
                  <RiArrowDropDownLine
                    style={{ width: "30px", height: "30px" }}
                  />
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
                          <p className="notification-title-text">
                            Buổi hẹn mới
                          </p>
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
                    {conversations.length > 0 &&
                      conversations.map((conversation) => (
                        <div
                          className="conversation-item"
                          key={conversation.id}
                          onClick={() => {
                            addItem(conversation);
                            setCurrentChat(conversation);
                            addViewChat(conversation);
                            setChatTrigger(false);

                            fb.firestore
                              .collection("conversations")
                              .doc(conversation.id)
                              .update({
                                lastMessageRead: true,
                              });
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
                              {conversation.data.title}
                            </p>
                            <p
                              className={
                                conversation.data.lastMessageRead === true
                                  ? "conversation-item-info-lastmessage-seen"
                                  : "conversation-item-info-lastmessage"
                              }
                            >
                              {conversation.data.lastMessage}
                            </p>
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
      </div>
    </React.Fragment>
  );
};

export default BuyerNavbar;
