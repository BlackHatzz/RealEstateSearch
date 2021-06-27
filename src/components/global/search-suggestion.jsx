import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import FilterDropBox from "./filter-drop-box";
import "./shared.css";
import { Link } from "react-router-dom";

class SearchSuggestion extends Component {
  state = {
    searchText: "",
    isTooltipShown: false,
  };

  handleSearch = (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(this.state.searchText);
    if (this.state.searchText.length >= 3) {
      this.setState({
        isTooltipShown: false,
      })
      this.props.history.push("/search-result-page/" + this.state.searchText);
    } else {
      this.setState({
        isTooltipShown: true,
      })
    }
  };

  handleChangeInput = (event) => {
    console.log("searh: ");
    console.log(event.target.value);
    this.setState({
      searchText: event.target.value,
    });
  };

  render() {
    return (
      <div id="search-suggestion" className="suggestion-container vertical">
        <form onSubmit={this.handleSearch} className="horizontal">
          {this.state.isTooltipShown ? (
            <div className="search-suggestion-tooltip noselect">
              <span className="tooltiptext">
                Thông tin phải ít nhất 3 ký tự
              </span>
            </div>
          ) : null}
          {/* search */}
          <div
            style={{ alignItems: "flex-start" }}
            className="search-bar vertical"
          >
            <div
              style={{ width: "95%", marginLeft: "6px" }}
              className="horizontal"
            >
              <AiOutlineSearch />
              <input
                onChange={this.handleChangeInput}
                type="text"
                className="search-bar"
                placeholder="Tìm kiếm địa điểm, khu vực"
                autoComplete="off"
              />
            </div>
          </div>
          {/* filter for searching */}
          <FilterDropBox title="Loại nhà đất" value="Tất cả" />
          <FilterDropBox title="Khu vực" value="Hồ Chí Minh" />
          <FilterDropBox title="Mức giá" value="Tất cả" />
          <FilterDropBox title="Diện tích" value="Tất cả" />

          {/* search button */}
          {/* <Link
            className="link"
            to={{
              pathname: "/search-result-page/" + this.state.searchText,
            }}
          > */}
            <input className="search-button" type="submit" value="Tìm Kiếm" />
          {/* </Link> */}
        </form>
      </div>
    );
  }
}

export default SearchSuggestion;
