import React, { useEffect, useState, useCallback } from "react";
import "./search-post.css";
import "../global/shared.css";
import SearchIcon from "@material-ui/icons/Search";
import Constants from "../global/Constants";
import {
  ControlPointTwoTone,
  LocalConvenienceStoreOutlined,
} from "@material-ui/icons";
import Realestate from "../Chat/Realestate";
import { useHistory } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const SearchPost = () => {
  var [firstLoad, setFirstLoad] = useState(true);
  var [realEstateList, setRealEstateList] = useState([]);
  var [isRealEstateLoaded, setIsRealEstateLoaded] = useState(false);
  var [isBuyersLoaded, setIsBuyersLoaded] = useState(false);
  const [tabItemList, setTabItemList] = useState([
    {
      key: "tab-item-1",
      title: "chưa kiểm duyệt",
      status: "inactive",
      hexColorCode: "#919191",
    },
    {
      key: "tab-item-2",
      title: "không hợp lệ",
      status: "rejected",
      hexColorCode: "#EA6863",
    },
    {
      key: "tab-item-3",
      title: "đã kiểm duyệt",
      status: "active",
      hexColorCode: "#05c19c",
    },
    {
      key: "tab-item-4",
      title: "đã bán",
      status: "sold",
      hexColorCode: "#249cd7",
    },
  ]);

  useEffect(() => {
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
        realEstateList[index] = {
          realEstate,
          user: json,
        };
        await setRealEstateList([...realEstateList]);
        console.log("affeter");
        console.log(realEstateList);
      }
    }

    if (!isRealEstateLoaded) {
      fetch(
        "https://api-realestate.top/api/v1/realEstate/getRealEstateBySeller/JvY1p2IyXTSxeKXmF4XeE5lOHkw2/inactive/0"
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
            for (var i = 0; i < result.content.length; i++) {
              realEstateList[i] = {
                user: null,
                realEstate: result.content[i],
              };
              setRealEstateList([...realEstateList]);
            }

            //   realEstateList = result.content;
            console.log(" step 2 - " + realEstateList.length);
            for (var i = 0; i < realEstateList.length; i++) {
              console.log(realEstateList[i].realEstate);
              console.log("loop");

              fetchMyAPI(realEstateList[i].realEstate, i);
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
            }

            //     fetch(Constants.getTheChosenBuyerByRealEstateRef(realEstateList[i].id))
            //   .then((res) => res.json())
            //   .then(
            //     (result) => {
            //       console.log("step 3");
            //       setIsBuyersLoaded(true);
            //       console.log(result);
            //     },
            //     (error) => {}
            //   );
          },
          (error) => {}
        );
    }

    // if (!isBuyersLoaded) {
    //   for (var i = 0; realEstateList.length; i++) {
    // fetch(Constants.getTheChosenBuyerByRealEstateRef("1"))
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log("step 3");
    //       setIsBuyersLoaded(true);
    //       console.log(result);
    //     },
    //     (error) => {}
    //   );
    //   }
    // }

    //   getTheChosenBuyerByRealEstateRef
  }, [isRealEstateLoaded, realEstateList]);

  const renderRealEstateItem = (item, index) => {
    if (item.realEstate == null) {
      return null;
    }
    const realEstate = item.realEstate;

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
      <div key={index} className="box">
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
            Mô tả: {realEstate.description}
            {/* Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất
            liền tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24
            tháng. - NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng -
            TẶNG gói nội thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU
            400Triệu - Khi Thanh Toán Sớm . */}
          </div>

          <div className="other-info">
            <div className="uptime">Ngày đăng: {realEstate.createAt}</div>
            {/* {renderStatus(item.user, realEstate)} */}
            {/* <div className="owner">Người đăng: </div> */}
            {/* <div className="product-phone-contact horizontal">
          <BsFillChatDotsFill />
          <div style={{ width: "12px" }}></div>
          <span>&#32;Trò chuyện</span>
        </div> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="seller-search-post-wrapper">
        <div style={{ height: "30px" }}></div>
        <div className="plastic-white seller-search-post-search-bar-container">
          <SearchIcon className="icon" />
          <input
            placeholder="Tìm kiếm tên, địa điểm bất động sản..."
            type="text"
          />
        </div>

        <Link
          to={"/manage-post"}
          className="confirm-green noselect seller-search-post-create-post"
        >
          <span>Tạo bài viết</span>
        </Link>

        <div className="seller-title-tab-list">Danh sách bài viết</div>

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
                    tabItemElement.style.backgroundColor = "transparent";
                    tabItemElement.style.border =
                      "3px solid " + reRenderItem.hexColorCode;

                    const titleTabItemElement = document.getElementById(
                      "span-" + reRenderItem.key
                    );
                    titleTabItemElement.style.color = reRenderItem.hexColorCode;
                  } else {
                    // selected item
                    const tabItemElement = document.getElementById(
                      reRenderItem.key
                    );
                    tabItemElement.style.backgroundColor =
                      reRenderItem.hexColorCode;
                    tabItemElement.style.border =
                      "3px solid " + reRenderItem.hexColorCode;

                    const titleTabItemElement = document.getElementById(
                      "span-" + reRenderItem.key
                    );
                    titleTabItemElement.style.color = "white";
                  }
                });

                // get data from database
                fetch(
                  Constants.getRealEstateRefBySellerId(
                    "JvY1p2IyXTSxeKXmF4XeE5lOHkw2",
                    item.status,
                    0
                  )
                )
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      console.log(result);
                      if (result.content.length > 0) {
                        for (var i = 0; i < result.content.length; i++) {
                          realEstateList[i] = {
                            realEstate: result.content[i],
                            user: null,
                          };
                        }
                        setRealEstateList([...realEstateList]);
                      } else {
                        setRealEstateList([]);
                      }
                    },
                    (error) => {}
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
                tabItemElement.style.backgroundColor =
                  selectedItem.hexColorCode;
                tabItemElement.style.border =
                  "3px solid " + selectedItem.hexColorCode;

                const titleTabItemElement = document.getElementById(
                  "span-" + selectedItem.key
                );
                titleTabItemElement.style.color = "white";

                setFirstLoad(false);
              }
            }
          })()}

          {(() => {})()}
          {/* <div className="seller-tab-item new"><span>Chưa kiểm duyệt</span></div>
            <div className="seller-tab-item rejected"><span>Không hợp lệ</span></div>
            <div className="seller-tab-item accepted"><span>Đã Kiểm duyệt</span></div>
            <div className="seller-tab-item inactive"><span></span></div>
            <div className="seller-tab-item sold-out"><span>Đã bán</span></div> */}
        </div>

        <div className="seller-search-list-search-container">
          {realEstateList.length > 0 ? (
            realEstateList.map((item, index) => {
              return renderRealEstateItem(item, index);
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPost;
