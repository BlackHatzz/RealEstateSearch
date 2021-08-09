import "./search-post.css";
import "../global/shared.css";
import React, { useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import moment from "moment";

import SearchIcon from "@material-ui/icons/Search";
import Constants from "../global/Constants";
import {
  ControlPointTwoTone,
  LocalConvenienceStoreOutlined,
  SignalCellularNull,
} from "@material-ui/icons";
import Realestate from "../Chat/Realestate";
import { useHistory } from "react-router";
import Modal from "@material-ui/core/Modal";
import { fb } from "../../services";

  var userId = fb.auth.currentUser?.id;
const SearchPost = () => {
  var [firstLoad, setFirstLoad] = useState(true);
  var [realEstateList, setRealEstateList] = useState([]);
  var [isRealEstateLoaded, setIsRealEstateLoaded] = useState(false);
  var [isBuyersLoaded, setIsBuyersLoaded] = useState(false);
  var [selectedTabItemKey, setSelectedTabItemKey] = useState("tab-item-1"); // first key in tabItemList

  var [paging, setPaging] = useState({
    totalRecord: 0,
    totalPage: 0,
    contentSize: 0,
    pageIndex: 0
  });

  const [tabItemList, setTabItemList] = useState([
    {
      key: "tab-item-1",
      title: "Chưa kiểm duyệt",
      status: "inactive",
      hexColorCode: "#0C67CE",
    },
    {
      key: "tab-item-2",
      title: "Không hợp lệ",
      status: "rejected",
      hexColorCode: "#0C67CE",
    },
    {
      key: "tab-item-3",
      title: "Đã kiểm duyệt",
      status: "active",
      hexColorCode: "#0C67CE",
    },
    {
      key: "tab-item-4",
      title: "Đã bán",
      status: "sold",
      hexColorCode: "#0C67CE",
    },
  ]);

  useEffect(() => {
    console.log("userId old", userId, fb.auth.currentUser)
    userId = fb.auth.currentUser?.uid;
    console.log("user here");
    console.log(userId);
    async function fetchMyAPI(realEstate, index) {
      // console.log("index  " + index);
      let response = await fetch(
        Constants.getTheChosenBuyerByRealEstateRef(realEstate.id)
      );
      let json = await response.json();
      console.log("index  " + index);
      console.log("func " + realEstate.id);
      console.log(json);

      if (response.ok) {
        let myRealEstateList = realEstateList;
        myRealEstateList[index] = {
          realEstate,
          user: json,
        };
        setRealEstateList(myRealEstateList);
        console.log("affeter");
        console.log(realEstateList);
      }
    } 

    if (!isRealEstateLoaded) {
      console.log("userId", userId, fb.auth.currentUser)
      fetch(
        Constants.getRealEstateRefBySellerId(userId, "inactive", 0),
        // "https://api-realestate.top/api/v1/realEstate/getRealEstateBySeller/JvY1p2IyXTSxeKXmF4XeE5lOHkw2/inactive/0"
      )
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            console.log("step 1");
            console.log(result);
            setIsRealEstateLoaded(true);
            // setRealEstateList(result.content);
            let myRealEstateList = [];
          for (var i = 0; i < result.content.length; i++) {
            myRealEstateList.push({
              user: null,
              realEstate: result.content[i],
            });
            setRealEstateList(myRealEstateList);
          };

            let myPaging = {
              totalRecord: result.totalRecord,
              totalPage: result.totalPage,
              contentSize: result.contentSize,
              pageIndex: result.pageIndex,
            }
  
            setPaging(myPaging)
            //   realEstateList = result.content;
            console.log(" step 2 - " + realEstateList.length);
            for (var i = 0; i < realEstateList.length; i++) {

              fetchMyAPI(realEstateList[i].realEstate, i);
             
            }

          },
          (error) => {}
        );
    }



    //   getTheChosenBuyerByRealEstateRef
  }, [isRealEstateLoaded]);

  const callAPIGetAllByPaging = (pageIndex) => {
    fetch(
      Constants.getRealEstateRefBySellerId(userId, "inactive", pageIndex)
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("step 1");
          console.log(result);
          setIsRealEstateLoaded(true);
          // setRealEstateList(result.content);
          let myRealEstateList = [];
          for (var i = 0; i < result.content.length; i++) {
            myRealEstateList.push({
              user: null,
              realEstate: result.content[i],
            });
            setRealEstateList(myRealEstateList);
          };
          let myPaging = {
            totalRecord: result.totalRecord,
            totalPage: result.totalPage,
            contentSize: result.contentSize,
            pageIndex: result.pageIndex,
          }

          setPaging(myPaging)
          //   realEstateList = result.content;
          console.log(" step 2 - " + realEstateList.length);
          // for (var i = 0; i < realEstateList.length; i++) {
          //   console.log(realEstateList[i].realEstate);
          //   console.log("loop");

          // fetchMyAPI(realEstateList[i].realEstate, i);
          //   fetch(
          //     Constants.getTheChosenBuyerByRealEstateRef(realEstateList[i].id)
          //   )
          //     .then((res) => {
          //         console.log("heheh " + i);
          //       if (res.ok) {
          //         return res.json();
          //       }
          //       throw new Error("error getTheChosenBuyerByRealEstateRef API");
          //     })
          //     .then(
          //       (result) => {
          //         console.log("step 3 ");
          //         setIsBuyersLoaded(true);
          //         console.log(i);
          //         console.log(realEstateList[i])
          //       },
          //       (error) => {
          //         console.log(error.message);
          //       }
          //     );
          // }
        },
        (error) => { }
      );
  }
  const renderRealEstateItem = (item, index, link = null) => {
    if (item.realEstate == null) {
      return null;
    }
    const realEstate = item.realEstate;

    if (realEstate.status === "active") {
    }

    function renderStatus(user, realEstate) {
      // status: censored, non-censored, sold-out
      var status = "";
      var title = "";

      if (user != null) {
        status = "sold-out";
        title = "Đã bán";
      } else {
        if (realEstate.status === "inactive") {
          status = "non-censored";
          title = "Chưa kiểm duyệt";
        } else {
          status = "censored";
          title = "Đã kiểm duyệt";
        }
      }

      return (
        <div className={"status-container " + status}>
          <span>{title}</span>
        </div>
      );
    }

    return (
      <div key={index}>
        <RealItem link={link} realEstate={realEstate} />
      </div>
      // <div key={index} className="box">
      //   <div
      //     style={{
      //       backgroundImage: "url(' " + realEstate.images[0].imgUrl + " ')",
      //     }}
      //     className="seller-search-image-container"
      //   >
      //     {/* <img src={realEstate.images[0]} alt="" /> */}
      //   </div>
      //   <div className="content-product-container">
      //     {/* title of product */}
      //     <span className="product-title">
      //       {realEstate.title}
      //       {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG
      //       ĐẸP, GIÁ TỐT */}
      //     </span>

      //     {/* price and area */}
      //     <div className="price-box">
      //       <span className="price">
      //         Giá trị ~
      //         {Math.round((realEstate.price / realEstate.area) * 1000 * 100) /
      //           100}{" "}
      //         triệu/m²
      //       </span>
      //       <span className="price">&#8226;</span>
      //       <span className="area">Diện tích {realEstate.area} m²</span>
      //     </div>

      //     {/* address */}
      //     <span className="address">
      //       Địa chỉ: {realEstate.realEstateNo} {realEstate.streetName},{" "}
      //       {realEstate.wardName}, {realEstate.disName}
      //     </span>

      //     {/* description */}
      //     {/* <div className="description"> */}
      //     {/* Mô tả: {realEstate.description} */}
      //     {/* Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất
      //       liền tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24
      //       tháng. - NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng -
      //       TẶNG gói nội thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU
      //       400Triệu - Khi Thanh Toán Sớm . */}
      //     {/* </div> */}

      //     {realEstate.status === "active" && <div>active</div>}

      //     <div className="other-info">
      //       <div className="uptime">Ngày đăng: {realEstate.createAt}</div>
      //       {/* {renderStatus(item.user, realEstate)} */}
      //       {/* <div className="owner">Người đăng: </div> */}
      //       {/* <div className="product-phone-contact horizontal">
      //     <BsFillChatDotsFill />
      //     <div style={{ width: "12px" }}></div>
      //     <span>&#32;Trò chuyện</span>
      //   </div> */}
      //     </div>
      //   </div>
      // </div>
    );
  };
  const generatePaging = () => {

    let firstTag = <li class={"page-item " + (paging.pageIndex == 0 ? "disabled" : "")}>
      <a class="page-link" onClick={() => callAPIGetAllByPaging(paging.pageIndex - 1)}>Trước</a>
    </li>
    let lastTag = <li class={"page-item " + (paging.totalPage - 1 == paging.pageIndex ? "disabled" : "")}>
      <a class="page-link" onClick={() => callAPIGetAllByPaging(paging.pageIndex + 1)}>Sau</a>
    </li>

    let tags = [firstTag];

    for (let i = 0; i < paging.totalPage; i++) {
      let tag = <li class="page-item">
        <a class="page-link" onClick={() => callAPIGetAllByPaging(i)}>{i + 1}</a>
      </li>;
      let currentIndexTag = <li class="page-item active">
        <span class="page-link">
          {i + 1}
          <span class="sr-only">(current)</span>
        </span>
      </li>;
      if (paging.pageIndex == i) {
        tags.push(currentIndexTag);
      } else {
        tags.push(tag);
      }
    }
    tags.push(lastTag);
    return tags;
  }
  return (
    <React.Fragment>
      <div className="seller-search-post-wrapper">
        <div style={{ height: "30px" }}></div>

        <div className="seller-search-create">
          <div className="seller-title-tab-list">DANH SÁCH BẤT ĐỘNG SẢN</div>
          <div className="plastic-white seller-search-post-search-bar-container">
            <input
              placeholder="Tìm kiếm bất động sản..."
              type="text"
            />
            <SearchIcon className="icon" />
          </div>

          <Link
            to={"/manage-post"}
            className="seller-search-post-create-post"
          >
<<<<<<< HEAD
            <span>+ Đăng Tin Bất Động Sản</span>
=======
            <span>+ Thêm bất động sản</span>
>>>>>>> 5c282245b12c1e18a6c52446f3fa53177eaf8ba9
          </Link>
        </div>


        <div className="seller-tab-container">
          {
            // first reload auto select "new" post
          }
          {tabItemList.map((item) => (
            <div
              onClick={() => {
                // re-render ui
                tabItemList.map((reRenderItem) => {
                  if (reRenderItem.key !== item.key) {
                    // not selected item
                    const tabItemElement = document.getElementById(
                      reRenderItem.key
                    );
                    tabItemElement.style = undefined;
                    // tabItemElement.style.border =
                    //   "3px solid " + reRenderItem.hexColorCode;

                    const titleTabItemElement = document.getElementById(
                      "span-" + reRenderItem.key
                    );
                    titleTabItemElement.style.color = "black";//reRenderItem.hexColorCode;
                  } else {
                    // selected item
                    setSelectedTabItemKey(reRenderItem.key);
                    const tabItemElement = document.getElementById(
                      reRenderItem.key
                    );
                    tabItemElement.style.borderBottomColor =
                      reRenderItem.hexColorCode;
                    tabItemElement.style.fontWeight =
                      "bold";
                    // tabItemElement.style.border =
                    //   "3px solid " + reRenderItem.hexColorCode;

                    const titleTabItemElement = document.getElementById(
                      "span-" + reRenderItem.key
                    );
                    titleTabItemElement.style.color = reRenderItem.hexColorCode;//"white";//
                  }
                });

                // realEstateList = [];
                // get data from database
                fetch(
                  Constants.getRealEstateRefBySellerId(
                    fb.auth.currentUser?.uid,
                    item.status,
                    0
                  )
                )
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      console.log(result);
                      if (result.content.length > 0) {
                        let myRealEstateList = [];

                        for (var i = 0; i < result.content.length; i++) {
                          myRealEstateList.push({
                            realEstate: result.content[i],
                            user: null,
                          });
                        }
                        setRealEstateList(myRealEstateList);
                        let myPaging = {
                          totalRecord: result.totalRecord,
                          totalPage: result.totalPage,
                          contentSize: result.contentSize,
                          pageIndex: result.pageIndex,
                        }
              
                        setPaging(myPaging)
                      } else {
                        setRealEstateList([]);
                      }
                    },
                    (error) => { }
                  );
              }}
              key={item.key}
              id={item.key}
              className={"seller-tab-item " + item.status}
            >
              <span id={"span-" + item.key}>{item.title}</span>
            </div>
          ))}

          {(() => {
            if (firstLoad) {
              // first reload auto select "new" tab (chưa kiểm duyệt)
              // render with different style

              const selectedItem = tabItemList[0];
              console.log(selectedItem);
              const tabItemElement = document.getElementById(selectedItem.key);
              console.log(tabItemElement);
              if (tabItemElement != null) {
                tabItemElement.style.borderBottomColor =
                  selectedItem.hexColorCode;
                tabItemElement.style.fontWeight =
                  "bold";
                // tabItemElement.style.border =
                //   "3px solid " + selectedItem.hexColorCode;

                const titleTabItemElement = document.getElementById(
                  "span-" + selectedItem.key
                );
                titleTabItemElement.style.color = selectedItem.hexColorCode//"white";

                setFirstLoad(false);
              }
            }
          })()}



          <div style={{flex: 1, textAlign: "right", marginRight: "12%"}}>
            Tổng số bài đăng: {paging.totalRecord} bài
            </div>
        </div>
        <div className="seller-search-list-search-result">
          <div className="seller-search-list-search-container">
            {realEstateList.length > 0 ? (
              realEstateList.map((item, index) => {
                var link = null;
                if (selectedTabItemKey === tabItemList[1].key) {
                  link = "/seller-update-post/" + item.realEstate.id;
                }
                return renderRealEstateItem(item, index, link);
              })
            ) : (
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
            )}
            <ul class="pagination justify-content-center" style={{ transform: ["translateX(-50%)"], marginLeft: "50%" }}>

              {generatePaging().map(val => val)}
            </ul>
          </div>



        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPost;

