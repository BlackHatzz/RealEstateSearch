import React, { Component } from "react";
import "./home.css";
import "./home-mobile.css";
import "../global/shared.css";
import { AiOutlineSearch } from "react-icons/ai";
import HomeFilterBox from "./home-filter-box";
// import {Router, Route, Link, RouteHandler} from 'react-router';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import BuyerNavbar from "../global/BuyerNavbar";
import Constants from "../global/Constants";
import { fb } from "../../services";
import Popup from "reactjs-popup";
import TransactionConfirmForm from "../global/TransactionConfirmForm";

class HomePage extends Component {
  state = {
    isTooltipShown: false,
    searchText: "",
    items: [],
    fromAreaText: null,
    toAreaText: null,
    fromPriceText: null,
    toPriceText: null,
    // type 0: is drop down menu
    // type 1: from to field
    filters: [
      {
        key: 0,
        filterName: "Loại nhà đất",
        typeKey: 0,
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả" },
          { key: 1, text: "Chung Cư" },
          { key: 2, text: "Nhà" },
          { key: 3, text: "Đất" },
        ],
      },
      {
        key: 1,
        filterName: "Diện tích",
        typeKey: 1,
        title: "Tất cả",
        sign: Constants.squareMeter,
        options: [
          { key: 0, text: "Tất cả" },
          // { key: 1, text: "< 50" + Constants.squareMeter },
          // {
          //   key: 2,
          //   text:
          //     "50" + Constants.squareMeter + " - 100" + Constants.squareMeter,
          // },
          // {
          //   key: 3,
          //   text:
          //     "100" + Constants.squareMeter + "- 200" + Constants.squareMeter,
          // },
          // {
          //   key: 4,
          //   text:
          //     "200" + Constants.squareMeter + "- 300" + Constants.squareMeter,
          // },
          // {
          //   key: 5,
          //   text:
          //     "300" + Constants.squareMeter + "- 400" + Constants.squareMeter,
          // },
          // {
          //   key: 6,
          //   text:
          //     "400" + Constants.squareMeter + "- 500" + Constants.squareMeter,
          // },
          // {
          //   key: 7,
          //   text: "> 500" + Constants.squareMeter,
          // },
        ],
      },
      {
        key: 2,
        filterName: "Khu vực",
        typeKey: 0,
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả" },
          {
            key: 1,
            text: "Quận 1",
            children: [
              { key: 0, text: "child 1" },
              { key: 0, text: "child 1" },
            ],
          },
          { key: 2, text: "Quận 2" },
          { key: 3, text: "Quận 3" },
          { key: 4, text: "Quận 4" },
          { key: 5, text: "Quận 5" },
          { key: 6, text: "Quận 6" },
          { key: 7, text: "Quận 7" },
          { key: 8, text: "Quận 8" },
          { key: 9, text: "Quận 9" },
          { key: 10, text: "Quận 10" },
          { key: 11, text: "Quận 11" },
          { key: 12, text: "Quận 12" },
        ],
      },

