import React, { Component } from "react";
import "../global/shared.css";
import "./product-detail.css";

class DetailBox extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="detail-box">
          <div className="detail-box-row">
            {/* loop */}
            <span className="detail-box-title">Tên dự án:</span>
            <span className="detail-box-value">Diamond</span>
          </div>

          <div className="detail-box-row">
            <span className="detail-box-title">Chủ đầu tư:</span>
            <span className="detail-box-value">
              Nguyen Duc Huy
            </span>
          </div>

          <div className="detail-box-row">
            <span className="detail-box-title">Địa chỉ:</span>
            <span className="detail-box-value">Phạm Văn Đồng, phường Tân Chánh Hiệp, quận Thủ Đức </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailBox;
