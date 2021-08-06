import React, { Component } from "react";
import "../global/shared.css";
import "./product-detail.css";

class DetailBox extends Component {
  state = {};
  render() {
    console.log("fuuuuuu");
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="detail-box">
          <div className="detail-box-row">
            {/* loop */}
            <span className="detail-box-title">Tên dự án:</span>
            <span className="detail-box-value">
              {this.props.project}
              {/*Diamond*/}
            </span>
          </div>

          <div className="detail-box-row">
            <span className="detail-box-title">Chủ đầu tư:</span>
            <span className="detail-box-value">
              {this.props.investor}
              {/* Nguyen Duc Huy */}
            </span>
          </div>

          <div className="detail-box-row">
            <span className="detail-box-title">Địa chỉ:</span>
            <span className="detail-box-value">
              {this.props.realEstateNo} {this.props.streetName}, {this.props.wardName},{" "}
              {this.props.disName}
              {/* Phạm Văn Đồng, phường Tân Chánh Hiệp, quận Thủ Đức  */}
            </span>
          </div>

          {/* <span className="detail-box-title">Tiện ích xung quanh:</span>
          <br />
          <div className="detail-box-row">
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default DetailBox;
