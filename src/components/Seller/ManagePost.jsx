import React, { Component } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";
import "./manage-post.css";
import PostAddIcon from "@material-ui/icons/PostAdd";
import HistoryIcon from "@material-ui/icons/History";
import { GrTransaction } from "react-icons/gr";
import SellerNavbar from "./SellerNavBar";
import "../global/shared.css";
import { fb } from "../../services/firebase";
import Popup from "reactjs-popup";
import Constants from "../global/Constants";
import SuccessPopup from "./SuccessPopup";
import "./success-popup.css";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { TailSpin } from "@agney/react-loading";

class ManagePost extends Component {
  state = {
    //apiKey: "u5upZp6pDlFDxcV9fiknYyjk0hAboyQUngPRB-zJe1A", // here api
    address: "",
    file: null,
    fileImage: null,
    districtWardList: [],
    isRealEstateTypeMenuShow: false,
    realEstateTypes: [
      { key: 1, title: "Chung cư" },
      { key: 2, title: "Nhà" },
      { key: 3, title: "Đất" },
    ],

    isDistrictMenuShown: false,
    selectedDistrictId: null,
    districts: [
      { key: 1, title: "Quận 1" },
      { key: 2, title: "Quận 2" },
      { key: 3, title: "Quận 3" },
      { key: 4, title: "Quận 4" },
      { key: 5, title: "Quận 5" },
      { key: 6, title: "Quận 6" },
      { key: 7, title: "Quận 7" },
    ],

    isWardMenuShown: false,
    selectedWardId: null,
    wards: [
      { key: 1, title: "Phường a" },
      { key: 2, title: "Phường b" },
      { key: 3, title: "Phường c" },
      { key: 4, title: "Phường d" },
      { key: 5, title: "Phường e" },
      { key: 6, title: "Phường f" },
      { key: 7, title: "Phường g" },
    ],
    isDoorDirectionMenuShown: false,
    doorDirections: [
      { key: 1, title: "Đông" },
      { key: 2, title: "Đông Nam" },
      { key: 3, title: "Nam" },
      { key: 4, title: "Tây Nam" },
      { key: 5, title: "Tây" },
      { key: 6, title: "Tây Bắc" },
      { key: 7, title: "Bắc" },
      { key: 8, title: "Đông Bắc" },
    ],
    isBalconyDirectionMenuShown: false,
    balconyDirections: [
      { key: 1, title: "Đông" },
      { key: 2, title: "Đông Nam" },
      { key: 3, title: "Nam" },
      { key: 4, title: "Tây Nam" },
      { key: 5, title: "Tây" },
      { key: 6, title: "Tây Bắc" },
      { key: 7, title: "Bắc" },
      { key: 8, title: "Đông Bắc" },
    ],
    district: "",
    ward: "",
    address: "",
    latitude: null,
    longitude: null,

    newRealEstate: null,
    // isLoading: true,
    // isPopupOpen: false,
    isLoaded: false,
  };
  isIndicatorAnimating = false;

