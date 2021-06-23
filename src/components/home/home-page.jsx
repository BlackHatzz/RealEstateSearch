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

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: 0,
        size: 20,
        search: "nguyen huu canh",
        price: null,
        fromArea: null,
        toArea: null,
        type: null,
      }),
    };

    fetch("http://localhost:8080/api/v1/rs", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.content,
          });
          // console.log(this.state.items);
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

    // fetch("http://localhost:8080/api/v1/rs", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({items: data.content}));

    // console.log(this.state.items);
  }

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
