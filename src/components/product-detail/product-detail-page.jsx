import React, { Component } from "react";
import SearchSuggestion from "../global/search-suggestion";
import "../global/shared.css";
import "./product-detail.css";
import DetailBox from "./detail-box";
import { BiArea } from "react-icons/bi";
import { BiMoney } from "react-icons/bi";
import {
  FaBed,
  FaBath,
  FaBuilding,
  FaDoorOpen,
  FaToilet,
} from "react-icons/fa";
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from "react-icons/ai";
import { GrDirections } from "react-icons/gr";
import CollapseBox from "../global/collapse-box";
import { ChatButton } from "./ChatButton";
import Constants from "../global/Constants";
import BuyerNavbar from "../global/BuyerNavbar";
import Map from "../global/Map";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { IndeterminateCheckBox } from "@material-ui/icons";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import WeekendIcon from "@material-ui/icons/Weekend";

class ProductDetailPage extends Component {
  state = {
    isFullMode: false,
    desHeight: "96px",
    product: null,
    isLoaded: false,
    selectedAmenityTypeId: "amenityTypes-1",
    selectedAmenityType: null,
    amenityTypes: [
      { id: "amenityTypes-1", title: "Trường Học", apikey: "Trường Học" },
      { id: "amenityTypes-2", title: "Bệnh Viện", apikey: "Bệnh Viện" },
      { id: "amenityTypes-3", title: "Siêu Thị", apikey: "Siêu Thị" },
      { id: "amenityTypes-4", title: "Ngân Hàng", apikey: "Ngân Hàng" },
      {
        id: "amenityTypes-5",
        title: "Trung Tâm Mua Sắm",
        apikey: "Trung Tâm Mua Sắm",
      },
    ],
  };

  switchToggle = () => {
    if (!this.state.isFullMode) {
      this.setState({
        isFullMode: true,
        desHeight: "auto",
      });
    } else {
      this.setState({
        isFullMode: false,
        desHeight: "96px",
      });
    }
  };

  componentDidMount() {
    let element = document.getElementById("description-id");
    element.style.height = "auto";
    console.log("hey you");
    console.log(element.getBoundingClientRect());
    if(element.getBoundingClientRect().height > 96) {
      element.style.height = "96px";
    } else {
      document.getElementById("collapse-box").style.display = "none";
    }
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    fetch(
      Constants.getRealEstateDetailRef +
        this.props.location.product.id.toString()
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("detail");

          console.log(result);
          this.setState({
            product: result,
            isLoaded: true,
          });
          console.log(this.state.product);
        },
        (error) => {}
      );