  componentWillMount() {
    console.log("will mount");
    fetch(
      "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/address/getAddress"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("get dis ward");

          this.setState({
            districtWardList: result,
          });
          console.log(this.state.districtWardList);
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

  componentDidMount() {
    // AIzaSyDgghZscRwOlPg2pAvCD64CqXeJMwhNZUs
    // let searchText = "1600+Amphitheatre+Parkway,+Mountain+View,+CA";
    // let searchText =
    //   "990 Pham Van Dong, Phuong Hiep Binh Chanh, Quan Thu Duc, Ho Chi Minh, Viet Nam";
    // fetch(Constants.geocodingRefWithSearchText(searchText))
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log("get google cloud");
    //       console.log(result);
    //     },
    //     (error) => {}
    //   );
    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    // fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=" + Constants.googleAPIKey)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log("near by");
    //       console.log(result);
    //     },
    //     (error) => {}
    //   );
  }

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
    this.setState({
      selectedDistrictId: selectedDistrict.id,
    });
    document.getElementById("dis-input").value =
      selectedDistrict.disName.toString();
  };

  renderDistrictMenu = () => {
    if (this.state.isDistrictMenuShown) {
      return (
        <div className="manage-post-drop-down-menu">
          {this.state.districtWardList.map((district) => (
            <React.Fragment key={district.id}>
              <div
                onClick={() => this.handleSelectDistrict(district)}
                className="item"
              >
                <span>{district.disName}</span>
              </div>
              <div className="line"></div>
            </React.Fragment>
          ))}
        </div>
      );
      //   return (
      //     <div className="manage-post-drop-down-menu">
      //       {this.state.districts.map((district) => (
      //         <React.Fragment key={district.key}>
      //           <div
      //             onClick={() => this.handleSelectDistrict(district)}
      //             className="item"
      //           >
      //             <span>{district.title}</span>
      //           </div>
      //           <div className="line"></div>
      //         </React.Fragment>
      //       ))}
      //     </div>
      //   );
    }
    return null;
  };

  handleSelectWard = (selectedWard) => {
    this.setState({
      selectedWardId: selectedWard.id,
    });
    document.getElementById("ward-input").value =
      selectedWard.wardName.toString();
    // document.getElementById("ward-input").value = selectedWard.title.toString();
  };

  renderWardMenu = () => {
    if (this.state.isWardMenuShown && this.state.selectedDistrictId != null) {
      return (
        <div className="manage-post-drop-down-menu">
          {this.state.districtWardList[this.state.selectedDistrictId].wards.map(
            (ward) => (
              <React.Fragment key={ward.wardId}>
                <div
                  onClick={() => this.handleSelectWard(ward)}
                  className="item"
                >
                  <span>{ward.wardName}</span>
                </div>
                <div className="line"></div>
              </React.Fragment>
            )
          )}
        </div>
      );
    }
  };
  renderMenu = (toggleValue, list, elementId) => {
    if (toggleValue) {
      return (
        <div className="manage-post-drop-down-menu">
          {list.map((item) => (
            <React.Fragment key={item.key}>
              <div
                onClick={() => {
                  document.getElementById(elementId.toString()).value =
                    item.title.toString();
                }}
                className="item"
              >
                <span>{item.title}</span>
              </div>
              <div className="line"></div>
            </React.Fragment>
          ))}
        </div>
      );
    }
  };

  handleChangeAddress = (event) => {
    // const addressText = event.target.value;
    // console.log("address");
    // // console.log(ad);
    // // const searchText = "200%20S%20Mathilda%20Sunnyvale%20CA";
    // // const searchText = addressText.toString() + "Quan 1, Ho Chi Minh, Viet Nam";
    // const searchText = addressText + ", Quan 1, Ho Chi Minh, Viet Nam";
    // fetch(
    //   //   "https://api.mapbox.com/geocoding/v5/mapbox.places/230 Tran Hung Dao Quan 1 Ho Chi Minh (VN).json?proximity=10,11&access_token=pk.eyJ1IjoidGhpc2lzdGVzdG1haWwwMDMiLCJhIjoiY2txcWZhbHhmMWdoNjJ2bzg3azl2N3RpZCJ9.w-Tgtdosib0NTgoyWBg7Jg"
    //   // "https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=200%20S%20Mathilda%20Sunnyvale%20CA&gen=9&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs"
    //   "https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=" +
    //     searchText +
    //     "&gen=9&apiKey=DqIPQFyQWeHJX3rRuVDij40cAvLczkwnzUjGS0DlzxI"
    // )
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       // console.log(result.content);
    //       console.log("on here");
    //       console.log(result.Response.View[0].Result[0]);
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       // this.setState({
    //       //   isLoaded: true,
    //       //   error,
    //       // });
    //     }
    //   );
  };

  handleCreatePost = () => {
    const addressText = document
      .getElementById("address-input")
      .value.toString();
    const districtText = document.getElementById("dis-input").value.toString();

    console.log(addressText);
    console.log(districtText);

    // const searchText = "200%20S%20Mathilda%20Sunnyvale%20CA";
    // const searchText = addressText.toString() + "Quan 1, Ho Chi Minh, Viet Nam";
    const searchText =
      addressText + ", " + districtText + ", Hồ Chí Minh, Việt Nam";
    fetch(
      "https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=" +
        searchText +
        "&gen=9&apiKey=" +
        this.state.apiKey
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("on create");
          console.log(result.Response.View[0].Result[0]);
          console.log(
            result.Response.View[0].Result[0].Location.DisplayPosition.Latitude
          );
          console.log(
            result.Response.View[0].Result[0].Location.DisplayPosition.Longitude
          );
        },
        (error) => {}
      );

    // get all value to crate a post
    const title = document.getElementById("title-input").value.toString();
    const price = parseFloat(
      document.getElementById("price-input").value.toString()
    );
    const area = parseFloat(
      document.getElementById("area-input").value.toString()
    );
    const investor = document.getElementById("investor-input").value.toString();

    const realEstateType = parseInt(
      document.getElementById("real-estate-type-input").value.toString()
    );
    const project = document.getElementById("project-input").value.toString();
    const doorDirection = document
      .getElementById("door-direction-input")
      .value.toString();
    const balconyDirection = document
      .getElementById("balcony-direction-input")
      .value.toString();
    const dis = document.getElementById("dis-input").value.toString();
    const ward = document.getElementById("ward-input").value.toString();
    // const address = document.getElementById("address-input").value.toString();
    const houseNo = document.getElementById("house-no-input").value.toString();
    const streetName = document
      .getElementById("street-name-input")
      .value.toString();
    const numberOfBedroom = parseInt(
      document.getElementById("bedroom-input").value.toString()
    );
    const numberOfBathroom = parseInt(
      document.getElementById("bathroom-input").value.toString()
    );

    const description = document
      .getElementById("description-input")
      .value.toString();
    const images = document.getElementById("images-input").value;

    console.log("get all");
    console.log(title);
    console.log(price);
    console.log(area);
    console.log(investor);

    console.log(realEstateType);
    console.log(project);
    console.log(doorDirection);
    console.log(balconyDirection);
    console.log(dis);
    console.log(ward);
    // console.log(address);
    console.log(numberOfBedroom);
    console.log(numberOfBathroom);

    console.log(description);
    console.log(images);

    console.log(this.state.file);

    let imageName = this.uuidv4();

    fb.storage
      .ref()
      .child("images/" + imageName + ".png")
      .put(this.state.fileImage)
      .then((snapshot) => {
        console.log("uploaddddddd");
        // console.log(snapshot);
        console.log(
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);

            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sellerId: "fSUJL0Vjoraru92zOuLbp0Rcff32",
                title: title,
                view: 0,
                districtId: this.state.selectedDistrictId,
                wardId: this.state.selectedWardId,
                streetName: streetName,
                realEstateNo: houseNo,
                typeId: realEstateType,
                description: description,
                area: area,
                price: price,
                direction: doorDirection,
                balconyDirection: balconyDirection,
                project: project,
                investor: investor,
                numberOfBedroom: numberOfBedroom,
                numberOfBathroom: numberOfBathroom,
                images: [
                  {
                    imgUrl: downloadURL,
                  },
                ],
              }),
            };

