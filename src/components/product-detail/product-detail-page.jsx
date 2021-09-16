import React, { Component } from "react";
import SearchSuggestion from "../global/search-suggestion";
import "../global/shared.css";
import "./product-detail.css";
import "./product-detail-mobile.css";
import DetailBox from "./detail-box";
import { BiArea } from "react-icons/bi";
import { BiMoney } from "react-icons/bi";
import {
  FaBed,
  FaBath,
  FaRegBuilding,
  FaDoorOpen,
  FaToilet,
  FaThemeisle,
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
import WeekendOutlinedIcon from "@material-ui/icons/WeekendOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import { upperFirstLetter } from "../../utils/upperFirstLetter";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averagePriceInfo: null,
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
          title: "Bưu Điện",
          apikey: "Bưu Điện",
        },
      ],
      averageDistrictPriceInfo: null,
      averageWardPriceInfo: null,
    };
  }

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
    if (element.getBoundingClientRect().height > 96) {
      element.style.height = "96px";
    } else {
      document.getElementById("collapse-box").style.display = "none";
    }
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    fetch(Constants.getRealEstateDetailRef + this.props.match.params?.id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("product", result);

          this.setState({
            product: result,
            isLoaded: true,
          });
          // console.log("Lỗi", {
          //   product: result,
          //   isLoaded: true,
          // });
          fetch(
            Constants.getAveragePrice(
              "ward",
              result?.wardId,
              6,
              result?.typeName.toLowerCase(),
              "2021"
            )
          )
            .then((res) => res.json())
            .then(
              (result) => {
                console.log("get average price ward");
                console.log(result);
                this.setState({
                  averageWardPriceInfo: result,
                });
              },
              (error) => {}
            );
          fetch(
            Constants.getAveragePrice(
              "district",
              result?.disId,
              6,
              result?.typeName.toLowerCase(),
              "2021"
            )
          )
            .then((res) => res.json())
            .then(
              (result) => {
                console.log("get average price district");
                console.log(result);
                this.setState({
                  averageDistrictPriceInfo: result,
                });
              },
              (error) => {}
            );
        },
        (error) => {}
      );

    // getAveragePrice(addressType,realEstateId,month,realEstateType,year)

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
    const product = this.state.product;

    return (
      <React.Fragment>
        {/* <div
          style={{
            width: "100%",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
          }}
        /> */}

        <SearchSuggestion
          params={this.props.match.params}
          history={this.props.history}
        />

        {/* product detail */}

        <div className="product-detail-wrapper">
          <div className="product-info-dislayed-wrapper">
            {/* left content */}
            <div className="product-info-container">
              {/* product image */}
              <Carousel>
                {product?.images?.map((item, index) => (
                  <div key={index} className="product-image-wrapper">
                    <img
                      className="product-selected-image"
                      src={
                        // product != undefined ? product.images[0].imgUrl : ""
                        item.imgUrl
                      }
                      // src="https://file4.batdongsan.com.vn/resize/745x510/2021/06/13/20210613095556-483e_wm.jpg"
                      alt=""
                    />
                  </div>
                ))}
              </Carousel>

              <div style={{ height: "10px", width: "100%" }}></div>
              {/* product title */}
              <span className="product-info-title">
                {product?.title}
                {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG
                  ĐẸP, GIÁ TỐT */}
              </span>
              <div style={{ height: "10px", width: "100%" }}></div>

              <div
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
                className="product-short-detail"
              >
                {product?.price} tỷ - {product?.area} m²
              </div>
              <div className="profile-mobile">
                <img src={product?.sellerAvatar} alt={product?.sellerName} />
                <div>
                  <p className="profile-mobile-name">{product?.sellerName}</p>
                  <p>
                    Ngày đăng:{" "}
                    {upperFirstLetter(moment(product?.createAt).calendar())}
                  </p>
                </div>
              </div>

              <div className="product-short-detail mobile-hidden">
                Ngày đăng:{" "}
                {upperFirstLetter(moment(product?.createAt).calendar())}
                {/*Hôm nay*/}
              </div>

              <div className="product-short-detail">
                Địa chỉ: {product?.realEstateNo} {product?.streetName},{" "}
                {product?.wardName}, {product?.disName}
                {/*Hôm nay*/}
              </div>

              <div className="product-short-detail">
                {/* Giá trung bình khu vực: {product.averagePrice} triệu/m² */}
              </div>

              <div className="divide"></div>

              <span className="description-title">Đặc Điểm Bất Động Sản</span>

              <div className="short-detail-container">
                <ul className="short-info-list">
                  <li className="short-info-item">
                    {(() => {
                      if (product?.typeName?.toLowerCase() === "chung cư") {
                        return <FaRegBuilding className="short-info-icon" />;
                      } else if (product?.typeName?.toLowerCase() === "nhà") {
                        return <HomeOutlinedIcon className="short-info-icon" />;
                      } else if (product?.typeName?.toLowerCase() === "đất") {
                      }
                    })()}

                    <div className="short-info-content-box">
                      <span className="short-info-label1">Loại:</span>
                      <span className="short-info-label2">
                        {product?.typeName}
                        {/*Chung Cư*/}
                      </span>
                    </div>
                  </li>

                  {(() => {
                    if (product?.typeName?.toLowerCase() === "chung cư") {
                      return (
                        <li className="short-info-item">
                          {/* <img
                            className="short-info-icon"
                            alt="Hướng cửa chính"
                            src="https://i.ibb.co/BtkH9J7/stairs.png"
                          /> */}
                          <img
                            className="short-info-icon"
                            alt="Mã phòng"
                            src="https://i.ibb.co/bmgqF7B/keys.png"
                          />
                          <div className="short-info-content-box">
                            <span className="short-info-label1">
                              Mã căn hộ:
                            </span>
                            <span className="short-info-label2">
                              {product?.floor}
                            </span>
                          </div>
                        </li>
                      );
                    } else if (product?.typeName === "Nhà") {
                      return (
                        <li className="short-info-item">
                          <img
                            className="short-info-icon"
                            alt="Hướng cửa chính"
                            src="https://i.ibb.co/BtkH9J7/stairs.png"
                          />
                          <div className="short-info-content-box">
                            <span className="short-info-label1">Số tầng:</span>
                            <span className="short-info-label2">
                              {product?.floor}
                            </span>
                          </div>
                        </li>
                      );
                    }
                  })()}

                  <li className="short-info-item">
                    <HotelOutlinedIcon className="short-info-icon" />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">Số phòng ngủ:</span>
                      <span className="short-info-label2">
                        {product?.numberOfBedroom}
                      </span>
                    </div>
                  </li>

                  <li className="short-info-item">
                    <img
                      className="short-info-icon"
                      alt="Số phòng vệ sinh"
                      src="https://static.chotot.com/storage/icons/logos/ad-param/toilets.png"
                    />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">Số nhà vệ sinh:</span>
                      <span className="short-info-label2">
                        {product?.numberOfBathroom}
                      </span>
                    </div>
                  </li>
                </ul>

                <ul className="short-info-list">
                  <li className="short-info-item">
                    <img
                      className="short-info-icon"
                      alt="Giá/m2"
                      src="https://static.chotot.com/storage/icons/logos/ad-param/price_m2.png"
                    />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">Giá:</span>
                      <span className="short-info-label2">
                        ~
                        {Math.round(
                          (product?.price / product?.area) * 1000 * 100
                        ) / 100}
                        <span style={{ fontSize: "13px" }}>
                          {" "}
                          triệu/{Constants.squareMeter}
                        </span>
                      </span>
                    </div>
                  </li>
                  {/* <li className="short-info-item">
                        <BiMoney className="short-info-icon" />
                        <div className="short-info-content-box">
                          <span className="short-info-label1">Mức giá:</span>
                          <span className="short-info-label2">
                            {product?.price} tỷ
                          </span>
                        </div>
                      </li> */}
                  <li className="short-info-item">
                    <BiArea className="short-info-icon" />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">Diện tích:</span>
                      <span className="short-info-label2">
                        {product?.area} m²{/*68 m²*/}
                      </span>
                    </div>
                  </li>

                  <li className="short-info-item">
                    <AiOutlineColumnHeight className="short-info-icon" />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">Chiều dài:</span>
                      <span className="short-info-label2">
                        {product?.numberOfBedroom} m
                      </span>
                    </div>
                  </li>

                  <li className="short-info-item">
                    <AiOutlineColumnWidth className="short-info-icon" />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">Chiều rộng:</span>
                      <span className="short-info-label2">
                        {product?.numberOfBathroom} m
                      </span>
                    </div>
                  </li>
                </ul>

                <ul className="short-info-list">
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
                        {this.state.product?.direction}
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
                      <span className="short-info-label1">Hướng ban công:</span>
                      <span className="short-info-label2">
                        {this.state.product?.balconyDirection}
                        {/* {product.balconyDirection} */}
                        {/*Đông nam*/}
                      </span>
                    </div>
                  </li>

                  <li className="short-info-item">
                    <img
                      className="short-info-icon"
                      alt=""
                      src="https://static.chotot.com/storage/icons/logos/ad-param/property_legal_document.png"
                    />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">
                        Giấy tờ pháp lý:
                      </span>
                      <span className="short-info-label2">
                        {product?.juridical}
                      </span>
                    </div>
                  </li>

                  <li className="short-info-item">
                    <WeekendOutlinedIcon className="short-info-icon" />
                    <div className="short-info-content-box">
                      <span className="short-info-label1">Nội thất:</span>
                      <span className="short-info-label2">
                        {(() => {
                          if (this.state.product != null) {
                            if (this.state.product?.furniture != null) {
                              return this.state.product?.furniture;
                            }
                          }
                          return null;
                        })()}
                        {/* {this.state.product != null && this.state.product?.furniture != null ? this.state.product : null} */}
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
                  {product?.description}
                </div>
                <div onClick={this.switchToggle}>
                  <CollapseBox id="collapse-box" />
                </div>
              </div>

              <div className="divide"></div>

              <span className="description-title">Thông Tin Dự Án</span>
              <DetailBox
                project={product?.project}
                investor={this.state.product?.investor}
                realEstateNo={product?.realEstateNo}
                streetName={product?.streetName}
                wardName={product?.wardName}
                disName={product?.disName}
                facilities={
                  this.state.product == null
                    ? []
                    : this.state.product?.facilities
                }
              />

              <div className="divide"></div>

              <span className="description-title">Giá trung bình khu vực</span>
              <div className="average-price-wrapper">
                <div className="average-price-tab">
                  <span className="info">{this.state.product?.disName}</span>
                  <span className="sub-info">
                    {"~"}
                    {(() => {
                      if (this.state.averageDistrictPriceInfo?.length > 0) {
                        return (
                          Math.round(
                            (this.state.averageDistrictPriceInfo[0].price /
                              1_000_000) *
                              100
                          ) / 100
                        );
                      }
                    })()}{" "}
                    triệu/{Constants.squareMeter}
                  </span>
                </div>
                <div className="average-price-tab">
                  <span className="info">{this.state.product?.wardName}</span>
                  <span className="sub-info">
                    {"~"}
                    {(() => {
                      if (this.state.averageWardPriceInfo?.length > 0) {
                        return (
                          Math.round(
                            (this.state.averageWardPriceInfo[0].price /
                              1_000_000) *
                              100
                          ) / 100
                        );
                      }
                    })()}{" "}
                    triệu/{Constants.squareMeter}
                  </span>
                </div>
              </div>

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
                      if (this.state.product?.facilities != null) {
                        return this.state.product?.facilities[
                          this.state.selectedAmenityType.apikey
                        ]
                          ? this.state.product?.facilities[
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
                            })
                          : "";
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
                      this.state.product?.latitude != null &&
                      this.state.product?.longitude
                    ) {
                      return (
                        <Map
                          markerPosition={{
                            lat: this.state.product?.latitude,
                            lng: this.state.product?.longitude,
                          }}
                          defaultCenter={{
                            lat: this.state.product?.latitude,
                            lng: this.state.product?.longitude,
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
                  backgroundImage: "url('" + product?.staffAvatar + "')",
                }}
                className="contact-pic"
              ></div>
              <div className="contact-name">
                {product?.staffName}
                {/*Nguyen Duc Huy*/}
              </div>

              {/* <div className="contact-button"> */}
              <ChatButton product={product} />
              {/* </div> */}

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
      </React.Fragment>
    );
  }
}

export default ProductDetailPage;
