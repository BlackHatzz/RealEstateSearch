import React, { Component } from "react";
import "./assigned-post.css";
// import { FaPhoneAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import Popup from "reactjs-popup";
import TransactionPopUpContent from "./transaction-pop-up-content";

class AssignedPostItem extends Component {
  state = {
    overlayStyle: {
      backgroundColor: "rgba(10, 10, 10, 0.6)",
    },
    isTransactionPopupShown: false,
    isNotiShown: false,
  };

  handleClosePopup = (close) => {
    console.log("this is close");
    close();
    // this.props.handleSnackbar();
    this.setState({
      isNotiShown: true
    });
    this.props.handleOpenSnackbar();
  };

  render() {
    // console.log("in");
    // console.log(this.props);
    return (
      <React.Fragment>
        {/* {this.props.handleSnackbar()} */}
        {this.state.isNotiShown ? this.props.handleSnackbar() : null}
        <div className="staff-product-item-container">
          {/* left: image of the product */}
          <div className="staff-product-image-container">
            <img
              className="product-image"
              src="https://file4.batdongsan.com.vn/crop/350x232/2021/06/13/20210613112547-abeb_wm.jpg"
              alt=""
            />
          </div>
          {/* right: content of the product */}
          <div className="staff-content-product-container">
            {/* title of product */}
            <span className="staff-product-title">
              {this.props.item.title}
              {/* PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP,
              GIÁ TỐT */}
            </span>

            {/* price and area */}
            <div className="staff-product-price-box">
              <span className="staff-product-price">
                {this.props.item.price} tỷ/m²
              </span>
              <span className="staff-product-price">&#8226;</span>
              <span className="staff-product-area">
                {this.props.item.area} m²
              </span>
            </div>

            {/* address */}
            <span className="staff-product-address">
              {this.props.item.streetName} {this.props.item.wardName}{" "}
              {this.props.item.disName}
            </span>

            {/* description */}
            <div className="staff-product-description">
              {this.props.item.description}
              {/* Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất liền
              tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24 tháng. -
              NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng - TẶNG gói nội
              thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU 400Triệu - Khi
              Thanh Toán Sớm . */}
            </div>

            <div className="staff-product-other-info">
              <div className="staff-product-uptime">
                {this.props.item.createAt}
              </div>
              <div className="staff-product-owner">Nguyen Duc Huy</div>

              {/* create a transaction */}
              {/* <Popup
              overlayStyle={this.state.overlayStyle}
                modal
                trigger={
                  <div className="staff-product-phone-contact horizontal">
                    &#65291;
                    <div style={{ width: "12px" }}></div>
                    <span>&#32;Tạo giao dịch</span>
                  </div>
                }
              >
                {(close) => <TransactionPopUpContent close={close} />}
              </Popup> */}

              <Popup
                overlayStyle={this.state.overlayStyle}
                modal
                trigger={
                  <div className="staff-product-phone-contact horizontal">
                    &#65291;
                    <div style={{ width: "12px" }}></div>
                    <span>&#32;Tạo giao dịch</span>
                  </div>
                }
              >
                {(close) => <TransactionPopUpContent buyers={this.props.item.buyers} close={() => this.handleClosePopup(close)} />}
              </Popup>

              {console.log("tq" + this.state.isTransactionPopupShown)}

              {/* <div className="staff-product-phone-contact horizontal">
                  &#65291;
                <div style={{ width: "12px" }}></div>
                <span>&#32;Tạo giao dịch</span>
                
              </div> */}
            </div>
          </div>
          {/* end of product content container */}
        </div>
      </React.Fragment>
    );
  }
}

export default AssignedPostItem;