            fetch(
              "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/realEstate/createRealEstate",
              requestOptions
            )
              .then((res) => res.json())
              .then(
                (result) => {
                  // console.log(result.content);
                  console.log("this is cre");
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
          })
        );
      });
  };

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  renderContent = (title) => {
    console.log("load");
    console.log(this.state.isLoaded);
    console.log(this.isIndicatorAnimating);
    if (!this.state.isLoaded) {
      console.log("not again");
      setTimeout(() => {
        // this.isIndicatorAnimating = false;
        // this.state.isLoaded = true;
        this.setState({
          isLoaded: true,
        });
      }, 3500);
      return (
        <React.Fragment>
          <div className="success-popup-icon-container">
            <div className="loading-indicator-container">
              <TailSpin className="loading-indicator" />
            </div>
          </div>
          <span>Xin vui lòng đợi. Hệ thống đang xử lý...</span>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="success-popup-icon-container">
          <CheckCircleOutlineOutlinedIcon className="icon" />
        </div>
        <span>Chúc Mừng! Bạn đã tạo bài viết thành công!</span>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
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
        <div style={{ height: "10px" }}></div>
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
                id="title-input"
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
                id="price-input"
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
                id="area-input"
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
                id="investor-input"
                placeholder="Tên chủ đầu tư"
                type="text"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* session 1 */}
        <div style={{ height: "20px" }}></div>
        <div className="row session-row">
          <div className="manage-post-tag">
            <span>Thông tin bất động sản</span>
          </div>
          <div className="manage-post-right-arrow"></div>
        </div>

        <div className="row">
          {/* <div className="col2">
                  <h2 className="title">Loại bất động sản</h2>
                  <div className="input-container">
                    <input
                      placeholder="Loại bất động sản..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div> */}
          <div className="col2">
            <h2 className="title">Loại bất động sản</h2>
            <div
              onClick={() => {
                this.setState({
                  isRealEstateTypeMenuShow:
                    !this.state.isRealEstateTypeMenuShow,
                });
              }}
              className="input-container read-only-field"
            >
              <input
                id="real-estate-type-input"
                readOnly
                placeholder="Chọn loại bất động sản..."
                type="text"
                className="input-field read-only-field"
              />
              {/* drop down when selected */}
              {this.renderMenu(
                this.state.isRealEstateTypeMenuShow,
                this.state.realEstateTypes,
                "real-estate-type-input"
              )}
            </div>
          </div>

          <div className="col2">
            <h2 className="title">Dự án</h2>
            <div className="input-container">
              <input
                id="project-input"
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
            <div
              onClick={() => {
                this.setState({
                  isDoorDirectionMenuShown:
                    !this.state.isDoorDirectionMenuShown,
                });
              }}
              className="input-container read-only-field"
            >
              <input
                id="door-direction-input"
                readOnly
                placeholder="Chọn hướng..."
                type="text"
                className="input-field read-only-field"
              />
              {/* drop down when selected */}
              {this.renderMenu(
                this.state.isDoorDirectionMenuShown,
                this.state.doorDirections,
                "door-direction-input"
              )}
            </div>
          </div>

          {/* <div className="col2">
                  <h2 className="title">Hướng cửa chính</h2>
                  <div className="input-container">
                    <input
                      placeholder="Hướng cửa chính..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div> */}

          {/* <div className="col2">
                  <h2 className="title">Hướng ban công</h2>
                  <div className="input-container">
                    <input
                      placeholder="Hướng ban công..."
                      type="text"
                      className="input-field"
                    />
                  </div>
                </div> */}
          <div className="col2">
            <h2 className="title">Hướng ban công</h2>
            <div
              onClick={() => {
                this.setState({
                  isBalconyDirectionMenuShown:
                    !this.state.isBalconyDirectionMenuShown,
                });
              }}
              className="input-container read-only-field"
            >
              <input
                id="balcony-direction-input"
                readOnly
                placeholder="Chọn hướng..."
                type="text"
                className="input-field read-only-field"
              />
              {/* drop down when selected */}
              {this.renderMenu(
                this.state.isBalconyDirectionMenuShown,
                this.state.balconyDirections,
                "balcony-direction-input"
              )}
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
            <div style={{ display: "flex" }} className="input-container">
              {/* <input
                      id="address-input"
                      onChange={this.handleChangeAddress}
                      placeholder="Nhập tên và số địa chỉ..."
                      type="text"
                      className="input-field"
                    /> */}
              <input
                id="house-no-input"
                onChange={this.handleChangeAddress}
                placeholder="Số nhà"
                type="text"
                className="cou-input-field-left"
              />
              <div className="cou-line"></div>
              <input
                id="street-name-input"
                onChange={this.handleChangeAddress}
                placeholder="Tên đường"
                type="text"
                className="cou-input-field-right"
              />
            </div>
          </div>

          <div className="col4">
            <h2 className="title">Số phòng ngủ</h2>
            <div className="input-container">
              <input
                id="bedroom-input"
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
                id="bathroom-input"
                placeholder="..."
                type="text"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* session 3 */}
        <div style={{ height: "20px" }}></div>
        <div className="row session-row">
          <div className="manage-post-tag">
            <span>Mô tả bất động sản</span>
          </div>
          <div className="manage-post-right-arrow"></div>
        </div>

        <div className="row">
          <div className="col0">
            <h2 className="row-title">Bài viết mô tả</h2>
            <textarea
              id="description-input"
              placeholder="Nhập bài viết mô tả của bất động sản..."
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col0">
            <h2 className="row-title">Hình ảnh</h2>
            <div className="file-box">
              <input
                id="images-input"
                aria-label=""
                onChange={this.handleFileChange}
                type="file"
                className="file-input"
              />
              {this.renderSelectedImage()}
            </div>
          </div>
        </div>

        <Popup
          ref={React.createRef()}
          overlayStyle={{
            backgroundColor: "rgba(10, 10, 10, 0.6)",
          }}
          modal
          trigger={
            <div className="row reverse-row">
              <div
                //   onClick={this.handleCreatePost}
                // onClick={() => {
                //   this.state.isPopupOpen = true;
                // }}
                className="noselect create-button"
              >
                &#65291;
                <span>Tạo bài viết</span>
              </div>
            </div>
          }
        >
          {(close) => (
            <div className="success-popup-container">
              {this.renderContent("thisis")}
              <div
                onClick={() => {
                  if(this.state.isLoaded) {
                    this.state.isLoaded = false;
                  }
                  this.isIndicatorAnimating = false;
                  close();
                }}
                className="noselect confirm"
              >
                <span>OK</span>
              </div>
            </div>
            // <SuccessPopup
            //   close={close}
            //   title="Chúc Mừng! Bạn đã tạo bài viết thành công!"
            // />
          )}
        </Popup>

        <div style={{ height: "90px" }}></div>
      </React.Fragment>
    );
  }
  // render() {
  //   return (
  //     <React.Fragment>
  //       <div className="seller-wrapper">
  //         <div className="left-container">
  //           <div className="logo-container">
  //             <div className="logo-box"></div>
  //           </div>

  //           <div className="item">
  //             <div className="alone-selected-container">
  //               <div className="alone-selected"></div>
  //             </div>
  //             <div className="box">
  //               <PostAddIcon className="icon" />
  //               <span>Manage Post</span>
  //             </div>
  //           </div>

  //           <div className="item">
  //             <div className="alone-selected-container">
  //               <div className="alone-selected"></div>
  //             </div>
  //             <div className="box">
  //               <HistoryIcon className="icon" />
  //               <span>Trasaction History</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="right-container">
  //           <SellerNavbar />
  //           <div className="divide"></div>

  //           <div className="content-container">
  //             <div className="tab-title">Thông tin bài viết</div>
  //             {/* kfqne;kf;qwej;gf
  //               j;qewhjr;ogne;qorng;oq3bnro;g
  //               ;kfqne;kf;qw
  //               ej;gfj;qewhjr;ogne;qorng;
  //               oq3bnro;g;kfqne;kf;qwej;gfj;qe
  //               whjr;ogne;qorng;oq3bnro;g;kfqne;kf;qwe
  //               j;gfj;qewhjr;ogne;qorng;oq3bnro;g;k
  //               fqne;kf;qwej;gfj;qewhjr;ogne;qorng
  //               ;oq3bnro;g;kfqne;kf;qwej;gfj;qewhjr;o
  //               gne;qorng;oq3bnro;g;kfqne;kf;qwe
  //               j;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqn
  //               e;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqn
  //               e;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;
  //               kfqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;k
  //               fqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kf
  //               'qne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqn
  //               e;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqne;k
  //               f;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfq
  //               ;qewhjr;ogne;qorng;oq3b
  //               nro;g;kfqne;kf;qwej;gfj;qew
  //               hjr;ogne;qorng;
  //               oq3bnro;g;kfqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g;kfqne;kf;qwej;gfj;qewhjr;ogne;qorng;oq3bnro;g; */}

  //             {/* session 1 */}
  //             <div style={{ height: "10px" }}></div>
  //             <div className="row session-row">
  //               <div className="manage-post-tag">
  //                 <span>Thông tin cơ bản</span>
  //               </div>
  //               <div className="manage-post-right-arrow"></div>
  //             </div>

  //             <div className="row">
  //               <div className="col1">
  //                 <h2 className="title">Tiêu đề</h2>
  //                 <div className="input-container">
  //                   <input
  //                     id="title-input"
  //                     placeholder="Nhập tiêu đề bài viết..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="row">
  //               <div className="col3">
  //                 <h2 className="title">Giá tiền</h2>
  //                 <div className="input-container">
  //                   <input
  //                     id="price-input"
  //                     placeholder="tỷ đồng"
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>

  //               <div className="col3">
  //                 <h2 className="title">Diện tích</h2>
  //                 <div className="input-container">
  //                   <input
  //                     id="area-input"
  //                     placeholder="m2"
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col3">
  //                 <h2 className="title">Chủ đầu tư</h2>
  //                 <div className="input-container">
  //                   <input
  //                     id="investor-input"
  //                     placeholder="Tên chủ đầu tư"
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             {/* session 1 */}
  //             <div style={{ height: "20px" }}></div>
  //             <div className="row session-row">
  //               <div className="manage-post-tag">
  //                 <span>Thông tin bất động sản</span>
  //               </div>
  //               <div className="manage-post-right-arrow"></div>
  //             </div>

  //             <div className="row">
  //               {/* <div className="col2">
  //                 <h2 className="title">Loại bất động sản</h2>
  //                 <div className="input-container">
  //                   <input
  //                     placeholder="Loại bất động sản..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div> */}
  //               <div className="col2">
  //                 <h2 className="title">Loại bất động sản</h2>
  //                 <div
  //                   onClick={() => {
  //                     this.setState({
  //                       isRealEstateTypeMenuShow:
  //                         !this.state.isRealEstateTypeMenuShow,
  //                     });
  //                   }}
  //                   className="input-container read-only-field"
  //                 >
  //                   <input
  //                     id="real-estate-type-input"
  //                     readOnly
  //                     placeholder="Chọn loại bất động sản..."
  //                     type="text"
  //                     className="input-field read-only-field"
  //                   />
  //                   {/* drop down when selected */}
  //                   {this.renderMenu(
  //                     this.state.isRealEstateTypeMenuShow,
  //                     this.state.realEstateTypes,
  //                     "real-estate-type-input"
  //                   )}
  //                 </div>
  //               </div>

  //               <div className="col2">
  //                 <h2 className="title">Dự án</h2>
  //                 <div className="input-container">
  //                   <input
  //                     id="project-input"
  //                     placeholder="Nhập tên dự án..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="row">
  //               <div className="col2">
  //                 <h2 className="title">Hướng cửa chính</h2>
  //                 <div
  //                   onClick={() => {
  //                     this.setState({
  //                       isDoorDirectionMenuShown:
  //                         !this.state.isDoorDirectionMenuShown,
  //                     });
  //                   }}
  //                   className="input-container read-only-field"
  //                 >
  //                   <input
  //                     id="door-direction-input"
  //                     readOnly
  //                     placeholder="Chọn hướng..."
  //                     type="text"
  //                     className="input-field read-only-field"
  //                   />
  //                   {/* drop down when selected */}
  //                   {this.renderMenu(
  //                     this.state.isDoorDirectionMenuShown,
  //                     this.state.doorDirections,
  //                     "door-direction-input"
  //                   )}
  //                 </div>
  //               </div>

  //               {/* <div className="col2">
  //                 <h2 className="title">Hướng cửa chính</h2>
  //                 <div className="input-container">
  //                   <input
  //                     placeholder="Hướng cửa chính..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div> */}

  //               {/* <div className="col2">
  //                 <h2 className="title">Hướng ban công</h2>
  //                 <div className="input-container">
  //                   <input
  //                     placeholder="Hướng ban công..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div> */}
  //               <div className="col2">
  //                 <h2 className="title">Hướng ban công</h2>
  //                 <div
  //                   onClick={() => {
  //                     this.setState({
  //                       isBalconyDirectionMenuShown:
  //                         !this.state.isBalconyDirectionMenuShown,
  //                     });
  //                   }}
  //                   className="input-container read-only-field"
  //                 >
  //                   <input
  //                     id="balcony-direction-input"
  //                     readOnly
  //                     placeholder="Chọn hướng..."
  //                     type="text"
  //                     className="input-field read-only-field"
  //                   />
  //                   {/* drop down when selected */}
  //                   {this.renderMenu(
  //                     this.state.isBalconyDirectionMenuShown,
  //                     this.state.balconyDirections,
  //                     "balcony-direction-input"
  //                   )}
  //                 </div>
  //               </div>
  //             </div>

  //             {/* <div className="row">
  //               <div className="col2">
  //                 <h2 className="title">Số phòng ngủ</h2>
  //                 <div className="input-container">
  //                   <input
  //                     placeholder="Nhập số phòng ngủ..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col2">
  //                 <h2 className="title">Số phòng tắm</h2>
  //                 <div className="input-container">
  //                   <input
  //                     placeholder="Nhập số phòng tắm..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //             </div> */}

  //             <div className="row">
  //               <div className="col2">
  //                 <h2 className="title">Quận/Huyện</h2>
  //                 <div
  //                   onClick={() => {
  //                     this.setState({
  //                       isDistrictMenuShown: !this.state.isDistrictMenuShown,
  //                     });
  //                   }}
  //                   className="input-container read-only-field"
  //                 >
  //                   <input
  //                     id="dis-input"
  //                     readOnly
  //                     placeholder="Chọn tên quận/huyện..."
  //                     type="text"
  //                     className="input-field read-only-field"
  //                   />
  //                   {/* drop down when selected */}
  //                   {this.renderDistrictMenu()}
  //                 </div>
  //               </div>
  //               <div className="col2">
  //                 <h2 className="title">Phường/Xã</h2>
  //                 <div
  //                   onClick={() => {
  //                     this.setState({
  //                       isWardMenuShown: !this.state.isWardMenuShown,
  //                     });
  //                   }}
  //                   className="input-container read-only-field"
  //                 >
  //                   <input
  //                     id="ward-input"
  //                     readOnly
  //                     placeholder="Chọn tên phường/xã..."
  //                     type="text"
  //                     className="input-field read-only-field"
  //                   />
  //                   {/* drop down when selected */}
  //                   {this.renderWardMenu()}
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="row">
  //               <div className="col2">
  //                 <h2 className="title">Địa chỉ</h2>
  //                 <div style={{display: "flex"}} className="input-container">
  //                   {/* <input
  //                     id="address-input"
  //                     onChange={this.handleChangeAddress}
  //                     placeholder="Nhập tên và số địa chỉ..."
  //                     type="text"
  //                     className="input-field"
  //                   /> */}
  //                   <input
  //                     id="house-no-input"
  //                     onChange={this.handleChangeAddress}
  //                     placeholder="Số nhà"
  //                     type="text"
  //                     className="cou-input-field-left"
  //                   />
  //                   <div className="cou-line"></div>
  //                   <input
  //                     id="street-name-input"
  //                     onChange={this.handleChangeAddress}
  //                     placeholder="Tên đường"
  //                     type="text"
  //                     className="cou-input-field-right"
  //                   />
  //                 </div>
  //               </div>

  //               <div className="col4">
  //                 <h2 className="title">Số phòng ngủ</h2>
  //                 <div className="input-container">
  //                   <input
  //                     id="bedroom-input"
  //                     placeholder="..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col4">
  //                 <h2 className="title">Số phòng tắm</h2>
  //                 <div className="input-container">
  //                   <input
  //                     id="bathroom-input"
  //                     placeholder="..."
  //                     type="text"
  //                     className="input-field"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             {/* session 3 */}
  //             <div style={{ height: "20px" }}></div>
  //             <div className="row session-row">
  //               <div className="manage-post-tag">
  //                 <span>Mô tả bất động sản</span>
  //               </div>
  //               <div className="manage-post-right-arrow"></div>
  //             </div>

  //             <div className="row">
  //               <div className="col0">
  //                 <h2 className="row-title">Bài viết mô tả</h2>
  //                 <textarea
  //                   id="description-input"
  //                   placeholder="Nhập bài viết mô tả của bất động sản..."
  //                 ></textarea>
  //               </div>
  //             </div>

  //             <div className="row">
  //               <div className="col0">
  //                 <h2 className="row-title">Hình ảnh</h2>
  //                 <div className="file-box">
  //                   <input
  //                     id="images-input"
  //                     aria-label=""
  //                     onChange={this.handleFileChange}
  //                     type="file"
  //                     className="file-input"
  //                   />
  //                   {this.renderSelectedImage()}
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="row reverse-row">
  //               <div
  //                 onClick={this.handleCreatePost}
  //                 className="noselect create-button"
  //               >
  //                 &#65291;
  //                 <span>Tạo bài viết</span>
  //               </div>
  //             </div>

  //             <div style={{ height: "90px" }}></div>
  //           </div>
  //         </div>
  //       </div>
  //     </React.Fragment>
  //   );
  // }
}

export default ManagePost;
