import React, { Component } from "react";
import SearchSuggestion from "../global/search-suggestion";
import "../global/shared.css";
import "./product-detail.css";
import DetailBox from "./detail-box";
import { BiArea } from "react-icons/bi";
import { BiMoney } from "react-icons/bi";
import { FaBed, FaBath, FaBuilding, FaDoorOpen } from "react-icons/fa";
import { GrDirections } from "react-icons/gr";
import CollapseBox from "../global/collapse-box";
import { ChatButton } from "./ChatButton";
import Constants from "../global/Constants";
import Map from "../global/Map";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { IndeterminateCheckBox } from "@material-ui/icons";

class ProductDetailPage extends Component {
  state = {
    isFullMode: false,
    desHeight: "96px",
    product: null,
    isLoaded: false,
    selectedAmenityTypeId: "amenityTypes-1",
    amenityTypes: [
      { id: "amenityTypes-1", title: "Trường học" },
      { id: "amenityTypes-2", title: "Bệnh viện" },
      { id: "amenityTypes-3", title: "Siêu thị" },
      { id: "amenityTypes-4", title: "Ngân hàng" },
      { id: "amenityTypes-5", title: "Trung tâm mua sắm" },
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
    console.log("detail");
    console.log(this.props.location.product);

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    console.log("zzzzzzzzzz");
    console.log(this.props.location.product.id);

    fetch(
      Constants.getRealEstateDetailRef +
        this.props.location.product.id.toString()
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("wwwwwwwwwwwwwww");

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
      ).style.borderBottom = "2px solid blue";
    }
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
          ).style.borderBottom = "2px solid blue";
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
        <SearchSuggestion />

        {/* product detail */}
        <div style={{ width: "100%" }}>
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
                      <FaBed className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Phòng ngủ:</span>
                        <span className="short-info-label2">
                          {product.numberOfBedroom}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <FaBath className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Phòng tắm:</span>
                        <span className="short-info-label2">
                          {product.numberOfBathroom}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="divide"></div>

                <div className="description-container">
                  <span className="description-title">Thông tin mô tả</span>
                  <div
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
                    <CollapseBox />
                  </div>
                </div>

                <div className="divide"></div>

                <span className="description-title">Đặc điểm bất động sản</span>

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
                      <GrDirections className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Hướng nhà:</span>
                        <span className="short-info-label2">
                          {this.state.product == null
                            ? null
                            : this.state.product.direction}
                          {/*Đông Nam*/}
                        </span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <FaDoorOpen className="short-info-icon" />
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

                <span className="description-title">
                  Thông tin bất động sản
                </span>
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

                <span className="description-title">Bản Đồ</span>
                <Map
                  markerPosition={{ lat: -34.397, lng: 150.644 }}
                  defaultCenter={{ lat: -34.397, lng: 150.644 }}
                  defaultZoom={10}
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
                    <div className="info-item">
                      <span className="amenities-name">Truong FPT</span>
                      <div className="right-box">
                        <LocationOnIcon />
                        2.3 km
                      </div>
                    </div>
                  </div>
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
      </React.Fragment>
    );
  }
}

export default ProductDetailPage;
