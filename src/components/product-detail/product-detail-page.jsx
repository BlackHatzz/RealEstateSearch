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
import { Link, useLocation } from "react-router-dom";

class ProductDetailPage extends Component {
  state = {
    isFullMode: false,
    desHeight: "96px",
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
                    src="https://file4.batdongsan.com.vn/resize/745x510/2021/06/13/20210613095556-483e_wm.jpg"
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
                  Giá trung bình khu vực: {product.averagePrice} triệu/m²
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
                        <span className="short-info-label2">Chung Cư</span>
                      </div>
                    </li>

                    <li className="short-info-item">
                      <GrDirections className="short-info-icon" />
                      <div className="short-info-content-box">
                        <span className="short-info-label1">Hướng nhà:</span>
                        <span className="short-info-label2">
                          {product.direction}
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
                          {product.balconyDirection}
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

                <DetailBox
                  project={product.project}
                  investor={product.investor}
                  streetName={product.streetName}
                  wardName={product.wardName}
                  disName={product.disName}
                  facilities={product.facilities}
                />
              </div>

              {/* right content */}
              <div className="linear-gray-border contact-wrapper">
                <div className="contact-pic"></div>
                <div className="contact-name">Nguyen Duc Huy</div>
                <div className="contact-button">
                  {/* <BsFillChatDotsFill /> */}

                  {/* <div style={{width: "18px"}}></div> */}
                  <Link
                    className="link contact-title-container"
                    to="/chat-page"
                  >
                    <div className="contact-title-container">
                      &#32; Nhắn tin
                    </div>
                  </Link>
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
