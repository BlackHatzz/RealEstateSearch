import React, { useEffect, useState } from "react";
import "./transaction-confirm-form.css";

const TransactionConfirmForm = ({close}) => {
  var [finalPrice, setFinalPrice] = useState();
  var [isNewTransactonCreated, setIsNewTransactonCreated] = useState(false);
  var [fileUrls, setFileUrls] = useState([]);
  var [fileImages, setFileImages] = useState([]);
  var [isConfirmedPopupShown, setIsConfirmedPopupShown] = useState(false);
  var [isBuyerMenuShown, setIsBuyerMenuShown] = useState(false);
  var [selectedConversation, setSelectedConversation] = useState(null);
  var [notesValue, setNotesValue] = useState("");

  const handleFiles = (event) => {
    var tempUrls = [];
    for (var i = 0; i < event.target.files.length; i++) {
      tempUrls.push(URL.createObjectURL(event.target.files[i]));
    }
    setFileUrls([...fileUrls, ...tempUrls]);
    setFileImages([...fileImages, ...event.target.files]);
  };

  return (
    <React.Fragment>
      <div ref={React.createRef()} className="pop-up-box">
        <div className="header">Thông Báo Xác Nhận Giao Dịch</div>
        <div className="divide"></div>

        <div className="content">
          <div
            id="transaction-scroll"
            className="transaction-main-content-container"
          >
            <form
              ref={React.createRef()}
              action=""
              className="transaction-form content-layout"
            >
              <div style={{ paddingTop: "24px" }} className="session-title">
                Bên mua
              </div>

              <div className="dropdown-item padding-field">
                <div
                  style={
                    {
                      // backgroundImage: "url('" + buyerInfo.avatar + "')",
                    }
                  }
                  className="user-profile-pic"
                ></div>
                <div className="info-container">
                  <span className="dropdown-item">
                    Người mua:
                    {/* {buyerInfo.fullname} */}
                  </span>
                  <span className="dropdown-item2">
                    Số điện thoại:
                    {/* {buyerInfo.username} */}
                  </span>
                  <span className="dropdown-item2">
                    Email:
                    {/* {buyerInfo.email} */}
                  </span>
                </div>
              </div>

              <div style={{ paddingTop: "12px" }} className="session-title">
                Bên bán
              </div>
              {/* <p className="transaction-info">
                  {post.realEstate.sellerName}
                </p>
                <p className="transaction-subinfo">
                  ID: {post.realEstate.sellerId}
                </p> */}

              <div className="dropdown-item padding-field">
                <div
                  style={
                    {
                      // backgroundImage: "url('" + sellerInfo.avatar + "')",
                    }
                  }
                  className="user-profile-pic"
                ></div>
                <div className="info-container">
                  <span className="dropdown-item">
                    Người mua:
                    {/* {sellerInfo.fullname} */}
                  </span>
                  <span className="dropdown-item2">
                    Số điện thoại:
                    {/* {sellerInfo.username} */}
                  </span>
                  <span className="dropdown-item2">
                    Email:
                    {/* {sellerInfo.email} */}
                  </span>
                </div>
              </div>

              {/* <div
                  onClick={() => {
                    setIsBuyerMenuShown(!isBuyerMenuShown);
                  }}
                  className="plastic-white transaction-drop-down-container"
                >
                  {selectedConversation == null ? (
                    <React.Fragment>
                      <div className="noselect placeholder">
                        Chọn người mua...
                      </div>
                      <ArrowDropDownIcon className="icon" />
                    </React.Fragment>
                  ) : (
                    <div className="dropdown-item padding-field">
                      <div
                        style={{
                          backgroundImage:
                            "url('" +
                            selectedConversation.data.buyerAvatar +
                            "')",
                        }}
                        className="profile-pic"
                      ></div>
                      <div className="info-container">
                        <span className="dropdown-item">
                          Người mua: {selectedConversation.data.buyer}
                        </span>
                        <span className="dropdown-item2">
                          Thoả thuận: {selectedConversation.data.dealPrice} tỷ
                        </span>
                        <span className="dropdown-item2">
                          Ngày hẹn:{" "}
                          {moment(
                            selectedConversation.data.appointmentDate
                          ).format("LLLL")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {isBuyerMenuShown
                  ? 
                    conversations.map((item, index) => (
                      <div
                        onClick={() => {
                          setIsBuyerMenuShown(false);
                          setSelectedConversation(item);
                        }}
                        key={index}
                      >
                        <div className="plastic-white dropdown-item padding-field">
                          <div
                            style={{
                              backgroundImage:
                                "url('" + item.data.buyerAvatar + "')",
                            }}
                            className="buyer-profile-pic"
                          ></div>
                          <div className="info-container">
                            <span className="dropdown-item">
                              Người mua: {item.data.buyer}
                            </span>
                            <span className="dropdown-item2">
                              Thoả thuận: {item.data.dealPrice} tỷ
                            </span>
                            <span className="dropdown-item2">
                              Ngày hẹn: {item.data.appointmentDate}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            backgroundColor: "rgb(200, 200, 200)",
                            width: "90%",
                            height: "1px",
                            margin: "0 auto",
                          }}
                        ></div>
                      </div>
                    ))
                  : null} */}
              <div style={{ height: "20px" }}></div>
              <div className="session-title">
                Địa chỉ bất động sản:
                {/* {post.realEstate.realEstateNo}{" "}
                {post.realEstate.streetName}, {post.realEstate.wardName},{" "}
                {post.realEstate.disName} */}
                {/* {post.realEstate.price}  */}
              </div>
              <div className="session-title">
                Thoả thuận:
                {/* {appointment.dealprice} tỷ */}
              </div>
              <div className="session-title">
                Ngày hẹn:
                {/* {moment(appointment?.date).format("dddd")},{" "}
                {moment(appointment?.date).format("LT")} giờ, ngày{" "}
                {moment(appointment?.date).format("LL")} */}
              </div>

              {/* <div className="session-title">
                  Giá Trị Ban Đầu: {post.realEstate.price} tỷ
                </div> */}
              {/* <div className="session-title">
                  Thoả thuận: {post.realEstate.offeredPrice} tỷ
                </div> */}

              <div style={{ paddingTop: "12px" }} className="session-title">
                Ghi Chú
              </div>
              <textarea
                ref={React.createRef()}
                id="transaction-notes"
                onChange={(event) => {
                  console.log("changed");
                  console.log(event.target.value);
                  setNotesValue(event.target.value.toString());
                }}
                className="plastic-white2 transaction-textarea"
                placeholder="Nhập ghi chú..."
              ></textarea>

              <div className="session-title">Hình ảnh</div>
              <div className="plastic-white2 transaction-image-container">
                {fileImages.length == 0 ? (
                  <React.Fragment>
                    <input
                      type="file"
                      onChange={handleFiles}
                      className="image-input"
                      multiple="multiple"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <div className="image-first-ui-container">
                      <div className="gallery"></div>
                      <span>Nhấp để chọn hình ảnh</span>
                    </div>
                  </React.Fragment>
                ) : (
                  <div
                    style={{ backgroundImage: "url('" + fileUrls[0] + "')" }}
                    className="selected-file"
                  ></div>
                )}
              </div>
            </form>
          </div>

          <div style={{ height: "28px" }}></div>
          <div className="bottom">
            <div onClick={close} className="noselect cancel-button">
              HỦY
            </div>

            <div
              // onClick={createTransaction}
              onClick={() => {
                setIsConfirmedPopupShown(true);
              }}
              className="noselect confirm-button"
            >
              XÁC NHẬN
            </div>
          </div>
          <div style={{ height: "28px" }}></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TransactionConfirmForm;
