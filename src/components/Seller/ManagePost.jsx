import React, { Component } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";
import "./manage-post.css";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { GrTransaction } from "react-icons/gr";
import SellerNavbar from "./SellerNavBar";
import "../global/shared.css";

class ManagePost extends Component {
  state = {
    address: "",
    file: null,
    isDistrictMenuShown: false,
    isWardMenuShown: false,
    districts: [
      { key: 1, title: "Quận 1" },
      { key: 2, title: "Quận 2" },
      { key: 3, title: "Quận 3" },
      { key: 4, title: "Quận 4" },
      { key: 5, title: "Quận 5" },
      { key: 6, title: "Quận 6" },
      { key: 7, title: "Quận 7" },
    ],
    wards: [
      { key: 1, title: "Phường a" },
      { key: 2, title: "Phường b" },
      { key: 3, title: "Phường c" },
      { key: 4, title: "Phường d" },
      { key: 5, title: "Phường e" },
      { key: 6, title: "Phường f" },
      { key: 7, title: "Phường g" },
    ],
  };

  componentDidMount() {
    fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/230 Tran Hung Dao Quan 1 Ho Chi Minh (VN).json?proximity=10,11&access_token=pk.eyJ1IjoidGhpc2lzdGVzdG1haWwwMDMiLCJhIjoiY2txcWZhbHhmMWdoNjJ2bzg3azl2N3RpZCJ9.w-Tgtdosib0NTgoyWBg7Jg"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.content);
          console.log("map box");
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error,
          // });
        }
      );
  }

  setAddress = () => {};

  handleFileChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  renderSelectedImage = () => {
    // no image yet
    if (this.state.file == null) {
      return (
        <div alt="" className="selected-file">
          <div className="gallery"></div>
          <span>Nhấn để chọn hình ảnh</span>
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundImage: "url('" + this.state.file + "')",
          //   width: "auto",
          //   height: "auto",
        }}
        alt=""
        className="selected-file"
      ></div>
    );
    // selected an image
  };

  handleSelectDistrict = (selectedDistrict) => {
    document.getElementById("dis-input").value =
      selectedDistrict.title.toString();
  };

  renderDistrictMenu = () => {
    if (this.state.isDistrictMenuShown) {
      return (
        <div className="manage-post-drop-down-menu">
          {this.state.districts.map((district) => (
            <React.Fragment key={district.key}>
              <div
                onClick={() => this.handleSelectDistrict(district)}
                className="item"
              >
                <span>{district.title}</span>
              </div>
              <div className="line"></div>
            </React.Fragment>
          ))}
        </div>
      );
    }
    return null;
  };

  handleSelectWard = (selectedWard) => {
    document.getElementById("ward-input").value = selectedWard.title.toString();
  };

  renderWardMenu = () => {
    if (this.state.isWardMenuShown) {
      return (
        <div className="manage-post-drop-down-menu">
          {this.state.wards.map((ward) => (
            <React.Fragment key={ward.key}>
              <div onClick={() => this.handleSelectWard(ward)} className="item">
                <span>{ward.title}</span>
              </div>
              <div className="line"></div>
            </React.Fragment>
          ))}
        </div>
      );
    }
  };

  handleSelect = async (value) => {};
  render() {
    return (
      <React.Fragment>
        <div className="seller-wrapper">
          <div className="left-container">
            <div className="logo-container">
              <div className="logo-box"></div>
            </div>

            <div className="item">
              <PostAddIcon className="icon" />
              <span>Manage Post</span>
            </div>

            <div className="item">
              <GrTransaction className="icon" />
              <span>Trasaction History</span>
            </div>
          </div>

          <div className="right-container">
            <SellerNavbar />
            <div className="divide"></div>

            <div className="content-container">
              <div className="tab-title">Thông tin bài viết</div>
              {/* kfqne;kf;qwej;gf
                j;qewhjr;ogne;qorng;oq3bnro;g
                ;kfqne;kf;qw
                ej;gfj;qewhjr;ogne;qorng;
                oq3bnro;g;kfqne;kf;qwej;gfj;qe
                whjr;ogne;qorng;oq3bnro;g;kfqne;kf;qwe
                j;gfj;qewhjr;ogne;qorng;oq3bnro;g;k
                fqne;kf;qwej;gfj;qewhjr;ogne;qorng
                ;oq3bnro;g;kfqne;kf;qwej;gfj;qewhjr;o
                gne;qorng;oq3bnro;g;kfqne;kf;qwe 
                j;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqn
                e;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqn
                e;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;
                kfqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;k
                fqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kf
                'qne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqn
                e;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqne;k
                f;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfq
                ;qewhjr;ogne;qorng;oq3b
                nro;g;kfqne;kf;qwej;gfj;qew
                hjr;ogne;qorng;
                oq3bnro;g;kfqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g; */}
              
              {/* session 1 */}
              <div style={{height: "10px"}}></div>
              <div className="row session-row">
                  <div className="manage-post-tag">
                      <span>Thông tin cơ bản</span>
                  </div>
                  <div className="manage-post-right-arrow"></div>
              </div>
              
              <div className="row">
                <div className="col1">
                  <h2 className="title">Tiêu đề</h2>
                  <div className="input-container">
                    <input
                      placeholder="Nhập tiêu đề bài viết..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col3">
                  <h2 className="title">Giá tiền</h2>
                  <div className="input-container">
                    <input
                      placeholder="tỷ đồng"
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="col3">
                  <h2 className="title">Diện tích</h2>
                  <div className="input-container">
                    <input
                      placeholder="m2"
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="col3">
                  <h2 className="title">Chủ đầu tư</h2>
                  <div className="input-container">
                    <input
                      placeholder="Tên chủ đầu tư"
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>


              {/* session 1 */}
              <div style={{height: "20px"}}></div>
              <div className="row session-row">
                  <div className="manage-post-tag">
                      <span>Thông tin bất động sản</span>
                  </div>
                  <div className="manage-post-right-arrow"></div>
              </div>


              <div className="row">
                <div className="col2">
                  <h2 className="title">Loại bất động sản</h2>
                  <div className="input-container">
                    <input
                      placeholder="Loại bất động sản..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="col2">
                  <h2 className="title">Dự án</h2>
                  <div className="input-container">
                    <input
                      placeholder="Nhập tên dự án..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col2">
                  <h2 className="title">Hướng cửa chính</h2>
                  <div className="input-container">
                    <input
                      placeholder="Hướng cửa chính..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="col2">
                  <h2 className="title">Hướng ban công</h2>
                  <div className="input-container">
                    <input
                      placeholder="Hướng ban công..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col2">
                  <h2 className="title">Số phòng ngủ</h2>
                  <div className="input-container">
                    <input
                      placeholder="Nhập số phòng ngủ..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="col2">
                  <h2 className="title">Số phòng tắm</h2>
                  <div className="input-container">
                    <input
                      placeholder="Nhập số phòng tắm..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
              </div> */}

              <div className="row">
                <div className="col2">
                  <h2 className="title">Quận/Huyện</h2>
                  <div
                    onClick={() => {
                      this.setState({
                        isDistrictMenuShown: !this.state.isDistrictMenuShown,
                      });
                    }}
                    className="input-container read-only-field"
                  >
                    <input
                      id="dis-input"
                      readOnly
                      placeholder="Chọn tên quận/huyện..."
                      type="text"
                      className="input-field read-only-field"
                    />
                    {/* drop down when selected */}
                    {this.renderDistrictMenu()}
                  </div>
                </div>
                <div className="col2">
                  <h2 className="title">Phường/Xã</h2>
                  <div
                    onClick={() => {
                      this.setState({
                        isWardMenuShown: !this.state.isWardMenuShown,
                      });
                    }}
                    className="input-container read-only-field"
                  >
                    <input
                      id="ward-input"
                      readOnly
                      placeholder="Chọn tên phường/xã..."
                      type="text"
                      className="input-field read-only-field"
                    />
                    {/* drop down when selected */}
                    {this.renderWardMenu()}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col2">
                  <h2 className="title">Địa chỉ</h2>
                  <div className="input-container">
                    <input
                      placeholder="Nhập tên và số địa chỉ..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="col4">
                  <h2 className="title">Số phòng ngủ</h2>
                  <div className="input-container">
                    <input
                      placeholder="..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="col4">
                  <h2 className="title">Số phòng tắm</h2>
                  <div className="input-container">
                    <input
                      placeholder="..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div>

              </div>

              {/* session 3 */}
              <div style={{height: "20px"}}></div>
              <div className="row session-row">
                  <div className="manage-post-tag">
                      <span>Mô tả bất động sản</span>
                  </div>
                  <div className="manage-post-right-arrow"></div>
              </div>

              <div className="row">
                <div className="col0">
                  <h2 className="row-title">Bài viết mô tả</h2>
                  <textarea placeholder="Nhập bài viết mô tả của bất động sản..."></textarea>
                </div>
              </div>

              <div className="row">
                <div className="col0">
                  <h2 className="row-title">Hình ảnh</h2>
                  <div className="file-box">
                    <input
                      aria-label=""
                      onChange={this.handleFileChange}
                      type="file"
                      className="file-input"
                    />
                    {this.renderSelectedImage()}
                  </div>
                </div>
              </div>

              <div className="row reverse-row">
                <div className="noselect create-button">
                  &#65291;
                  <span>Tạo bài viết</span>
                </div>
              </div>

              <div style={{ height: "90px" }}></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ManagePost;
