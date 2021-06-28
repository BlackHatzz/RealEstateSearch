import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import FilterDropBox from "./filter-drop-box";
import "./shared.css";
import Constants from "../global/Constants";

class SearchSuggestion extends Component {
  state = {
    searchText: "",
    isTooltipShown: false,
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

  handleSelectItem = (option) => {
    console.log("select!");
  }

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
          {this.state.filters.map((filter) => (
            <React.Fragment key={filter.key}>
              <FilterDropBox handler={this.handleSelectItem} filter={filter} title="Khu vực" value="Hồ Chí Minh" />
            </React.Fragment>
          ))}
          {/* <FilterDropBox title="Loại nhà đất" value="Tất cả" />
          <FilterDropBox title="Khu vực" value="Hồ Chí Minh" />
          <FilterDropBox title="Mức giá" value="Tất cả" />
          <FilterDropBox title="Diện tích" value="Tất cả" /> */}

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
