import moment from "moment";
import React, { Component } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";

import { maxString } from "../../utils/moreStringUtil";


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
            </span>

            {/* price and area */}
            <div className="product-price-box">
              <span className="product-price">Giá trị ~{Math.round(((this.props.item.price / this.props.item.area) * 1000) * 100) / 100} triệu/m²</span>
              <span className="product-area">Diện tích {this.props.item.area} m²</span>
            </div>

            {/* address */}
            <span className="product-address">{this.props.item.realEstateNo} {this.props.item.streetName}, {this.props.item.wardName}, {this.props.item.disName}</span>

            {/* description */}
            <div className="product-description">
              {maxString(this.props.item.description, 150, "(xem thêm)")}
            </div>

            <div className="product-other-info">
              <div className="product-owner"></div>
              <div className="product-uptime">Ngày đăng: {moment(this.props.item.createAt).calendar()}</div>
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
