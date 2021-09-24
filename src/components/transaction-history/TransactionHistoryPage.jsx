import React, { Component, useState, useEffect } from "react";
import BuyerNavbar from "../global/BuyerNavbar";
import "./transaction-history.css";
import "./transaction-history-mobile.css";
import Constants from "../global/Constants";
import { fb } from "../../services/firebase";
import moment from "moment";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const TransactionHistoryPage = () => {
  var [transactions, setTransactions] = useState([]);
  var [isDetailShown, setIsDetailShown] = useState(false);
  var [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (fb.auth.currentUser === null) {
      return;
    }
    fetch(
      Constants.Buyer.getTransactionHistory(fb.auth.currentUser?.uid, 0)
      // "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/transaction/getTransactionByUserId/QvZgwUs2DlYEHmdlrZITsI88ZIq2/0"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("transaction history data");
          console.log(result);
          setTransactions(result.content);
        },
        (error) => {}
      );
  }, []);

  function renderDetail() {
    return (
      <React.Fragment>
        <div
          onClick={() => {
            setIsDetailShown(false);
          }}
          className="back"
        >
          <ArrowBackIosIcon className="back-icon" />
          Trở lại
        </div>
        <div style={{ height: "20px" }}></div>
        <div className="schedule-row">
          <span className="staff-schedule-title">Chi Tiết Giao Dịch</span>
        </div>
        <div style={{ height: "10px" }}></div>
        <div className="staff-transaction-history-detail-wrapper">
          <div className="schedule-row">
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "rgb(200, 200, 200)",
              }}
            ></div>
          </div>
          <div style={{ height: "10px" }}></div>

          <div className="schedule-row">
            <div>
              <h1 className="title-session primary-blue-color">
                Thông Tin Môi Giới Viên
              </h1>

              <div className="info-user-session">
                <div
                  style={{
                    backgroundImage:
                      "url('" + selectedTransaction?.staffAvatar + "')",
                  }}
                  className="appointment-profile-pic"
                ></div>
                <div className="appointment-profile-right-container">
                  <span className="main-info">
                    Tên: {selectedTransaction?.staffName}
                    {/* {selectedAppoinment.buyer} */}
                  </span>
                  <span className="sub-info">
                    Số điện thoại: {selectedTransaction?.staffPhone}
                    {/* {buyerInfo?.username} */}
                  </span>
                  <span className="sub-info">
                    Email: {selectedTransaction?.staffEmail}
                    {/* {buyerInfo?.email} */}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="title-session primary-blue-color">
                Thông Tin Bên Bán
              </h1>

              <div className="info-user-session">
                <div
                  style={{
                    backgroundImage:
                      "url('" + selectedTransaction?.sellerAvatar + "')",
                  }}
                  className="appointment-profile-pic"
                ></div>
                <div className="appointment-profile-right-container">
                  <span className="main-info">
                    Tên: {selectedTransaction?.sellerName}
                    {/* {selectedAppoinment.seller} */}
                  </span>
                  <span className="sub-info">
                    Số điện thoại: {selectedTransaction?.sellerPhone}
                    {/* {sellerInfo?.username} */}
                  </span>
                  <span className="sub-info">
                    Email: {selectedTransaction?.sellerEmail}
                    {/* {sellerInfo?.email} */}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "10px" }}></div>
          <div className="schedule-row">
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "rgb(200, 200, 200)",
                margin: "0 auto",
              }}
            ></div>
          </div>
          <div style={{ height: "10px" }}></div>
          <div style={{ height: "10px" }}></div>

          <h1 className="title-session2">
            Địa điểm: {selectedTransaction?.streetName}
            {", "}
            {selectedTransaction?.wardName}, {selectedTransaction?.disName}
          </h1>
          <h1 className="title-session2">
            Thoả thuận: {selectedTransaction?.dealPrice} tỷ
          </h1>
          <h1 className="title-session2">
            Thời gian tạo giao dịch:
            {moment(moment(selectedTransaction?.createAt).add(7, 'hours')._d).format("dddd")},{" "}
            {moment(moment(selectedTransaction?.createAt).add(7, 'hours')._d).format("LT")} giờ, ngày{" "}
            {/* {moment(selectedTransaction?.createAt).format("LL")} */}
            {moment(moment(selectedTransaction?.createAt).add(7, 'hours')._d).format("LL")}

            {/* {selectedTransaction?.createAt} */}{" "}
            {/* {moment(selectedTransaction?.createAt).format("dddd")},{" "}
            {moment(selectedTransaction?.createAt).format("LT")} giờ, ngày{" "}
            {moment(selectedTransaction?.createAt).format("LL")} */}
          </h1>
          <h1 className="title-session2">Hình ảnh</h1>
          <div className="staff-transaction-history-image-wrapper">
            {selectedTransaction?.images.map((item) => (
              <div
                style={{ backgroundImage: "url('" + item.imgUrl + "')" }}
                className="image"
              ></div>
            ))}
          </div>
          <div style={{ height: "10px" }}></div>
        </div>
      </React.Fragment>
    );
  }

  function renderTransactionHistory() {
    return (
      <>
        <span className="staff-transaction-history-title">
          Lịch sử giao dịch
        </span>
        <div className="schedule-container">
          {/* <div className="tab-container">
        {tabItems.map((item) => (
          <div
            onClick={() => {
              setSelectedItemKey(item.id);
            }}
            id={item.id}
            key={item.id}
            className="tab-item"
          >
            <span id={"title" + item.id} className="title">
              {item.title}
            </span>
          </div>
        ))}
      </div> */}
          <div className="content-container">
            {transactions?.length === 0 ? (
              <React.Fragment>
                <div className="not-found-container">
                  <div className="not-found"></div>
                  <span>
                    Hiện chưa có thông tin nào cho mục bài viết mà bạn yêu cầu
                  </span>
                  <br />
                  <span>Vui lòng kiểm tra lại thông tin của bạn</span>
                </div>
              </React.Fragment>
            ) : null}
            {transactions?.map((item, index) => (
              <React.Fragment key={index}>
                <div className="date-container">
                  <span className="spec-date">
                    {moment(moment(item.createAt).add(7, "hours")._d).format(
                      "dddd"
                    )}
                    , ngày{" "}
                    {moment(moment(item.createAt).add(7, "hours")._d).format(
                      "LL"
                    )}
                    {/* {moment(item.createAt).format("dddd")}, ngày{" "}
                    {moment(item.createAt).format("LL")} */}
                  </span>
                </div>
                <div className="schedule-time-container">
                  <div className="schedule-time">
                    Lúc{" "}
                    {moment(moment(item.createAt).add(7, "hours")._d).format(
                      "LT"
                    )}{" "}
                    giờ
                    {/* {moment(item.createAt).format("LT")} */}
                  </div>
                  <div className="info">
                    <span>
                      Địa điểm: {item.streetName}, {item.disName},{" "}
                      {item.wardName}
                    </span>
                    <span>Bên môi giới: {item.staffName}</span>
                    <span>Bên bán: {item.sellerName}</span>
                  </div>
                  <div
                    onClick={() => {
                      setIsDetailShown(true);
                      fetch(
                        Constants.Seller.getTransactionDetail(item.id)
                        // "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/transaction/getTransactionByUserId/QvZgwUs2DlYEHmdlrZITsI88ZIq2/0"
                      )
                        .then((res) => res.json())
                        .then(
                          (result) => {
                            console.log("transaction history selected");
                            console.log(result);
                            setSelectedTransaction(result);
                            // setTransactions(result.content);
                          },
                          (error) => {}
                        );
                      // setSelectedTransaction(item);
                    }}
                    className="view-info"
                  >
                    Xem Chi Tiết
                  </div>
                </div>
              </React.Fragment>
            ))}
            {/* <div className="date-container">
                <span className="spec-date">thứ tư 4 tháng 8 năm 2021</span>
                <span className="cal-date">4 ngày trước</span>
              </div>
              <div className="schedule-time-container">
                <div className="schedule-time">Lúc 14:00</div>
                <div className="info">
                  <span>
                    Địa điểm: Trần Hưng Đạo, Phường Nguyễn Cư Trinh, Quận 1
                  </span>
                  <span>Người mua : +84123456789</span>
                </div>
                <div
                  // onClick={() => {
                  //   setIsDetailShown(true);
                  // }}
                  className="view-info"
                >
                  Xem Chi Tiết
                </div>
              </div> */}
          </div>
        </div>
      </>
    );
  }

  return (
    <React.Fragment>
      <div className="staff-transaction-history-wrapper">
        <div className="staff-transaction-history-container">
          {isDetailShown ? renderDetail() : renderTransactionHistory()}
        </div>
      </div>
    </React.Fragment>
  );
};

