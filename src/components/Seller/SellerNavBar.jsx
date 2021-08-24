import "./seller-navbar.css";
import React, { Component, useState, useEffect, useContext } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";
// import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import "../global/shared.css";
import HistoryIcon from "@material-ui/icons/History";
import { Link, useHistory } from "react-router-dom";
import MessageIcon from "@material-ui/icons/Message";

import { fb } from "../../services";

import moment from "moment";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import { Context } from "../../ChatContext";
import Modal from "@material-ui/core/Modal";

const SellerNavbar = (props) => {
  const { role, resetRole, addItem, chats, viewchats, addViewChat } =
    useContext(Context);

  const { isShowMenu, setShowMenu } = props;

  const uuid = fb.auth.currentUser?.uid;

  const [isProfileMenuShown, setIsProfileMenuShown] = useState(false);
  const [notificationTrigger, setNotificationTrigger] = useState(false);
  const [chatTrigger, setChatTrigger] = useState(false);

  const [unseen, setUnseen] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [reals, setReals] = useState([]);
  const [modalopen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
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
          {!isShowMenu && (
            <div className="logo-container">
              <div
                style={{ width: 30, height: 30, marginRight: 10 }}
                onClick={() => {
                  setShowMenu(!isShowMenu);
                }}
              >
                <MenuIcon style={{ width: 30, height: 30 }} />
              </div>
              <div
                style={{
                  backgroundImage: "url('https://i.ibb.co/cXDw5FW/logo.png')",
                }}
                className="logo-box"
              ></div>
            </div>
          )}
        </div>

        {/* right content */}

        <div className="seller-nav-bar-container">
          <div className="seller-nav-bar-item" onClick={switchNotification}>
            <Badge color="secondary" badgeContent={unseen}>
              <NotificationsNoneIcon
                style={{ width: "30px", height: "30px" }}
              />
            </Badge>
          </div>
          <div className="seller-nav-bar-item-horizontal">
            <div onClick={switchProfileMenu} className="seller-nav-bar-item">
              <div
                style={{
                  backgroundImage:
                    "url('" + fb.auth.currentUser?.photoURL + "')",
                }}
                className="seller-profile-pic"
              >
                {/* <img src={fb.auth.currentUser?.photoURL} alt="" /> */}
              </div>
              <span className="seller-profile-name-text">
                {fb.auth.currentUser?.displayName}
              </span>
              <RiArrowDropDownLine style={{ width: "30px", height: "30px" }} />
            </div>

            {notificationTrigger ? (
              <div className="seller-notification-container">
                <h3>Thông báo</h3>
                <br></br>
                {notifications.length > 0 &&
                  notifications.map((notification) => (
                    <div
                      className="notification-item"
                      key={notification.id}
                      onClick={() => {
                        if (notification.data.content === "new appointment") {
                          history.push("/schedule");
                        }
                        if (notification.data.content === "new transaction") {
                          setModalOpen(true);
                          setModalData(notification);
                        }

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
                        {notification.data.content === "new transaction" && (
                          <>
                            <p className="notification-title-text">
                              Yêu cầu xác nhận giao dịch
                            </p>

                            <p className="notification-title-text">
                              {notification.data.address}
                            </p>
                          </>
                        )}

                        {notification.data.content === "new appointment" && (
                          <>
                            <p className="notification-title-text">
                              {notification.data.title}
                            </p>
                            <p>
                              {moment(notification.data.date).format("L")} -{" "}
                              {moment(notification.data.date).format("LT")}
                            </p>
                          </>
                        )}

                        <p
                          className={
                            notification.data.seen === false
                              ? "notification-time-text"
                              : "notification-time-text-seen"
                          }
                        >
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

            {modalData && (
              <Modal
                open={modalopen}
                //   onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div className="modal-confirm">
                  <h2 id="simple-modal-title">Xác nhận giao dịch</h2>
                  <div id="simple-modal-description">
                    <p>Người mua: {modalData.data.buyer}</p>
                    <p>Người bán: {modalData.data.seller}</p>
                    <p>Địa chỉ bất động sản: {modalData.data.address}</p>
                    <p>Giá thỏa thuận: {modalData.data.dealPrice} tỷ</p>
                    <p>
                      Ngày giao dịch:
                      {moment(modalData.data.appointmentDate).format("LLL")}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        fb.firestore
                          .collection("users")
                          .doc(modalData.data.staffId + "")
                          .collection("transactions")
                          .doc(modalData.data.realId + "")
                          .set(
                            {
                              buyerId: modalData.data.buyerId,
                              sellerId: modalData.data.sellerId,
                              realId: modalData.data.realId,
                              staff: modalData.data.staffId,
                              sellerAccept: true,
                            },
                            { merge: true }
                          );
                        setModalOpen(false);
                      }}
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() => {
                        fb.firestore
                          .collection("users")
                          .doc(modalData.data.staffId + "")
                          .collection("transactions")
                          .doc(modalData.data.realId + "")
                          .set(
                            {
                              buyerId: modalData.data.buyerId,
                              sellerId: modalData.data.sellerId,
                              staff: modalData.data.staffId,
                              realId: modalData.data.realId,
                              sellerAccept: false,
                            },
                            { merge: true }
                          );
                        setModalOpen(false);
                      }}
                    >
                      Từ chối
                    </button>
                    <button
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </Modal>
            )}
            {/* profile menu */}
            {isProfileMenuShown ? (
              <div className="seller-profile-menu-container">
                <Link
                  className="link seller-profile-menu-item top-item"
                  to="/profile-page"
                >
                  <AccountCircleIcon
                    className="icon"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <span className="seller-profile-menu-item-title">
                    Xem Hồ Sơ
                  </span>
                </Link>
                <div className="divide"></div>
                <Link className="link seller-profile-menu-item" to="/schedule">
                  <EventNoteOutlinedIcon
                    className="icon"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <span className="seller-profile-menu-item-title">
                    Lịch hẹn
                  </span>
                </Link>
                <div className="divide"></div>
                <Link
                  className="link seller-profile-menu-item"
                  to="/transaction-history-page"
                >
                  <HistoryIcon
                    className="icon"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <span className="seller-profile-menu-item-title">
                    Lịch Sử Giao Dịch
                  </span>
                </Link>
                <div className="divide"></div>
                <div
                  className="seller-profile-menu-item bottom-item"
                  onClick={() => {
                    resetRole();
                    fb.auth.signOut();
                    window.localStorage.clear();
                  }}
                >
                  <ExitToAppIcon
                    className="icon"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <span className="seller-profile-menu-item-title">
                    Đăng Xuất
                  </span>
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
