import React, { Component } from "react";
import "./home.css";
import "../global/shared.css";
import { AiOutlineSearch } from "react-icons/ai";
import HomeFilterBox from "./home-filter-box";
// import {Router, Route, Link, RouteHandler} from 'react-router';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import BuyerNavbar from "../global/BuyerNavbar";
import Constants from "../global/Constants";

class HomePage extends Component {
  state = {
    isTooltipShown: false,
    searchText: "",
    items: [],
    filters: [
      {
        key: 0,
        filterName: "Loại nhà đất",
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
        filterName: "Mức giá",
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả" },
          { key: 1, text: "< 500 triệu" },
          { key: 2, text: "500 triệu - 1 tỷ" },
          { key: 3, text: "1 tỷ - 3 tỷ" },
        ],
      },
      {
        key: 2,
        filterName: "Khu vực",
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả" },
          { key: 1, text: "Quận 1" },
          { key: 2, text: "Quận 2" },
          { key: 3, text: "Quận 3" },
        ],
      },
      {
        key: 4,
        filterName: "Diện tích",
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả" },
          { key: 1, text: "< 30" + Constants.squareMeter },
          {
            key: 2,
            text:
              "30" + Constants.squareMeter + " - 50" + Constants.squareMeter,
          },
          {
            key: 3,
            text: "50" + Constants.squareMeter + "- 80" + Constants.squareMeter,
          },
        ],
      },
    ],
    // optionList: [
    //   [{key: 0, text: "Chung Cư"}, {key: 1, text: "Nhà"}, {key: 2, text: "Đất"}],
    //   [{key: 0, text: "< 500 triệu"}, {key: 1, text: "500 - 1 tỷ"}, {key: 2, text: "1 tỷ - 2 tỷ"}, {key: 3, text: "2 tỷ - 5 tỷ"}]
    // ]
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
    if (this.state.searchText.length >= 3) {
      return (
        <button className="home-search-button">
          <Link
            className="link"
            to={{
              pathname: "/search-result-page/" + this.state.searchText,
            }}
          >
            <AiOutlineSearch className="home-search-icon" />
          </Link>
        </button>
      );
    }

    return (
      <button onClick={this.handleShowTooltip} className="home-search-button">
        <AiOutlineSearch className="home-search-icon" />
      </button>
    );
  };

  render() {
    return (
      <React.Fragment>
        <BuyerNavbar />
        <div className="home-show">
          <div className="black-glass">
            <div style={{ height: "120px" }}></div>
            <h1 className="noselect important-title">
              Tìm kiếm nhà đất tại đây
            </h1>

            <div className="home-search-wrapper">
              {this.state.isTooltipShown ? (
                <div className="home-tooltip noselect">
                  <span className="tooltiptext">Thông tin phải ít nhất 3 ký tự</span>
                </div>
              ) : null}
              {/* search bar */}
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

              {/* filter */}
              <div className="home-filter-wrapper">
                {this.state.filters.map((filter) => (
                  <HomeFilterBox
                    key={filter.key}
                    filterName={filter.filterName}
                    title={filter.title}
                    options={filter.options}
                  />
                ))}
                {/* <HomeFilterBox title="Loại nhà đất" />
                <HomeFilterBox title="Khu vực" /> */}
                {/* <HomeFilterBox title="Mức giá" />
                <HomeFilterBox title="Diện tích " /> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
