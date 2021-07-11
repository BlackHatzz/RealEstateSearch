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
  var [realEstateList, setRealEstateList] = useState([]);
  var [isRealEstateLoaded, setIsRealEstateLoaded] = useState(false);
  var [isBuyersLoaded, setIsBuyersLoaded] = useState(false);

  useEffect(async () => {
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
        Constants.getRealEstateRefBySellerId("JvY1p2IyXTSxeKXmF4XeE5lOHkw2", 0)
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
              setRealEstateList(realEstateList);
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
  }, [realEstateList]);

  const handleClickCreatePost = () => {
    //   useHistory().push("/manage-post");
    // useHistory().push("/manage-post");
    // useNavigate().navigate("/manage-post");
    // useHistory().push("/manage-post");
  }

  return (
    <React.Fragment>
      <div className="seller-search-post-wrapper">
        <div style={{ height: "50px" }}></div>
        <div className="plastic-white seller-search-post-search-bar-container">
          <SearchIcon className="icon" />
          <input
            placeholder="Tìm kiếm tên, địa điểm bất động sản..."
            type="text"
          />
        </div>

        <Link to={"/manage-post"} className="confirm-green noselect seller-search-post-create-post">
          <span>Create Post</span>
        </Link>

        <div className="seller-search-list-search-container">
          {realEstateList.map((item, index) => {
            console.log("item");
            console.log(item);
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
                if (realEstate.staffId == null) {
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
                    backgroundImage:
                      "url(' " + realEstate.images[0].imgUrl + " ')",
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
                      {Math.round(
                        (realEstate.price / realEstate.area) * 1000 * 100
                      ) / 100}{" "}
                      triệu/m²
                    </span>
                    <span className="price">&#8226;</span>
                    <span className="area">Diện tích {realEstate.area} m²</span>
                  </div>

                  {/* address */}
                  <span className="address">
                    Đường {realEstate.streetName}, Phường {realEstate.wardName},
                    Quận {realEstate.disName}
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
                    <div className="uptime">
                      Ngày đăng: {realEstate.createAt}
                    </div>
                    {renderStatus(item.user, realEstate)}
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
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPost;