      {
        key: 3,
        filterName: "Mức giá",
        typeKey: 1,
        title: "Tất cả",
        sign: " tỷ",
        options: [
          { key: 0, text: "Tất cả" },
          // { key: 1, text: "< 1 tỷ" },
          // { key: 2, text: "1 tỷ - 2 tỷ" },
          // { key: 3, text: "2 tỷ - 3 tỷ" },
          // { key: 4, text: "3 tỷ - 5 tỷ" },
          // { key: 5, text: "5 tỷ - 10 tỷ" },
          // { key: 6, text: "10 tỷ - 20 tỷ" },
          // { key: 7, text: "> 20 tỷ" },
        ],
      },
    ],
    type: {
      selectedKey: 0,
      text: "Tất cả",
    },
    area: {
      selectedKey: 0,
      text: "Tất cả",
    },
    address: {
      selectedKey: 0,
      text: "Tất cả",
    },
    price: {
      selectedKey: 0,
      text: "Tất cả",
    },
    // optionList: [
    //   [{key: 0, text: "Chung Cư"}, {key: 1, text: "Nhà"}, {key: 2, text: "Đất"}],
    //   [{key: 0, text: "< 500 triệu"}, {key: 1, text: "500 - 1 tỷ"}, {key: 2, text: "1 tỷ - 2 tỷ"}, {key: 3, text: "2 tỷ - 5 tỷ"}]
    // ]
    advancedFilters: [
      {
        key: 4,
        filterName: "Hướng cửa chính",
        typeKey: 0,
        title: "Tất cả hướng",
        options: [
          { key: 0, text: "Tất cả hướng" },
          { key: 1, text: "Đông" },
          { key: 2, text: "Đông Nam" },
          { key: 3, text: "Nam" },
          { key: 4, text: "Tây Nam" },
          { key: 5, text: "Tây" },
          { key: 6, text: "Tây Bắc" },
          { key: 7, text: "Bắc" },
          { key: 8, text: "Đông Bắc" },
        ],
      },
      {
        key: 5,
        filterName: "Phòng ngủ",
        typeKey: 0,
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả", value: 0 },
          { key: 1, text: "1+", value: 1 },
          { key: 2, text: "2+", value: 2 },
          { key: 3, text: "3+", value: 3 },
          { key: 4, text: "4+", value: 4 },
        ],
      },
      {
        key: 6,
        filterName: "Phòng vệ sinh",
        typeKey: 0,
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả", value: 0 },
          { key: 1, text: "1+", value: 1 },
          { key: 2, text: "2+", value: 2 },
          { key: 3, text: "3+", value: 3 },
          { key: 4, text: "4+", value: 4 },
        ],
      },

      {
        key: 7,
        filterName: "Sắp xếp",
        typeKey: 0,
        title: "Bất động sản nổi bật",
        options: [
          { key: 0, text: "Bất động sản nổi bật", value: "view" },
          { key: 1, text: "Tin mới nhất", value: "-r.create_at" },
          { key: 2, text: "Giá thấp đến cao", value: "rd.price" },
          { key: 3, text: "Giá cao đến thấp", value: "-rd.price" },
          { key: 4, text: "Diện tích nhỏ đến lớn", value: "rd.area" },
          { key: 5, text: "Diện tích lớn đến nhỏ", value: "-rd.area" },
        ],
      },
    ],
    selectedDoorDirection: { key: 0, text: "Tất cả hướng" },
    selectedBedroom: { key: 0, text: "Tất cả", value: 0 },
    selectedBathroom: { key: 0, text: "Tất cả", value: 0 },
    selectedSort: { key: 0, text: "Bất động sản nổi bật", value: "view" },
  };

  componentDidMount() {
    // const update = {
    //   displayName: 'David',
    //   photoURL: 'https://i.ibb.co/NjFGvWn/David-Beckham.jpg',
    // };
    // fb.auth.currentUser.updateProfile(update);
    // console.log(fb.auth.currentUser.uid);
    // const { searchText } = this.state;
    // console.log("search ");
    // console.log(searchText);
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     page: 0,
    //     address: "phu",
    //     title: "phu",
    //     project: null,
    //     fromPrice: null,
    //     toPrice: null,
    //     fromArea: null,
    //     toArea: null,
    //     type: null,
    //   }),
    // };
    // fetch(
    //   "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/realEstate/getRealEstateDetail",
    //   requestOptions
    // )
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       // console.log(result.content);
    //       console.log("cloud");
    //       console.log(result);
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

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     page: 0,
    //     search: "",
    //     disName: null,
    //     minPrice: 0,
    //     maxPrice: 9999,
    //     minArea: 0,
    //     maxArea: 9999,
    //     type: null
    //   }),
    // };
    // fetch(Constants.getRealEstateRef, requestOptions)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log("search result eeee");
    //       console.log(result);
    //     },
    //     (error) => {
    //     }
    //   );
    fetch(Constants.getAllDistricts)
      .then((res) => res.json())
      .then(
        (result) => {
          var temp = [{ key: 0, text: "Tất cả" }];
          for (var i = 0; i < result.length; i++) {
            temp.push({ key: result[i].id, text: result[i].name });
          }

          this.state.filters[2] = {
            key: 2,
            filterName: "Khu vực",
            typeKey: 0,
            title: "Tất cả",
            options: temp,
          };

          this.setState({
            filters: [...this.state.filters],
          });
        },
        (error) => {}
      );
  }

  handleFilter = (filterKey, filterTypeKey, itemKey, title) => {
    console.log("inssss" + filterKey + itemKey + title);
    switch (filterKey) {
      case 0:
        this.state.type = {
          selectedKey: itemKey,
          text: title,
        };
        // console.log(this.state.type);
        break;
      case 1:
        const split = title.split("-");
        console.log(split);
        var from = null;
        var to = null;
        // get number only
        // 2 loop times is maximum
        console.log("first split");
        console.log(split);
        for (var i = 0; i < split.length; i++) {
          if (split[i].match(/\d+/) != null) {
            if (split[i].match(/\d+/).length > 0) {
              const number = split[i].match(/\d+/)[0];
              // console.log(number);
              if (i == 0) {
                from = parseInt(number);
              } else if (i == 1) {
                to = parseInt(number);
              }
            }
          }
        }
        this.state.fromAreaText = from == null ? "null" : from.toString();
        this.state.toAreaText = to == null ? "null" : to.toString();
        console.log("afterrr");
        // console.log(this.state.fromAreaText);
        // console.log(this.state.toAreaText);

        // console.log("after");
        // console.log(from);
        // console.log(to);

        this.state.area = {
          selectedKey: itemKey,
          text: title,
        };
        break;
      case 2:
        this.state.address = {
          selectedKey: itemKey,
          text: title,
        };
        break;
      case 3:
        const split2 = title.split("-");
        
        var from2 = null;
        var to2 = null;
        // get number only
        // 2 loop times is maximum
        console.log("first split");
        console.log(split2);
        for (var i = 0; i < split2.length; i++) {
          if (split2[i].match(/\d+/) != null) {
            if (split2[i].match(/\d+/).length > 0) {
              const number = split2[i].match(/\d+/)[0];
              // console.log(number);
              if (i == 0) {
                from2 = parseInt(number);
              } else if (i == 1) {
                to2 = parseInt(number);
              }
            }
          }
        }
        this.state.fromPriceText = from2 == null ? "null" : from2.toString();
        this.state.toPriceText = to2 == null ? "null" : to2.toString();

        this.state.price = {
          selectedKey: itemKey,
          text: title,
        };
        break;

      default:
        break;
    }

    console.log("qwe");
    console.log(this.state.type);
    console.log(this.state.area);
    console.log(this.state.address);
    console.log(this.state.price);
  };

  handleSearch = () => {
    alert("text: " + this.state.searchText);
  };

  handleChange = (event) => {
    // alert("text: " + event.target.value);
    console.log("text: " + event.target.value);
    this.setState({
      searchText: event.target.value,
    });
  };

  handleShowTooltip = () => {
    if (this.state.searchText.length < 3) {
      this.setState({
        isTooltipShown: true,
      });
    } else {
      this.setState({
        isTooltipShown: false,
      });
    }
  };

  renderSearchConditionaLink = () => {
    // console.log(this.state.searchText.length)
    // console.log("shshshsh");
    // console.log(this.state.area);
    if (this.state.searchText.length >= 3) {
      return (
        <button className="home-search-button">
          <Link
            className="link"
            to={{
              pathname:
                "/search-result-page/st=" +
                this.state.searchText +
                "/" +
                this.state.type.selectedKey +
                "/" +
                this.state.fromArea +
                "-" +
                this.state.toArea +
                // this.state.area.selectedKey +
                "/" +
                this.state.address.selectedKey +
                "/" +
                this.state.price.selectedKey,
            }}
          ></Link>
          <AiOutlineSearch className="home-search-icon" />
        </button>
        // <button className="home-search-button">
        //   <Link
        //     className="link"
        //     to={{
        //       pathname:
        //         "/search-result-page/" +
        //         this.state.searchText +
        //         "/" +
        //         this.state.type.selectedKey +
        //         "/" +
        //         this.state.area.selectedKey +
        //         "/" +
        //         this.state.address.selectedKey +
        //         "/" +
        //         this.state.price.selectedKey,
        //     }}
        //   >
        //     <AiOutlineSearch className="home-search-icon" />
        //   </Link>
        // </button>
      );
    }

    return (
      <button onClick={this.handleShowTooltip} className="home-search-button">
        <AiOutlineSearch className="home-search-icon" />
      </button>
    );
  };

  // hit enter
  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state.searchText);
    if (this.state.searchText?.length >= 0) {
      this.props.history.push(
        "/search-result-page/st=" +
          this.state.searchText +
          "/" +
          this.state.type.selectedKey +
          "/" +
          this.state.fromAreaText +
          "-" +
          this.state.toAreaText +
          // this.state.area.selectedKey +
          "/" +
          this.state.address.selectedKey +
          "/" +
          // this.state.price.selectedKey +
          this.state.fromPriceText + 
          "-" +
          this.state.toPriceText +
          "/" +
          this.state.selectedDoorDirection.text +
          "/" +
          this.state.selectedBedroom.value +
          "/" +
          this.state.selectedBathroom.value +
          "/" +
          this.state.selectedSort.value
      );
    }
  };
  handlePush = () => {
    if (this.state.searchText.length >= 3) {
      this.props.history.push(
        "/search-result-page/st=" +
          this.state.searchText +
          "/" +
          this.state.type.selectedKey +
          "/" +
          this.state.area.selectedKey +
          "/" +
          this.state.address.selectedKey +
          "/" +
          this.state.price.selectedKey
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* <BuyerNavbar /> */}
        <div className="home-show">
          <div className="black-glass">
            <div style={{ height: "120px" }}></div>
            <h1 className="noselect important-title">
              Tìm kiếm nhà đất tại đây
            </h1>

            <div className="home-search-wrapper">
              {this.state.isTooltipShown ? (
                <div className="home-tooltip noselect">
                  <span className="tooltiptext">
                    Thông tin phải ít nhất 3 ký tự
                  </span>
                </div>
              ) : null}
              {/* search bar */}
              <form onSubmit={this.handleSubmitForm}>
                <div className="home-search-bar">
                  <input
                    onChange={this.handleChange}
                    className="home-search-field"
                    placeholder="Nhập địa điểm, khu vực, tên dự án..."
                    value={this.state.value}
                  ></input>

                  {/* <button className="home-search-button">
                  <Link
                    className="link"
                    to={{
                      pathname: "/search-result-page/" + this.state.searchText,
                    }}
                  >
                    <AiOutlineSearch className="home-search-icon" />
                  </Link>
                </button> */}
                  {this.renderSearchConditionaLink()}
                </div>
              </form>

              {/* filter */}
              <div className="home-filter-wrapper">
                {this.state.filters.map((filter) => (
                  <HomeFilterBox
                    key={filter.key}
                    handler={this.handleFilter}
                    filter={filter}
                  />
                ))}
                {/* <HomeFilterBox
                    key={filter.key}
                    handler={this.handleFilter}
                    filter={filter}
                    // filterKey={filter.key}
                    // filterName={filter.filterName}
                    // title={filter.title}
                    // options={filter.options}
                  /> */}

                {/* <HomeFilterBox title="Loại nhà đất" />
                <HomeFilterBox title="Khu vực" /> */}
                {/* <HomeFilterBox title="Mức giá" />
                <HomeFilterBox title="Diện tích " /> */}
              </div>

              <div className="home-filter-wrapper">
                {this.state.advancedFilters.map((filter) => (
                  <HomeFilterBox
                    key={filter.key}
                    handler={this.handleFilter}
                    filter={filter}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default HomePage;
