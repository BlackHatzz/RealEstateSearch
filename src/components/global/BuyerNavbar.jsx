import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
} from "react";
import "./buyer-nav-bar.css";
import "./buyer-nav-bar-mobile.css";
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
import Modal from "@material-ui/core/Modal";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
const BuyerNavbar = () => {
  const uuid = fb.auth.currentUser?.uid;
  const {
    role,
    resetRole,
    addItem,
    updateSellerRole,
    viewchats,
    addViewChat,
    triggerNewUser,
  } = useContext(Context);
  const [isProfileMenuShown, setIsProfileMenuShown] = useState(false);
  const [notificationTrigger, setNotificationTrigger] = useState(false);
  const [chatTrigger, setChatTrigger] = useState(false);
  const [unseen, setUnseen] = useState(0);
  const [unreadChat, setUnreadChat] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [modalopen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  // const [currentChat, setCurrentChat] = useState();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  let history = useHistory();

  const wrapperRef = useRef(null);
  const chatRef = useRef(null);
  const notiRef = useRef(null);
  const profileRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    notiRef,
    chatRef,
    profileRef,
    setNotificationTrigger,
    setIsProfileMenuShown,
    setChatTrigger
  );

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

  function changeTitle() {
    let title = document.title.slice(-9);
    console.log(document.title);
    document.title = unseen > 0 ? "(" + unseen + ") " + title : title;
  }
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

          changeTitle();
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

        const chatNoti = fb.firestore
          .collection("conversations")
          .where(role + "Id", "==", uuid)
          .where("lastMessageReadBuyer", "==", false)
          .onSnapshot((snapshot) => {
            setUnreadChat(snapshot.size);
          });

        return () => {
          getChatData();
          getNotifications();
          chatNoti();
        };
      }

      return () => {};
    }
  }, [role, unseen, uuid]);

  return (
    <React.Fragment>
      {/* <ChatBubble /> */}
      <SmallChatWindow
        currentChat={viewchats[0]}
        oldChat1={viewchats[1]}
        // oldChat2={viewchats[2]}
        forceUpdate={forceUpdate}
      />

      <div className="nav-bar-wrapper">
        {/* left content */}
        <div className="nav-bar-container">
          <div className="nav-bar-item">
            <div className="nav-bar-logo">
              <Link to={role === "buyer" && "/"}>
                <img src="https://i.ibb.co/cXDw5FW/logo.png" alt="" />
              </Link>
            </div>
          </div>

          {/* right content */}

          <div className="nav-bar-item">
            <div className="nav-bar-item-info">
              <div ref={chatRef} className="nav-bar-item" onClick={switchChat}>
                <Badge color="secondary" badgeContent={unreadChat}>
                  <MessageIcon style={{ width: "30px", height: "30px" }} />
                </Badge>
              </div>

              {/* more header item*/}
              <div ref={notiRef} onClick={switchNotification}>
                <Badge color="secondary" badgeContent={unseen}>
                  <NotificationsNoneIcon
                    style={{ width: "30px", height: "30px" }}
                  />
                </Badge>
              </div>

              <div className="nav-bar-item-horizontal">
                <div
                  ref={profileRef}
                  onClick={switchProfileMenu}
                  className="nav-bar-item"
                >
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
                <div ref={wrapperRef} className="notification-container">
                  <h3>Thông báo</h3>
                  <br></br>
                  <div className="conversation-list">
                    {notifications.length > 0 &&
                      notifications.map((notification) => (
                        <div
                          className="notification-item"
                          key={notification.id}
                          onClick={() => {
                            if (
                              notification.data.content === "new appointment"
                            ) {
                              history.push("/schedule");
                            }
                            if (
                              notification.data.content === "new transaction"
                            ) {
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
                            {notification.data.content ===
                              "new transaction" && (
                              <>
                                <p className="notification-title-text">
                                  Yêu cầu xác nhận giao dịch
                                </p>

                                <p className="notification-title-text">
                                  {notification.data.address}
                                </p>
                              </>
                            )}

                            {notification.data.content ===
                              "new appointment" && (
                              <>
                                <p className="notification-title-text">
                                  Lịch hẹn đã được đặt
                                </p>
                                <p>{notification.data.title}</p>
                                <p>
                                  {moment(notification.data.date).format(
                                    "LLLL"
                                  )}
                                </p>
                                <p>{notification.data.address}</p>
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
                      <p className="modal-transaction-text">
                        Người mua: {modalData.data.buyer}
                      </p>
                      <p className="modal-transaction-text">
                        Người bán: {modalData.data.seller}
                      </p>
                      <p className="modal-transaction-text">
                        Địa chỉ bất động sản: {modalData.data.address}
                      </p>
                      <p className="modal-transaction-text">
                        Giá thỏa thuận: {modalData.data.dealPrice} tỷ
                      </p>
                      <p className="modal-transaction-text">
                        Ngày giao dịch:
                        {moment(modalData.data.appointmentDate).format("LLL")}
                      </p>
                    </div>
                    <div className="transaction-modal-button-group">
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
                                buyerAccept: true,
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
                                buyerAccept: false,
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

              {chatTrigger ? (
                <div ref={wrapperRef} className="notification-container">
                  <h3>Message</h3>
                  <br></br>
                  <div className="conversation-list">
                    {conversations.length > 0 &&
                      conversations
                        .filter((e) => e)
                        .map((conversation) =>
                          conversation.data.lastMessage ? (
                            <div
                              className="conversation-item"
                              key={conversation.id}
                              onClick={() => {
                                // addItem(conversation);
                                addViewChat(conversation);
                                // setCurrentChat(conversation);
                                setChatTrigger(false);

                                fb.firestore
                                  .collection("conversations")
                                  .doc(conversation.id)
                                  .update({
                                    lastMessageReadBuyer: true,
                                  });
                              }}
                            >
                              <div className="conversation-item-image">
                                <img src={conversation.data.realIMG} alt="" />
                              </div>
                              <div className="conversation-item-info">
                                <p className="conversation-item-info-title">
                                  {conversation.data.title}
                                </p>
                                <p
                                  className={
                                    conversation.data.lastMessageReadBuyer ===
                                    true
                                      ? "conversation-item-info-lastmessage-seen"
                                      : "conversation-item-info-lastmessage"
                                  }
                                >
                                  {conversation.data.lastMessage === "lịch hẹn"
                                    ? "Bạn đã đặt 1 lịch hẹn"
                                    : conversation.data.lastMessage}
                                </p>
                              </div>
                            </div>
                          ) : null
                        )}
                  </div>
                  {conversations.length === 0 && <div>chua co tin nhan</div>}
                  <div className="conversation-bottom"></div>
                </div>
              ) : null}

              {/* profile menu */}
              {isProfileMenuShown ? (
                <div ref={wrapperRef} className="profile-menu-container">
                  <div className="user-fullname">
                    <p>{fb.auth.currentUser?.displayName}</p>
                  </div>
                  <Link
                    onClick={() => setIsProfileMenuShown(false)}
                    className="link profile-menu-item top-item"
                    to="/profile-page"
                  >
                    <AccountCircleIcon
                      className="icon"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span className="title">Xem Hồ Sơ</span>
                  </Link>
                  <div className="divide"></div>
                  <Link
                    onClick={() => setIsProfileMenuShown(false)}
                    className="link profile-menu-item"
                    to="/schedule"
                  >
                    <EventNoteOutlinedIcon
                      className="icon"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span className="title">Lịch hẹn</span>
                  </Link>
                  <div className="divide"></div>
                  <Link
                    onClick={() => setIsProfileMenuShown(false)}
                    className="link profile-menu-item"
                    to="/transaction-history-page"
                  >
                    <HistoryIcon
                      className="icon"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span className="title">Lịch Sử Giao Dịch</span>
                  </Link>
                  <div className="divide"></div>
                  <Link
                    onClick={() => updateSellerRole()}
                    className="link profile-menu-item"
                    to="/seller"
                  >
                    <HomeOutlinedIcon
                      className="icon"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span className="title">Đến trang bán</span>
                  </Link>
                  <div className="divide"></div>
                  <div
                    className="profile-menu-item bottom-item"
                    onClick={() => {
                      resetRole();
                      triggerNewUser(false);
                      fb.auth.signOut();
                      window.localStorage.clear();
                    }}
                  >
                    <ExitToAppIcon
                      className="icon"
                      style={{ width: "25px", height: "25px" }}
                    />
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

function useOutsideAlerter(
  ref,
  notiRef,
  chatRef,
  profileRef,
  setNotificationTrigger,
  setIsProfileMenuShown,
  setChatTrigger
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !notiRef.current.contains(event.target)
      ) {
        setNotificationTrigger(false);
      }
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !chatRef.current.contains(event.target)
      ) {
        setChatTrigger(false);
      }
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileMenuShown(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