// class TransactionHistoryPage extends Component {
//   state = {
//     transactions: [],
//   };

//   componentDidMount() {
//     fetch(
//       Constants.Buyer.getTransactionHistory(fb.auth.currentUser?.uid, 0)
//       // "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/transaction/getTransactionByUserId/QvZgwUs2DlYEHmdlrZITsI88ZIq2/0"
//     )
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           console.log("transaction history data");
//           console.log(result);
//           this.setState({
//             transactions: result.content,
//           });
//         },
//         (error) => {}
//       );
//   }

//   render() {
//     return (
//       <React.Fragment>
//         {/* <BuyerNavbar /> */}

//         <div className="history-wrapper">
//           <div className="history-container">
//             <div className="transaction-history-container">
//               <div className="grid-header">Thời gian</div>
//               <div className="grid-header">Địa điểm</div>
//               <div className="grid-header">Bên mua</div>
//               <div className="grid-header">Môi giới viên</div>
//               <div className="grid-header">Ghi chú</div>
//               <div className="grid-header">Số Tiền(tỷ VND)</div>

//               {this.state.transactions.map((transaction, index) => (
//                 <React.Fragment key={index}>
//                   <div className="grid-item">{moment(transaction.createAt).format('DD/MM/yyyy HH:mm')}</div>
//                   <div className="grid-item">
//                     <span>
//                       {transaction.streetName}, {transaction.disName},{" "}
//                       {transaction.wardName}
//                     </span>
//                   </div>
//                   <div className="grid-item">{transaction.sellerName}</div>
//                   <div className="grid-item">{transaction.staffName}</div>
//                   <div className="grid-item">{transaction.note}</div>
//                   <div className="grid-item">{transaction.downPrice}</div>
//                 </React.Fragment>
//               ))}
              
//               {/* <div className="grid-item">7</div>
//               <div className="grid-item">8</div>
//               <div className="grid-item">9</div>
//               <div className="grid-item">10</div>
//               <div className="grid-item">1reg; rhe</div>
//               <div className="grid-item">12</div> */}
//             </div>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

export default TransactionHistoryPage;
