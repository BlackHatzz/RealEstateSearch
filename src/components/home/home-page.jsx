import React, { Component } from "react";
import "./home.css";
import "../global/shared.css";
import { AiOutlineSearch } from "react-icons/ai";
import HomeFilterBox from "./home-filter-box";
// import {Router, Route, Link, RouteHandler} from 'react-router';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import BuyerNavbar from "../global/BuyerNavbar";
class HomePage extends Component {
  // var useHistory = useHistory();
  state = {
    searchText: "",
    items: [],
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
              {/* search bar */}
              <div className="home-search-bar">
                <input
                  onChange={this.handleChange}
                  className="home-search-field"
                  placeholder="Nhập địa điểm, khu vực, tên dự án..."
                  value={this.state.value}
                ></input>

                {/* <button className="home-search-button">
                    <AiOutlineSearch className="home-search-icon" />
                </button> */}

                {/* <button className="home-search-button">
                  <Link className="link" to="/search-result-page">
                    <AiOutlineSearch className="home-search-icon" />
                  </Link>
                </button>
              </div> */}

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
              </div>

              {/* filter */}
              <div className="home-filter-wrapper">
                <HomeFilterBox title="Loại nhà đất" />
                <HomeFilterBox title="Khu vực" />
                <HomeFilterBox title="Mức giá" />
                <HomeFilterBox title="Diện tích " />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
