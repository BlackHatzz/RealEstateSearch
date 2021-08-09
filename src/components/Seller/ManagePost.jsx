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
import { RiArrowDropDownLine } from "react-icons/ri";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { ControlPointSharp } from "@material-ui/icons";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Autocomplete from "react-google-autocomplete";
import { useHistory } from "react-router";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";

class ManagePost extends Component {
  placeInfo = null;
  state = {
    //apiKey: "u5upZp6pDlFDxcV9fiknYyjk0hAboyQUngPRB-zJe1A", // here api
    address: "",
    files: [],
    fileImages: [],
    districtWardList: [],
    isRealEstateTypeMenuShow: false,
    selectedRealEstateType: null,
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
    selectedDoorDirection: null,
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
    selectedBalconyDirection: null,
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

    titleTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    priceTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    areaTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    lengthTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    widthTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },

    realEstateTypeTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    doorDirectionTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    disTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    wardTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    streetNameTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    bedroomTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    bathroomTooltip: {
      toggle: false,
      text: "",
      isValid: false,
    },
    isImageValid: true, // default is true so the notification is not shown after the first loaded
    isPopupLoaded: false,
    isAutoCompleteMenuShown: false,
    autoCompleteMenu: [],
  };

  componentDidMount() {
    console.log("fb.auth.currentUser?.uid");
    console.log(fb.auth.currentUser?.uid);
    // get districts and wards data
    fetch(
      Constants.getDistrictsAndWards
      //   "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/address/getAddress"
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
        (error) => {}
      );
    // set key event
    document
      .getElementById("title-textarea")
      .addEventListener("keypress", (evt) => {
        // this.updateCount();
        console.log("heriwjeorw");
        console.log(evt);
        if (evt.which === 13) {
          evt.preventDefault();
        }
        // else {
        //   if (
        //     document.getElementById("title-input").textContent.length >= 100
        //   ) {
        //     evt.preventDefault();
        //   }
        // }
      });
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
    // this.state.selectedDistrictId = selectedDistrict.id;
    this.setState({
      selectedDistrictId: selectedDistrict.id,
      disTooltip: {
        toggle: false,
        text: "",
      },
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
    }
    return null;
  };

  handleSelectWard = (selectedWard) => {
    this.setState({
      selectedWardId: selectedWard.wardId,
      wardTooltip: {
        toggle: false,
        text: "",
      },
    });
    document.getElementById("ward-input").value =
      selectedWard.wardName.toString();
    // document.getElementById("ward-input").value = selectedWard.title.toString();
  };

  renderWardMenu = () => {
    if (this.state.isWardMenuShown && this.state.selectedDistrictId != null) {
      return (
        <div className="manage-post-drop-down-menu">
          {this.state.districtWardList[
            this.state.selectedDistrictId - 1
          ].wards.map((ward) => (
            <React.Fragment key={ward.wardId}>
              <div onClick={() => this.handleSelectWard(ward)} className="item">
                <span>{ward.wardName}</span>
              </div>
              <div className="line"></div>
            </React.Fragment>
          ))}
        </div>
      );
    }
  };
  renderMenu = (toggleValue, list, elementId, handler = null) => {
    if (toggleValue) {
      return (
        <div className="manage-post-drop-down-menu">
          {list.map((item) => (
            <React.Fragment key={item.key}>
              <div
                onClick={() => {
                  document.getElementById(elementId.toString()).value =
                    item.title.toString();
                  if (handler != null) {
                    handler(item);
                  }
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
    this.setState({
      isAutoCompleteMenuShown: true,
    })
    const address = event.target.value.toString();

    const dis = document.getElementById("dis-input").value.toString();
    const ward = document.getElementById("ward-input").value.toString();
    const houseNo = document.getElementById("house-no-input").value.toString();

    console.log("handle change address");
    console.log(address);

    console.log(dis);
    console.log(ward);
    console.log(houseNo);

    const searchText =
      "Việt Nam, Hồ Chí Minh, " +
      dis +
      ", " +
      ward +
      // ", " +
      // houseNo +
      " " +
      address;

    fetch(
      Constants.host + "/api/v1/realEstate/autocomplete/" + searchText 
      // "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Việt Nam, Hồ Chí Minh, Quận 1, phường Nguyễn Cư Trinh,  T&key=AIzaSyDPzD4tPUGV3HGIiv7fVcWEFEQ0r1AAxwg&language=vi"
      //   "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
      //     searchText +
      //     "&key=AIzaSyDPzD4tPUGV3HGIiv7fVcWEFEQ0r1AAxwg&sessiontoken=1234567890&language=vi"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("google autocomplete");
          console.log(result);
          var temp = [];
          if(result.predictions != null) {
            for(var i = 0; i < result.predictions.length; i++) {
              temp.push({
                id: i,
                title: result.predictions[i].structured_formatting.main_text
              });
            }
          }
          this.state.autoCompleteMenu = temp;
          this.setState({
            autoCompleteMenu: [...temp],
          });
          console.log(this.state.autoCompleteMenu);
        },
        (error) => {}
      );
  };

  checkAllFields = () => {
    const title = document.getElementById("title-textarea").value.toString();
    const streetName = document
      .getElementById("street-name-input")
      .value.toString();

    // check conditions
    var isValid = true;
    if (title === "") {
      isValid = false;
      this.setState({
        titleTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    }

    const priceString = document.getElementById("price-input").value.toString();
    if (priceString === "") {
      isValid = false;
      this.setState({
        priceTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    } else if (isNaN(priceString)) {
      isValid = false;
      this.setState({
        priceTooltip: {
          toggle: true,
          text: "Dữ liệu phải là số",
        },
      });
    }

    const areaString = document.getElementById("area-input").value.toString();
    if (areaString === "") {
      isValid = false;
      this.setState({
        areaTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    } else if (isNaN(areaString)) {
      isValid = false;
      this.setState({
        areaTooltip: {
          toggle: true,
          text: "Dữ liệu phải là số",
        },
      });
    }

    const lengthString = document
      .getElementById("length-input")
      .value.toString();
    if (lengthString === "") {
      isValid = false;
      this.setState({
        lengthTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    } else if (isNaN(lengthString)) {
      isValid = false;
      this.setState({
        lengthTooltip: {
          toggle: true,
          text: "Dữ liệu phải là số",
        },
      });
    }

    const widthString = document.getElementById("width-input").value.toString();
    if (widthString === "") {
      isValid = false;
      this.setState({
        widthTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    } else if (isNaN(widthString)) {
      isValid = false;
      this.setState({
        widthTooltip: {
          toggle: true,
          text: "Dữ liệu phải là số",
        },
      });
    }

    if (this.state.selectedRealEstateType == null) {
      isValid = false;
      this.setState({
        realEstateTypeTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    }

    if (this.state.selectedDoorDirection == null) {
      isValid = false;
      this.setState({
        doorDirectionTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    }
    if (this.state.selectedDistrictId == null) {
      isValid = false;
      this.setState({
        disTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    }
    if (this.state.selectedWardId == null) {
      isValid = false;
      this.setState({
        wardTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    }

    if (streetName === "") {
      isValid = false;
      this.setState({
        streetNameTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    }

    const numberOfBedroomString = document
      .getElementById("bedroom-input")
      .value.toString();
    if (numberOfBedroomString === "") {
      isValid = false;
      this.setState({
        bedroomTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    } else if (isNaN(numberOfBedroomString)) {
      isValid = false;
      this.setState({
        bedroomTooltip: {
          toggle: true,
          text: "Dữ liệu phải là số dương",
        },
      });
    }

    const numberOfBathroomString = document
      .getElementById("bathroom-input")
      .value.toString();
    if (numberOfBathroomString === "") {
      isValid = false;
      this.setState({
        bathroomTooltip: {
          toggle: true,
          text: "Dữ liệu bắt buộc",
        },
      });
    } else if (isNaN(numberOfBathroomString)) {
      isValid = false;
      this.setState({
        bathroomTooltip: {
          toggle: true,
          text: "Dữ liệu phải là số dương",
        },
      });
    }

    if (this.state.files == null) {
      isValid = false;
      this.setState({
        isImageValid: false,
      });
    } else if (this.state.files.length == 0) {
      isValid = false;
      this.setState({
        isImageValid: false,
      });
    } else {
      this.setState({
        isImageValid: true,
      });
    }

    return isValid;
  };

  handleCreatePost = () => {
    // get all value to crate a post
    const title = document.getElementById("title-textarea").value.toString();
    const price = parseFloat(
      document.getElementById("price-input").value.toString()
    );
    const area = parseFloat(
      document.getElementById("area-input").value.toString()
    );
    const length = parseFloat(
      document.getElementById("length-input").value.toString()
    );
    const width = parseFloat(
      document.getElementById("width-input").value.toString()
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

    // const description = document
    //   .getElementById("description-input")
    //   .value.toString();
    const description = document.getElementsByClassName(
      "public-DraftEditor-content"
    )[0].textContent;
    const images = document.getElementById("images-input").value;
    
    if (!this.checkAllFields()) {
      return;
    }

    console.log("get all");
    console.log(title);
    console.log(price);
    console.log(area);
    console.log(investor);

    console.log(realEstateType);
    console.log(project);
    console.log(doorDirection);
    console.log(balconyDirection);
    console.log("dis ward id");
    console.log(this.state.selectedDistrictId);
    console.log(this.state.selectedWardId);
    // console.log(address);
    console.log(numberOfBedroom);
    console.log(numberOfBathroom);

    console.log(description);
    console.log(images);

    console.log(this.state.file);

    const searchText =
      houseNo.toString() +
      " " +
      streetName +
      ", phuong " +
      ward +
      ", " +
      dis +
      ", ho chi minh, viet nam";

    async function fetchLocationData(searchText) {
      var data = null;
      await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          searchText +
          "&key=AIzaSyAk_HxKWrfBT1g9WkfL0gqRIa9HD0d7Q0I"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("lat long");
            console.log(result);
            data = result;
          },
          (error) => {}
        );
      await console.log("done 1");
      return data;
    }

    const putFileToStorage = async () => {
      var downloadURLs = [];
      for (var i = 0; i < this.state.fileImages.length; i++) {
        const imageNamez = this.uuidv4();
        await fb.storage
          .ref()
          .child("images/" + imageNamez + ".png")
          .put(this.state.fileImages[i])
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(downloadURL);
              downloadURLs.push(downloadURL);
            });
          });
      }
      return downloadURLs;
    };

    putFileToStorage().then((downloadURLs) => {
      console.log("then loop image");
      console.log(downloadURLs);

      fetchLocationData(searchText).then((locationData) => {
        console.log("after fetch location data");
        const locationRealEstate = locationData.results[0].geometry.location;
        console.log(locationRealEstate);
        var downloadURLsJSON = [];
        console.log("oopopo");
        for (var i = 0; i < downloadURLs.length; i++) {
          downloadURLsJSON.push({
            imgUrl: downloadURLs[i],
          });
        }

        console.log("before create request");
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sellerId: fb.auth.currentUser?.uid,
            // sellerId: "JvY1p2IyXTSxeKXmF4XeE5lOHkw2",
            title: title,
            view: 0,
            districtId: this.state.selectedDistrictId,
            wardId: this.state.selectedWardId,
            length: length,
            width: width,
            streetName: streetName,
            realEstateNo: houseNo,
            latitude: locationRealEstate.lat,
            longitude: locationRealEstate.lng,
            typeId: this.state.selectedRealEstateType,
            description: description,
            area: area,
            price: price,
            direction: doorDirection,
            balconyDirection: balconyDirection,
            project: project,
            investor: investor,
            juridical: "Đã có sổ đỏ",
            furniture: "Nội thất cao cấp",
            numberOfBedroom: numberOfBedroom,
            numberOfBathroom: numberOfBathroom,
            images: downloadURLsJSON,
            address: `${houseNo} ${streetName}, ${ward}, ${dis}, Hồ Chí Minh, Việt Nam`,
          }),
        };

        fetch(Constants.createRealEstateRef, requestOptions)
          .then((res) => res.json())
          .then(
            (result) => {
              // console.log(result.content);
              console.log("a new realestate is created");
              console.log(result);
              this.setState({
                isLoaded: true,
              });
            },
            (error) => {}
          );
      });
    });

    return;
  };

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  handleFileChange = (event) => {
    var fileURLs = [];
    for (var i = 0; i < event.target.files.length; i++) {
      const url = URL.createObjectURL(event.target.files[i]);
      fileURLs[i] = url;
    }
    this.setState({
      // file: URL.createObjectURL(event.target.files[0]),
      // fileImage: event.target.files[0],
      files: [...this.state.files, ...fileURLs],
      fileImages: [...this.state.fileImages, ...event.target.files],
    });
  };

  handleAutoResizeTextArea = (id) => {
    const element = document.getElementById(id);
    element.style.height = "1px";
    element.style.height = element.scrollHeight - 16 + "px";
  };

  renderContent = (close) => {
    if (!this.state.isLoaded) {
      console.log("not again");
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
        <Link
          onClick={() => {
            this.state.isLoaded = false;
            if (close != null) {
              close();
            }
          }}
          style={{ color: "black" }}
          className="noselect confirm link"
          to="/seller-search-post"
        >
          <span>OK</span>
        </Link>
      </React.Fragment>
    );
  };

  updateCount = () => {
    if (document.getElementById("title-textarea") == null) {
      return;
    }

    const text = document.getElementById("title-textarea").value.toString();
    console.log(text);
    document.getElementById("title-input-count").textContent =
      text.length.toString() + "/100";

    return text.length;
  };

  renderTooltip = (title, cusStyle = null) => {
    return (
      <div
        style={cusStyle == null ? {} : cusStyle}
        className="seller-manage-post-tooltip"
      >
        <p className="tooltiptext">{title.toString()}</p>
      </div>
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
            <h2 className="title">Tiêu đề*</h2>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="input-container"
            >
              {/* <input
                id="title-input"
                placeholder="Nhập tiêu đề bài viết..."
                type="text"
                className="input-field"
                onChange={this.updateCount}
                maxLength="100"
              /> */}
              {/* <div className="div-field-container">
                <div
                  id="title-input"
                  placeholder="Nhập tiêu đề bài viết..."
                  type="text"
                  slot="input"
                  contentEditable="true"
                  className="div-field"
                  maxLength="100"
                ></div>
              </div> */}
              {this.state.titleTooltip.toggle
                ? this.renderTooltip(this.state.titleTooltip.text, {
                    top: "-50px",
                  })
                : null}
              <textarea
                id="title-textarea"
                onKeyUp={() => {
                  this.handleAutoResizeTextArea("title-textarea");
                  this.updateCount();
                }}
                onChange={(event) => {
                  const value = event.target.value.toString();
                  if (value === "") {
                    this.setState({
                      titleTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      titleTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (value === "") {
                    this.setState({
                      titleTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      titleTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                placeholder="Nhập tiêu đề bài viết..."
                className="area-field"
                maxLength="100"
              ></textarea>

              <span id="title-input-count" className="count">
                0/100
              </span>
            </div>
          </div>
        </div>

        <div style={{ justifyContent: "flex-start" }} className="row">
          <div className="col3">
            <h2 className="title">
              Giá tiền*
              <br />
              tỷ đồng
            </h2>
            <div className="input-container">
              {this.state.priceTooltip.toggle
                ? this.renderTooltip(this.state.priceTooltip.text)
                : null}
              <input
                onChange={(event) => {
                  const value = event.target.value;
                  if (isNaN(value)) {
                    this.setState({
                      priceTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      priceTooltip: {
                        toggle: false,
                        text: "",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      priceTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (isNaN(value)) {
                    this.setState({
                      priceTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      priceTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      priceTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                id="price-input"
                placeholder="tỷ đồng"
                type="text"
                className="input-field"
                maxLength="4"
              />
            </div>
          </div>

          <div className="col2">
            <h2 className="title">Chủ đầu tư</h2>
            <div className="input-container">
              <input
                id="investor-input"
                placeholder="Tên chủ đầu tư"
                type="text"
                className="input-field"
                maxLength="25"
              />
            </div>
          </div>

          {/* <div className="col3">
            <h2 className="title">Chủ đầu tư</h2>
            <div className="input-container">
              <input
                id="investor-input"
                placeholder="Tên chủ đầu tư"
                type="text"
                className="input-field"
              />
            </div>
          </div> */}
        </div>

        <div className="row">
          <div className="col3">
            <h2 className="title">
              Diện tích*
              <br />
              m2
            </h2>
            <div className="input-container">
              {this.state.areaTooltip.toggle
                ? this.renderTooltip(this.state.areaTooltip.text)
                : null}
              <input
                onChange={(event) => {
                  const value = event.target.value;
                  if (isNaN(value)) {
                    this.setState({
                      areaTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      areaTooltip: {
                        toggle: false,
                        text: "",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      areaTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (isNaN(value)) {
                    this.setState({
                      areaTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      areaTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      areaTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                id="area-input"
                placeholder="m2"
                type="text"
                className="input-field"
                maxLength="4"
              />
            </div>
          </div>

          <div className="col3">
            <h2 className="title">
              Chiều dài*
              <br />
              m2
            </h2>
            <div className="input-container">
              {this.state.lengthTooltip.toggle
                ? this.renderTooltip(this.state.lengthTooltip.text)
                : null}
              <input
                onChange={(event) => {
                  const value = event.target.value;
                  if (isNaN(value)) {
                    this.setState({
                      lengthTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      lengthTooltip: {
                        toggle: false,
                        text: "",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      lengthTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (isNaN(value)) {
                    this.setState({
                      lengthTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      lengthTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      lengthTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                id="length-input"
                placeholder="m2"
                type="text"
                className="input-field"
                maxLength="4"
              />
            </div>
          </div>

          <div className="col3">
            <h2 className="title">
              Chiều rộng*
              <br />
              m2
            </h2>
            <div className="input-container">
              {this.state.widthTooltip.toggle
                ? this.renderTooltip(this.state.widthTooltip.text)
                : null}
              <input
                onChange={(event) => {
                  const value = event.target.value;
                  if (isNaN(value)) {
                    this.setState({
                      widthTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      widthTooltip: {
                        toggle: false,
                        text: "",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      widthTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (isNaN(value)) {
                    this.setState({
                      widthTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      widthTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      widthTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                id="width-input"
                placeholder="m2"
                type="text"
                className="input-field"
                maxLength="4"
              />
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col2">
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
        </div> */}

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
            <h2 className="title">Loại bất động sản*</h2>
            <div
              onClick={() => {
                this.setState({
                  isRealEstateTypeMenuShow:
                    !this.state.isRealEstateTypeMenuShow,
                });
              }}
              className="input-container read-only-field"
            >
              {this.state.realEstateTypeTooltip.toggle
                ? this.renderTooltip(this.state.realEstateTypeTooltip.text)
                : null}
              <input
                onChange={() => {
                  this.setState({
                    realEstateTypeTooltip: {
                      toggle: false,
                      text: "",
                    },
                  });
                }}
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
                "real-estate-type-input",
                (selectedItem) => {
                  this.setState({
                    selectedRealEstateType: selectedItem.key,
                    realEstateTypeTooltip: {
                      toggle: false,
                      text: "",
                    },
                  });
                }
              )}
              {/* <RiArrowDropDownLine className="drop-down-icon" /> */}
            </div>
            <div className="drop-down-icon-container">
              <ArrowDropDownIcon className="drop-down-icon" />
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
                maxLength="25"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col2">
            <h2 className="title">Hướng cửa chính*</h2>
            <div
              onClick={() => {
                this.setState({
                  isDoorDirectionMenuShown:
                    !this.state.isDoorDirectionMenuShown,
                });
              }}
              className="input-container read-only-field"
            >
              {this.state.doorDirectionTooltip.toggle
                ? this.renderTooltip(this.state.doorDirectionTooltip.text)
                : null}
              <input
                onChange={() => {
                  this.setState({
                    doorDirectionTooltip: {
                      toggle: false,
                      text: "",
                    },
                  });
                }}
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
                "door-direction-input",
                (selectedItem) => {
                  this.setState({
                    selectedDoorDirection: selectedItem.key,
                    doorDirectionTooltip: {
                      toggle: false,
                      text: "",
                    },
                  });
                }
              )}
            </div>
            <div className="drop-down-icon-container">
              <ArrowDropDownIcon className="drop-down-icon" />
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
            <div className="drop-down-icon-container">
              <ArrowDropDownIcon className="drop-down-icon" />
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
            <h2 className="title">Quận/Huyện*</h2>
            <div
              onClick={() => {
                this.setState({
                  isDistrictMenuShown: !this.state.isDistrictMenuShown,
                });
              }}
              className="input-container read-only-field"
            >
              {this.state.disTooltip.toggle
                ? this.renderTooltip(this.state.disTooltip.text)
                : null}
              <input
                id="dis-input"
                readOnly
                placeholder="Chọn tên quận/huyện..."
                type="text"
                className="input-field read-only-field"
              />
              {this.renderDistrictMenu()}
            </div>
            <div className="drop-down-icon-container">
              <ArrowDropDownIcon className="drop-down-icon" />
            </div>
          </div>
          <div className="col2">
            <h2 className="title">Phường/Xã*</h2>
            <div
              onClick={() => {
                this.setState({
                  isWardMenuShown: !this.state.isWardMenuShown,
                });
              }}
              className="input-container read-only-field"
            >
              {this.state.wardTooltip.toggle
                ? this.renderTooltip(this.state.wardTooltip.text)
                : null}
              <input
                id="ward-input"
                readOnly
                placeholder="Chọn tên phường/xã..."
                type="text"
                className="input-field read-only-field"
              />
              {this.renderWardMenu()}
            </div>
            <div className="drop-down-icon-container">
              <ArrowDropDownIcon className="drop-down-icon" />
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col1">
            <h2 className="title">Địa chỉ</h2>
            <div className="input-container">
              <Autocomplete
                id="full-address-input"
                className="input-field"
                apiKey={"AIzaSyDPzD4tPUGV3HGIiv7fVcWEFEQ0r1AAxwg"}
                language="vi"
                options={{
                  types: ["address"],
                  fields: [
                    "address_components",
                    "geometry",
                    "formatted_address",
                  ],
                  // placeIdOnly: "ChIJ0T2NLikpdTERKxE8d61aX_E",
                  componentRestrictions: { country: "vn" },
                }}
                onPlaceSelected={(place) => {
                  this.placeInfo = place;
                  console.log("find lan");
                  console.log(place.geometry.location.lat());
                  console.log(place);
                  console.log("full text");
                  console.log(
                    document.getElementById("full-address-input").value
                  );
                  //   geocodingRefWithSearchText(place)
                }}
                placeholder="Nhập địa chỉ..."
              />
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col2">
            <h2 className="title">Địa chỉ*</h2>
            <div style={{ display: "flex" }} className="input-container">
              {/* <input
                      id="address-input"
                      placeholder="Nhập tên và số địa chỉ..."
                      type="text"
                      className="input-field"
                    />  */}
              <input
                id="house-no-input"
                placeholder="Số nhà"
                type="text"
                className="cou-input-field-left"
              />
              <div className="cou-line"></div>
              {this.state.streetNameTooltip.toggle
                ? this.renderTooltip(this.state.streetNameTooltip.text)
                : null}
              <div style={{maxWidth: "calc(100% - 30% - 8px - 8px)"}}>
              <input
                onChange={(event) => {
                  const value = event.target.value.toString();
                  if (value === "") {
                    this.setState({
                      streetNameTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      streetNameTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (value === "") {
                    this.setState({
                      streetNameTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      streetNameTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                  // this.setState({
                  //   isAutoCompleteMenuShown: false,
                  // })
                }}
                id="street-name-input"
                onChange={this.handleChangeAddress}
                placeholder="Tên đường"
                type="text"
                style={{width: "100%"}}
                className="cou-input-field-right"
              />
              {this.renderMenu(
                this.state.isAutoCompleteMenuShown,
                this.state.autoCompleteMenu,
                "street-name-input",
                (selectedItem) => {
                  document.getElementById("street-name-input").value = selectedItem.title;
                  this.setState({
                    isAutoCompleteMenuShown: false,
                    streetNameTooltip: {
                      toggle: false,
                      text: "",
                      isValid: true,
                    },
                  })
                }
              )}
              </div>
              
            </div>
          </div>

          <div className="col4">
            <h2 className="title">Số phòng ngủ*</h2>
            <div
              style={{ paddingLeft: "10px", paddingRight: "8px" }}
              className="input-container"
            >
              {this.state.bedroomTooltip.toggle
                ? this.renderTooltip(this.state.bedroomTooltip.text)
                : null}
              <input
                onChange={(event) => {
                  const value = event.target.value;
                  if (isNaN(value)) {
                    this.setState({
                      bedroomTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      bedroomTooltip: {
                        toggle: false,
                        text: "",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      bedroomTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (isNaN(value)) {
                    this.setState({
                      bedroomTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      bedroomTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      bedroomTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                id="bedroom-input"
                placeholder="..."
                type="text"
                className="input-field"
                maxLength="2"
              />
            </div>
          </div>

          {/* <div style={{ width: "50px" }}></div> */}

          <div className="col4">
            <h2 className="title">Số phòng vệ sinh*</h2>
            <div
              style={{ paddingLeft: "10px", paddingRight: "8px" }}
              className="input-container"
            >
              {this.state.bathroomTooltip.toggle
                ? this.renderTooltip(this.state.bathroomTooltip.text)
                : null}
              <input
                onChange={(event) => {
                  const value = event.target.value;
                  if (isNaN(value)) {
                    this.setState({
                      bathroomTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      bathroomTooltip: {
                        toggle: false,
                        text: "",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      bathroomTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                onBlur={(event) => {
                  const value = event.target.value.toString();
                  if (isNaN(value)) {
                    this.setState({
                      bathroomTooltip: {
                        toggle: true,
                        text: "Dữ liệu phải là số dương",
                        isValid: false,
                      },
                    });
                  } else if (value === "") {
                    this.setState({
                      bathroomTooltip: {
                        toggle: true,
                        text: "Dữ liệu bắt buộc nhập",
                        isValid: false,
                      },
                    });
                  } else {
                    this.setState({
                      bathroomTooltip: {
                        toggle: false,
                        text: "",
                        isValid: true,
                      },
                    });
                  }
                }}
                id="bathroom-input"
                placeholder="..."
                type="text"
                className="input-field"
                maxLength="2"
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
            <Editor
              id="editor"
              // editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="custom-wrapper-editor"
              editorClassName="custom-editor"

              // onEditorStateChange={this.onEditorStateChange}
            />
            {/* <textarea
              id="description-input"
              placeholder="Nhập bài viết mô tả của bất động sản..."
            ></textarea> */}
          </div>
        </div>

        <div className="row">
          <div className="col0">
            <h2 className="row-title">Hình ảnh*</h2>
            {(() => {
              if (!this.state.isImageValid) {
                return (
                  <h2
                    style={{ color: "red", fontSize: "13px" }}
                    className="row-title"
                  >
                    *Vui lòng chọn ít nhất 1 hình
                  </h2>
                );
              }
            })()}

            <div className="file-box">
              {this.state.files.length == 0 ? (
                <React.Fragment>
                  <div className="file-input-ui-first">
                    <div className="gallery"></div>
                    <span>Nhấn để chọn hình ảnh</span>
                  </div>

                  <input
                    id="images-input"
                    aria-label=""
                    onChange={this.handleFileChange}
                    type="file"
                    className="file-input"
                    multiple="multiple"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </React.Fragment>
              ) : null}
              {
                // render selected file
                this.state.files.map((file, index) => (
                  <div
                    key={index}
                    style={{ backgroundImage: "url('" + file + "')" }}
                    className="selected-file"
                  >
                    <div
                      onClick={() => {
                        console.log("delete image");
                        // console.log(this.state.files.splice(index, 1));
                        this.state.files.splice(index, 1);
                        this.setState({
                          files: [...this.state.files],
                        });
                      }}
                      className="delete-file-container"
                    >
                      <ClearIcon className="icon" />
                    </div>
                  </div>
                ))
              }

              {this.state.files.length > 0 ? (
                <React.Fragment>
                  <div className="file-input-ui-last">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                      }}
                    >
                      <div className="gallery"></div>
                      <span>Nhấn để chọn hình ảnh</span>
                    </div>
                    <input
                      id="images-input"
                      aria-label=""
                      onChange={this.handleFileChange}
                      type="file"
                      className="file-input"
                      multiple="multiple"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </div>
                </React.Fragment>
              ) : null}
              {/* <div className="selected-file"></div> */}
              {/* {this.renderSelectedImage()} */}
            </div>
          </div>
        </div>

        {this.state.isPopupLoaded ? (
          <div className="whole-screen">
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="success-popup-container"
            >
              {this.renderContent(() => {
                this.setState({
                  isPopupLoaded: false,
                });
              })}
            </div>
          </div>
        ) : null}
        <div className="row reverse-row">
          <div
            onClick={() => {
              if (this.checkAllFields()) {
                this.setState({
                  isPopupLoaded: true,
                });
                this.handleCreatePost();
              }
            }}
            className="noselect create-button"
          >
            &#65291;
            <span>Tạo bài viết</span>
          </div>
        </div>

        {/* <Popup
          ref={React.createRef()}
          overlayStyle={{
            backgroundColor: "rgba(10, 10, 10, 0.6)",
          }}
          onClick={(event) => {
            console.log(event);
          }}
          onClose={false}
          modal
          onOpen={(event) => {
            console.log("on open");
            console.log(event);
          }}
          trigger={
            <div className="row reverse-row">
              <div
                onClick={this.handleCreatePost}
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
            // <div
            //   style={{
            //     width: "100vw",
            //     height: "100vh",
            //     display: "flex",
            //     alignItems: "center",
            //     justifyContent: "center",
            //     backgroundColor: "rgba(10, 10, 10, 0.4)",
            //   }}
            // >
            <div className="success-popup-container">
              {this.renderContent(close)}
            </div>
            // </div>
            // <SuccessPopup
            //   close={close}
            //   title="Chúc Mừng! Bạn đã tạo bài viết thành công!"
            // />
          )}
        </Popup> */}

        <div style={{ height: "90px" }}></div>
      </React.Fragment>
    );
  }
}

export default ManagePost;
