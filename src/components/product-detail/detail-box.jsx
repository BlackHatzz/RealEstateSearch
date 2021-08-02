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
              {this.props.streetName}, phường {this.props.wardName}, quận{" "}
              {this.props.disName}
              {/* Phạm Văn Đồng, phường Tân Chánh Hiệp, quận Thủ Đức  */}
            </span>
          </div>

          <span className="detail-box-title">Tiện ích xung quanh:</span>
          <br />
          <div className="detail-box-row">
            {this.props.facilities.map((fac) => (
              <div key={fac.id}>
                <span className="detail-box-value">
                  {fac.facilityName} - {fac.distance}km
                </span>
                <br />
              </div>
            ))}

            {/* <span className="detail-box-value">Chợ Bà Chiểu - 3km</span>
            <br />
            <span className="detail-box-value">Bệnh viện răng hàm mặt - 2km</span>
            <br />
            <span className="detail-box-value">Siêu thị Big C - 2km</span>
            <br /> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailBox;
