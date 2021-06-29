import React, { Component } from "react";
import "./profile.css";

class TransactionItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="transaction-item">
          <div className="transaction-item-container">
            {/* left: image of the product */}
            <div className="transaction-image-container">
              <img
                className="transaction-image"
                src="https://file4.batdongsan.com.vn/crop/350x232/2021/06/13/20210613112547-abeb_wm.jpg"
                alt=""
              />
            </div>
            {/* right: content of the product */}
            <div className="content-transaction-container">
              {/* title of product */}
              <span className="transaction-title">
                  {this.props.transaction.title}
                {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP,
                GIÁ TỐT */}
              </span>

              {/* price and area */}
              <div className="transaction-price-box">
                <span className="transaction-price"> {this.props.transaction.downPrice} tỷ </span>
                {/* <span className="transaction-price">&#8226;</span>
                    <span className="transaction-area"> m²</span> */}
              </div>

              {/* address */}
              <span className="transaction-address">
                {" "}
                {this.props.transaction.streetName}, phường {this.props.transaction.wardName}, quận {this.props.transaction.disName}
              </span>

              {/* description */}
              <div className="transaction-description">
                {/* {this.props.item.description} */}
                {/* Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất
                    liền tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24
                    tháng. - NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng -
                    TẶNG gói nội thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU
                    400Triệu - Khi Thanh Toán Sớm . */}
              </div>

              <div className="transaction-other-info">
                <div className="product-uptime">{this.props.transaction.createAt}</div>
                <div className="product-owner">Người bán: {this.props.transaction.sellerName}</div>
              </div>
            </div>
            {/* end of product content container */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionItem;