    if (document.getElementById(this.state.selectedAmenityTypeId) != null) {
      document.getElementById(
        this.state.selectedAmenityTypeId
      ).style.borderBottom = "2px solid #0C67CE";
    }
    this.setState({
      selectedAmenityType: this.state.amenityTypes[0],
    });
  }

  componentDidUpdate() {
    console.log(document.getElementById(this.state.selectedAmenityTypeId));
    if (document.getElementById(this.state.selectedAmenityTypeId) != null) {
      for (var i = 0; i < this.state.amenityTypes.length; i++) {
        if (
          this.state.amenityTypes[i].id === this.state.selectedAmenityTypeId
        ) {
          document.getElementById(
            this.state.amenityTypes[i].id
          ).style.borderBottom = "2px solid #0C67CE";
        } else {
          document.getElementById(
            this.state.amenityTypes[i].id
          ).style.borderBottom = "2px solid transparent";
        }
      }
    }
  }

  render() {
    const product = this.props.location.product;

    return (
      <React.Fragment>
        
        <div style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          flexDirection: "column"
        }}>
          
          <BuyerNavbar />
          <div style={{ width: "100%", borderBottom: "1px solid rgba(0,0,0,0.15)" }} />
        <SearchSuggestion />

        {/* product detail */}
        
        <div style={{
            overflowY: "auto",
            flex: 1,
          }}>
          <div className="horizontal">
            <div className="product-info-dislayed-wrapper">
              {/* left content */}
              <div className="product-info-container">
                {/* product image */}
                <div className="product-image-wrapper">
                  <img
                    className="product-selected-image"
                    src={product.images[0].imgUrl}
                    // src="https://file4.batdongsan.com.vn/resize/745x510/2021/06/13/20210613095556-483e_wm.jpg"
                    alt=""
                  />
                </div>

                <div style={{ height: "30px", width: "100%" }}></div>
                {/* product title */}
                <span className="product-info-title">
                  {product.title}
                  {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG
                  ĐẸP, GIÁ TỐT */}
                </span>
                <div style={{ height: "10px", width: "100%" }}></div>

                <div className="product-short-detail">
                  Ngày đăng: {product.createAt}
                  {/*Hôm nay*/}
                </div>
                <div className="product-short-detail">
                  Địa chỉ: {product.realEstateNo} {product.streetName},{" "}
                  {product.wardName}, {product.disName}
                  {/*Hôm nay*/}
                </div>
                <div className="product-short-detail">
                  {/* Giá trung bình khu vực: {product.averagePrice} triệu/m² */}
                </div>

                <div className="divide"></div>

                <div className="short-detail-container">
                  <ul className="short-info-list">
                    <li className="short-info-item">
                      <BiMoney className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Mức giá:</span>
                        <span className="short-info-label2">
                          {product.price} tỷ{/*2.15 tỷ*/}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <BiArea className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Diện tích:</span>
                        <span className="short-info-label2">
                          {product.area} m²{/*68 m²*/}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <AiOutlineColumnHeight className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Chiều dài:</span>
                        <span className="short-info-label2">
                          {product.numberOfBedroom} {Constants.squareMeter}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <AiOutlineColumnWidth className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Chiều rộng:</span>
                        <span className="short-info-label2">
                          {product.numberOfBathroom} {Constants.squareMeter}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="short-detail-container">
                  <ul className="short-info-list">
                    <li className="short-info-item">
                      <img
                        className="short-info-icon"
                        alt="Giá/m2"
                        src="https://static.chotot.com/storage/icons/logos/ad-param/price_m2.png"
                      />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">
                          Giá/{Constants.squareMeter}
                        </span>
                        <span
                          style={{ fontSize: "13px" }}
                          className="short-info-label2"
                        >
                          ~
                          {Math.round(
                            (product.price / product.area) * 1000 * 100
                          ) / 100}
                          <br />
                          triệu/{Constants.squareMeter}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <FaBed className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Số phòng ngủ:</span>
                        <span className="short-info-label2">
                          {product.numberOfBedroom}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <FaToilet className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">
                          Số nhà vệ sinh:
                        </span>
                        <span className="short-info-label2">
                          {product.numberOfBathroom}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <WeekendIcon className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Nội thất:</span>
                        <span
                          style={{ fontSize: "14px" }}
                          className="short-info-label2"
                        >
                          {(() => {
                            if (this.state.product != null) {
                              if (this.state.product.furniture != null) {
                                return this.state.product.furniture;
                              }
                            }
                            return null;
                          })()}
                          {/* {this.state.product != null && this.state.product.furniture != null ? this.state.product : null} */}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="divide"></div>

                <div className="description-container">
                  <span className="description-title">Thông Tin Mô Tả</span>
                  <div
                    id="description-id"
                    style={{ height: this.state.desHeight }}
                    className="description-content"
                  >
                    {product.description}
                    {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG
                    ĐẸP, GIÁ TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh 1 PHÚ ĐÔNG
                    PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP, GIÁ
                    TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh 4 PHÚ ĐÔNG PREMIER KÝ HĐ
                    TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP, GIÁ TỐT, TRẢ TRƯỚC
                    1 TỶ.NHÀ CHƯA Ở ảnh 5 PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT
                    CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP, GIÁ TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA
                    Ở ảnh 6 PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC
                    QUYỀN TẦNG ĐẸP, GIÁ TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh 7 PHÚ
                    ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP,
                    GIÁ TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh 8 PHÚ ĐÔNG PREMIER KÝ
                    HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP, GIÁ TỐT, TRẢ
                    TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh 9 PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP
                    CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP, GIÁ TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ
                    CHƯA Ở ảnh 10 PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN
                    ĐỘC QUYỀN TẦNG ĐẸP, GIÁ TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh
                    11 PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN
                    TẦNG ĐẸP, GIÁ TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh 12 PHÚ ĐÔNG
                    PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP, GIÁ
                    TỐT, TRẢ TRƯỚC 1 TỶ.NHÀ CHƯA Ở ảnh 13 PHÚ ĐÔNG PREMIER KÝ HĐ
                    TRỰC TIẾP CDT CÒN CĂN ĐỘC */}
                  </div>
                  <div onClick={this.switchToggle}>
                    <CollapseBox id="collapse-box" />
                  </div>
                </div>

                <div className="divide"></div>

                <span className="description-title">Đặc Điểm Bất Động Sản</span>

                <div className="short-detail-container">
                  <ul className="short-info-list">
                    <li className="short-info-item">
                      <FaBuilding className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Loại:</span>
                        <span className="short-info-label2">
                          {product.typeName}
                          {/*Chung Cư*/}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <img
                        className="short-info-icon"
                        alt="Hướng cửa chính"
                        src="https://static.chotot.com/storage/icons/logos/ad-param/direction.png"
                      />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">
                          Hướng cửa chính:
                        </span>
                        <span className="short-info-label2">
                          {this.state.product == null
                            ? null
                            : this.state.product.direction}
                          {/*Đông Nam*/}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <img
                        className="short-info-icon"
                        alt="Hướng ban công"
                        src="https://static.chotot.com/storage/icons/logos/ad-param/balconydirection.png"
                      />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">
                          Hướng ban công:
                        </span>
                        <span className="short-info-label2">
                          {this.state.product == null
                            ? null
                            : this.state.product.balconyDirection}
                          {/* {product.balconyDirection} */}
                          {/*Đông nam*/}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="divide"></div>

                <span className="description-title">Thông Tin Dự Án</span>
                {(() => {
                  console.log("shiet");
                  console.log(product);
                })()}
                <DetailBox
                  project={product.project}
                  investor={
                    this.state.product == null
                      ? ""
                      : this.state.product.investor
                  }
                  realEstateNo={product.realEstateNo}
                  streetName={product.streetName}
                  wardName={product.wardName}
                  disName={product.disName}
                  facilities={
                    this.state.product == null
                      ? []
                      : this.state.product.facilities
                  }
                />

                <div className="divide"></div>

                <span className="description-title">Tiện Ích Xung Quanh</span>
                <div className="amenities-wrapper">
                  <div className="amenities-wrapper-tab-container">
                    {this.state.amenityTypes.map((item, index) => (
                      <div
                        key={index}
                        id={item.id}
                        onClick={() => {
                          this.setState({
                            selectedAmenityTypeId: item.id,
                            selectedAmenityType: item,
                          });
                        }}
                        style={{
                          width:
                            (100 / this.state.amenityTypes.length).toString() +
                            "%",
                        }}
                        className="tab-item"
                      >
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "rgb(200, 200, 200)",
                    }}
                  ></div>

                  <div className="info-container">
                    {(() => {
                      if (this.state.product != null) {
                        if (this.state.product.facilities != null) {
                          console.log("yeeet");
                          console.log(
                            this.state.product.facilities["Bệnh Viện"]
                          );
                          return this.state.product.facilities[
                            this.state.selectedAmenityType.apikey
                          ].map((item) => {
                            return (
                              <div className="info-item">
                                <span className="amenities-name">
                                  {item.facilityName} - {item.addressFacility}
                                </span>
                                <div className="right-box">
                                  <LocationOnIcon className="distance-icon" />
                                  <span className="distance-text">
                                    {Math.round(item.distance * 100) / 100} km
                                  </span>
                                </div>
                              </div>
                            );
                          });
                        }
                      }
                    })()}
                    {/* <div className="info-item">
                      <span className="amenities-name">Truong FPT</span>
                      <div className="right-box">
                        <LocationOnIcon />
                        2.3 km
                      </div>
                    </div> */}
                  </div>

                  <div className="divide"></div>

                  <span className="description-title">Vị Trí</span>
                  {(() => {
                    if (this.state.product != null) {
                      if (
                        this.state.product.latitude != null &&
                        this.state.product.longitude
                      ) {
                        return (
                          <Map
                            markerPosition={{
                              lat: this.state.product.latitude,
                              lng: this.state.product.longitude,
                            }}
                            defaultCenter={{
                              lat: this.state.product.latitude,
                              lng: this.state.product.longitude,
                            }}
                            defaultZoom={20}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDPzD4tPUGV3HGIiv7fVcWEFEQ0r1AAxwg&callback=initMap`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={
                              <div
                                style={{
                                  height: `400px`,
                                  margin: `auto`,
                                  // border: "1px solid black",
                                }}
                              />
                            }
                            mapElement={<div style={{ height: `100%` }} />}
                          />
                        );
                      }
                    }
                  })()}
                </div>
              </div>

              {/* right content */}
              <div className="linear-gray-border contact-wrapper">
                <div
                  style={{
                    backgroundImage: "url('" + product.sellerAvatar + "')",
                  }}
                  className="contact-pic"
                ></div>
                <div className="contact-name">
                  {product.sellerName}
                  {/*Nguyen Duc Huy*/}
                </div>
                <div className="contact-button">
                  {/* <BsFillChatDotsFill /> */}

                  {/* <div style={{width: "18px"}}></div> */}
                  {/* <Link
                    className="link contact-title-container"
                    to="/chat-page"
                    onClick={() => {
                      
                    }}
                  >
                    <div className="contact-title-container">
                      &#32; Nhắn tin
                    </div>
                  </Link> */}
                  <ChatButton product={product} />
                </div>

                <div className="more-post-button">
                  <div className="contact-title-container">
                    &#32;Xem thêm bài viết
                  </div>
                </div>

                <div className="more-post-button">
                  <div className="contact-title-container">&#32;Xem hồ sơ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductDetailPage;
