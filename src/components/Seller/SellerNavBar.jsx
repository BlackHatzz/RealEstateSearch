import "./seller-navbar.css";
import React, { useState, useEffect, useContext, useRef } from "react";

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
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { fb } from "../../services";

import moment from "moment";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import { Context } from "../../ChatContext";
import Modal from "@material-ui/core/Modal";

const SellerNavbar = (props) => {
  const { role, resetRole, updateBuyerRole } = useContext(Context);

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
  const [profileData, setProfileData] = useState();

  let history = useHistory();

  const wrapperRef = useRef(null);
  // const chatRef = useRef(null);
  const notiRef = useRef(null);
  const profileRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    notiRef,
    // chatRef,
    profileRef,
    setNotificationTrigger,
    setIsProfileMenuShown
    // setChatTrigger
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

  // const switchChat = () => {
  //   setChatTrigger((value) => !value);
  //   setIsProfileMenuShown(false);
  //   setNotificationTrigger(false);
  // };

  useEffect(() => {
    fb.firestore
      .collection("users")
      .doc(fb.auth.currentUser?.uid + "")
      .onSnapshot((doc) => {
        setProfileData(doc.data());
      });
  }, []);

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
          <div className="nav-bar-item">
            {!isShowMenu && (
              <>
                <div
                  onClick={() => {
                    setShowMenu(!isShowMenu);
                  }}
                  className="drawer-btn-menu"
                >
                  <MenuIcon style={{ width: 30, height: 30 }} />
                </div>
                <div className="nav-bar-logo">
                  <Link to={"/"}>
                    <img src="https://i.ibb.co/cXDw5FW/logo.png" alt="" />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* right content */}
          <div className="nav-bar-item">
            <div className="nav-bar-item-info">
              <div
                ref={notiRef}
                className="nav-bar-item"
                onClick={switchNotification}
              >
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
                      backgroundImage: "url('" + profileData?.photoURL + "')",
                    }}
                    className="profile-pic"
                  >
                    {/* <img src={fb.auth.currentUser?.photoURL} alt="" /> */}
                  </div>
                  <span className="profile-name-text">
                    {profileData?.displayName}
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
                  <h3>Th??ng b??o</h3>
                  <br></br>
                  {notifications.length > 0 &&
                    notifications.map((notification) => (
                      <div
                        className="notification-item"
                        key={notification.id}
                        onClick={() => {
                          if (notification.data.content === "new appointment") {
                            history.push("/seller/schedule");
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
                                Y??u c???u x??c nh???n giao d???ch
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

              {modalData && (
                <Modal
                  open={modalopen}
                  //   onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div className="modal-confirm">
                    <h2 id="simple-modal-title">X??c nh???n giao d???ch</h2>
                    <div id="simple-modal-description">
                      <h4>Th??ng tin ng?????i mua</h4>
                      <p className="modal-transaction-text">
                        T??n: {modalData.data.buyer}
                      </p>
                      <p className="modal-transaction-text">
                        S??T: {modalData.data?.buyerPhone || ""}
                      </p>
                      <h4>Th??ng tin ng?????i b??n</h4>
                      <p className="modal-transaction-text">
                        T??n: {modalData.data.seller}
                      </p>
                      <p className="modal-transaction-text">
                        S??T: {modalData.data?.sellerPhone || ""}
                      </p>
                      <h4>Th??ng tin b???t ?????ng s???n</h4>
                      <p className="modal-transaction-text">
                        ?????a ch???: {modalData.data.address}
                      </p>
                      <p className="modal-transaction-text">
                        Gi?? th???a thu???n: {modalData.data.dealPrice} t???
                      </p>
                      <p className="modal-transaction-text">
                        Ng??y giao d???ch:
                        {" " +
                          moment(modalData.data.appointmentDate).format("LL")}
                      </p>
                      <h4>N???i dung giao d???ch</h4>
                      <p className="modal-transaction-text">
                        {modalData.data.description}
                      </p>
                      <div className="modal-transaction-image">
                        {modalData.data.images.map((image) => (
                          <img src={`data:image/*;base64,${image}`} alt="" />
                        ))}
                      </div>
                    </div>
                    {modalData.data?.status === "failed" && (
                      <p>
                        ???? qu?? th???i h???n x??c nh???n giao d???ch, vui l??ng li??n h??? v???i
                        nh??n vi??n ????? ???????c t?? v???n
                      </p>
                    )}

                    <div className="transaction-modal-button-group">
                      {modalData.data?.status === "active" && (
                        <>
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
                                )
                                .then(() => {
                                  fb.firestore
                                    .collection("users")
                                    .doc(uuid)
                                    .collection("notifications")
                                    .doc(modalData.data.id + "")
                                    .update({
                                      status: "accepted",
                                    });
                                });
                              setModalOpen(false);
                            }}
                          >
                            X??c nh???n
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
                                )
                                .then(() => {
                                  fb.firestore
                                    .collection("users")
                                    .doc(uuid)
                                    .collection("notifications")
                                    .doc(modalData.data.id + "")
                                    .update({
                                      status: "rejected",
                                    });
                                });
                              setModalOpen(false);
                            }}
                          >
                            T??? ch???i
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => {
                          setModalOpen(false);
                        }}
                      >
                        ????ng
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
              {/* profile menu */}
              {isProfileMenuShown ? (
                <div ref={wrapperRef} className="profile-menu-container">
                  <div className="user-fullname">
                    <p>{fb.auth.currentUser?.displayName}</p>
                  </div>
                  {/* <Link
                    onClick={() => setIsProfileMenuShown(false)}
                    className="link profile-menu-item top-item"
                    to="/profile-page"
                  >
                    <AccountCircleIcon
                      className="icon"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span className="title">Xem H??? S??</span>
                  </Link>
                  <div className="divide"></div> */}

                  <Link
                    onClick={() => {
                      updateBuyerRole();
                    }}
                    className="link profile-menu-item top-item"
                    to="/"
                  >
                    <HomeOutlinedIcon
                      className="icon"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <span className="title">?????n trang mua</span>
                  </Link>
                  <div className="divide"></div>
                  <div
                    className="profile-menu-item bottom-item"
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
                    <span className="title">????ng Xu???t</span>
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

export default SellerNavbar;
function useOutsideAlerter(
  ref,
  notiRef,
  // chatRef,
  profileRef,
  setNotificationTrigger,
  setIsProfileMenuShown
  // setChatTrigger
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
      // if (
      //   ref.current &&
      //   !ref.current.contains(event.target) &&
      //   !chatRef.current.contains(event.target)
      // ) {
      //   setChatTrigger(false);
      // }
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
