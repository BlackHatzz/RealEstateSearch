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
      {
        key: 2,
        filterName: "Khu vực",
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
        key: 4,
        filterName: "Mức giá",
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả" },
          { key: 1, text: "< 500 triệu" },
          { key: 2, text: "500 triệu - 1 tỷ" },
          { key: 3, text: "1 tỷ - 3 tỷ" },
        ],
      },
    ],
    // optionList: [
    //   [{key: 0, text: "Chung Cư"}, {key: 1, text: "Nhà"}, {key: 2, text: "Đất"}],
    //   [{key: 0, text: "< 500 triệu"}, {key: 1, text: "500 - 1 tỷ"}, {key: 2, text: "1 tỷ - 2 tỷ"}, {key: 3, text: "2 tỷ - 5 tỷ"}]
    // ]
  };

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: 0,
        size: 20,
        search: "",
        price: null,
        fromArea: null,
        toArea: null,
        type: 1,
      }),
    };

    fetch(
      "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/api/v1/realEstate/getRealEstateDetail",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.content);
          console.log("cloud");
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

  handleFilter = (filterKey, itemKey, title) => {
    console.log("inssss" + filterKey + itemKey + title);
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

  // hit enter
  handleSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.searchText.length >= 3) {
      this.props.history.push("/search-result-page/" + this.state.searchText);
    }
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
                    // filterKey={filter.key}
                    // filterName={filter.filterName}
                    // title={filter.title}
                    // options={filter.options}
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