const RealItem = ({ realEstate, link = null }) => {
  const [conversations, setConversations] = useState([]);
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (conversation) => {
    setOpen(true);
    setModalData(conversation);
  };
  const handleSold = (conversation) => {
    let id = realEstate.id + "";
    fb.firestore.collection("realestates").doc(id).set(
      {
        status: "closed",
        finalBuyer: conversation.data.buyer,
        finalBuyerId: conversation.data.buyerId,
        finalPrice: conversation.data.dealPrice,
      },
      { merge: true }
    );

    fb.firestore.collection("realestates").doc(id).update({
      status: "sold",
    });
    console.log(parseInt(realEstate.id));
    console.log(conversation.data.buyerId);
    fetch("https://api-realestate.top/api/v1/realEstate/updateBuyerId", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: conversation.data.buyerId,
        id: parseInt(realEstate.id),
      }),
    }).then((response) => {
      console.log(response);
    });

    handleClose();
  };
  useEffect(() => {
    const unsubscribe = fb.firestore
      .collection("conversations")
      .where("realId", "==", realEstate.id)
      .onSnapshot((snap) => {
        setConversations(
          snap.docs
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
            .filter((e) => e.data.deal === "accepted")
        );
      });

    return () => {
      unsubscribe();
    };
  }, [realEstate.id]);
  return (

    //   <div className="box">
    //     <div
    //       style={{
    //         backgroundImage: "url(' " + realEstate.images[0].imgUrl + " ')",
    //       }}
    //       className="seller-search-image-container"
    //     >
    //       {/* <img src={realEstate.images[0]} alt="" /> */}
    //     </div>
    //     <div className="content-product-container">
    //       {/* title of product */}
    //       <span className="product-title">
    //         {realEstate.title}
    //         {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG
    //     ĐẸP, GIÁ TỐT */}
    //       </span>

    //       {/* price and area */}
    //       <div className="price-box">
    //         <span className="price">
    //           Giá trị ~
    //           {Math.round((realEstate.price / realEstate.area) * 1000 * 100) /
    //             100}{" "}
    //           triệu/m²
    //         </span>
    //         <span className="price">&#8226;</span>
    //         <span className="area">Diện tích {realEstate.area} m²</span>
    //       </div>

    //       {/* address */}
    //       <span className="address">
    //         Địa chỉ: {realEstate.realEstateNo} {realEstate.streetName},{" "}
    //         {realEstate.wardName}, {realEstate.disName}
    //       </span>

    //       {/* description */}
    //       {/* <div className="description"> */}
    //       {/* Mô tả: {realEstate.description} */}
    //       {/* Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất
    //     liền tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24
    //     tháng. - NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng -
    //     TẶNG gói nội thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU
    //     400Triệu - Khi Thanh Toán Sớm . */}
    //       {/* </div> */}

    //       {realEstate.status === "active" && (
    //         <div className="real-post-item-buyer-list">
    //           {conversations.length > 0 && (
    //             <p className="real-post-item-buyer-list-header">Thỏa thuận</p>
    //           )}
    //           {conversations.map((conversation) => (
    //             <div className="real-post-item-buyer">
    //               <div className="real-post-item-buyer-info">
    //                 <p>{conversation.data.buyer}</p>
    //                 <p className="real-post-item-buyer-deal">
    //                   Thỏa thuận: {conversation.data.dealPrice} tỷ
    //                 </p>
    //                 <div className="real-post-item-buyer-book">
    //                   <p>
    //                     Lịch hẹn:{" "}
    //                     {conversation.data.appointmentDate
    //                       ? moment(conversation.data.appointmentDate).calendar()
    //                       : "Chưa có"}
    //                   </p>
    //                 </div>
    //               </div>

    //               <button
    //                 className="close-sale-button"
    //                 type="button"
    //                 onClick={() => handleOpen(conversation)}
    //               >
    //                 bán
    //               </button>
    //               {modalData ? (
    //                 <Modal
    //                   open={open}
    //                   //   onClose={handleClose}
    //                   aria-labelledby="simple-modal-title"
    //                   aria-describedby="simple-modal-description"
    //                 >
    //                   <div className="modal-confirm">
    //                     <h2 id="simple-modal-title">Xác nhận bán</h2>
    //                     <div id="simple-modal-description">
    //                       <p>Người mua {modalData.data.buyer}</p>
    //                       <p>Thỏa thuận: {modalData.data.dealPrice} tỷ</p>
    //                     </div>
    //                     <div>
    //                       <button onClick={() => handleSold(modalData)}>
    //                         Xác nhận
    //                       </button>
    //                       <button onClick={handleClose}>Hủy</button>
    //                     </div>
    //                   </div>
    //                 </Modal>
    //               ) : null}
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       <div className="other-info">
    //         <div className="uptime">Ngày đăng: {realEstate.createAt}</div>
    //         {/* {renderStatus(item.user, realEstate)} */}
    //         {/* <div className="owner">Người đăng: </div> */}
    //         {/* <div className="product-phone-contact horizontal">
    //   <BsFillChatDotsFill />
    //   <div style={{ width: "12px" }}></div>
    //   <span>&#32;Trò chuyện</span>
    // </div> */}
    //       </div>
    //     </div>
    //   </div>
    <Link to={link == null ? "#" : link} className="box link">
      <div
        style={{
          backgroundImage: "url(' " + realEstate.images[0].imgUrl + " ')",
        }}
        className="seller-search-image-container"
      >
        {/* <img src={realEstate.images[0]} alt="" /> */}
      </div>
      <div className="content-product-container">
        {/* title of product */}
        <span className="product-title">
          {realEstate.title}
          {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG

            ĐẸP, GIÁ TỐT */}
        </span>

        {/* price and area */}
        <div className="price-box">
          <span className="price">
            Giá trị ~
            {Math.round((realEstate.price / realEstate.area) * 1000 * 100) /
              100}{" "}
            triệu/m²
          </span>
          <span className="price">&#8226;</span>
          <span className="area">Diện tích {realEstate.area} m²</span>
        </div>

        {/* address */}
        <span className="address">
          Địa chỉ: {realEstate.realEstateNo} {realEstate.streetName},{" "}
          {realEstate.wardName}, {realEstate.disName}
        </span>


        {/* description */}
        <div className="description">
          {/* Mô tả: {realEstate.description} */}

          {/* Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất

            liền tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24
            tháng. - NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng -
            TẶNG gói nội thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU
            400Triệu - Khi Thanh Toán Sớm . */}
        </div>

        {realEstate.status === "active" && (
          <div className="real-post-item-buyer-list">
            {conversations.length > 0 && (
              <p className="real-post-item-buyer-list-header">Thỏa thuận</p>
            )}
            {conversations.map((conversation) => (
              <div className="real-post-item-buyer">
                <div className="real-post-item-buyer-info">
                  <p>{conversation.data.buyer}</p>
                  <p className="real-post-item-buyer-deal">
                    Thỏa thuận: {conversation.data.dealPrice} tỷ
                  </p>
                  <div className="real-post-item-buyer-book">
                    <p>
                      Lịch hẹn:{" "}
                      {conversation.data.appointmentDate
                        ? moment(conversation.data.appointmentDate).calendar()
                        : "Chưa có"}
                    </p>
                  </div>
                </div>

                <button
                  className="close-sale-button"
                  type="button"
                  onClick={() => handleOpen(conversation)}
                >
                  bán
                </button>
                {modalData ? (
                  <Modal
                    open={open}
                    //   onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div className="modal-confirm">
                      <h2 id="simple-modal-title">Xác nhận bán</h2>
                      <div id="simple-modal-description">
                        <p>Người mua {modalData.data.buyer}</p>
                        <p>Thỏa thuận: {modalData.data.dealPrice} tỷ</p>
                      </div>
                      <div>
                        <button onClick={() => handleSold(modalData)}>
                          Xác nhận
                        </button>
                        <button onClick={handleClose}>Hủy</button>
                      </div>
                    </div>
                  </Modal>
                ) : null}
              </div>
            ))}
          </div>
        )}

        <div className="other-info">

          <div className="uptime"> {/* Ngày đăng:  */}{
moment(realEstate.createAt).calendar()}</div>
          {/* {renderStatus(item.user, realEstate)} */}
          {/* <div className="owner">Người đăng: </div> */}
          {/* <div className="product-phone-contact horizontal">
          <BsFillChatDotsFill />
          <div style={{ width: "12px" }}></div>
          <span>&#32;Trò chuyện</span>
        </div> */}
        </div>
      </div>
    </Link>
  );
};
