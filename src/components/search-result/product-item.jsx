import React, { Component } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";

class ProductItem extends Component {
  state = {
    
  };
  render() {
    console.log("search result item:");
    // console.log(this.props.item.images[0].imgUrl);
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="product-item-container">
          {/* left: image of the product */}
          <div className="product-image-container">
            <img
              className="product-image"
              src={this.props.item.images[0].imgUrl}
              // src="https://file4.batdongsan.com.vn/crop/350x232/2021/06/13/20210613112547-abeb_wm.jpg"
              alt=""
            />
          </div>
          {/* right: content of the product */}
          <div className="content-product-container">
            {/* title of product */}
            <span className="product-title">
              {this.props.item.title}
              {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP,
              GIÁ TỐT */}
            </span>

            {/* price and area */}
            <div className="product-price-box">
              <span className="product-price">{(this.props.item.price / this.props.item.area) * 1000} tỷ/m²</span>
              <span className="product-price">&#8226;</span>
              <span className="product-area">{this.props.item.area} m²</span>
            </div>

            {/* address */}
            <span className="product-address">{this.props.item.streetName} {this.props.item.wardName} {this.props.item.disName}</span>

            {/* description */}
            <div className="product-description">
              {this.props.item.description}
              {/* Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất liền
              tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24 tháng. -
              NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng - TẶNG gói nội
              thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU 400Triệu - Khi
              Thanh Toán Sớm . */}
            </div>

            <div className="product-other-info">
              <div className="product-uptime">Ngày đăng: {this.props.item.createAt}</div>
              <div className="product-owner">Người đăng: {this.props.item.sellerName}</div>
              {/* <div className="product-phone-contact horizontal">
                <BsFillChatDotsFill />
                <div style={{ width: "12px" }}></div>
                <span>&#32;Trò chuyện</span>
              </div> */}
            </div>
          </div>
          {/* end of product content container */}
        </div>
      </React.Fragment>
    );
  }
}

export default ProductItem;
