import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import FilterDropBox from "./filter-drop-box";
import "./shared.css";
import "./search-suggestion.css";
import "./search-suggestion-mobile.css";
import Constants from "../global/Constants";

class SearchSuggestion extends Component {
  state = {
    searchText: "",
    isTooltipShown: false,
    fromAreaText: null,
    toAreaText: null,
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
        typeKey: 0,
        title: "Tất cả",
        options: [
          { key: 0, text: "Tất cả" },
          { key: 1, text: "< 1 tỷ" },
          { key: 2, text: "1 tỷ - 2 tỷ" },
          { key: 3, text: "2 tỷ - 3 tỷ" },
          { key: 4, text: "3 tỷ - 5 tỷ" },
          { key: 5, text: "5 tỷ - 10 tỷ" },
          { key: 6, text: "10 tỷ - 20 tỷ" },
          { key: 7, text: "> 20 tỷ" },
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
  };

  handleSearch = (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(this.state.searchText);
    if (this.state.searchText.length >= 0) {
      this.setState({
        isTooltipShown: false,
      });
      // this.props.history.push("/#");
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
        this.state.price.selectedKey
      );

      // this.props.history.push(
      //   "/search-result-page/" +
      //     this.state.searchText +
      //     "/" +
      //     this.state.type.selectedKey +
      //     "/" +
      //     this.state.area.selectedKey +
      //     "/" +
      //     this.state.address.selectedKey +
      //     "/" +
      //     this.state.price.selectedKey
      // );
    } else {
      this.setState({
        isTooltipShown: true,
      });
    }
  };

  handleChangeInput = (event) => {
    console.log("searh: ");
    console.log(event.target.value);
    this.setState({
      searchText: event.target.value,
    });
  };

  handleSelectItem = (filterKey, filterTypeKey, option) => {
    console.log("select!");
    console.log(filterKey, option.key, option.text);
    switch (filterKey) {
      case 0:
        this.state.type = {
          selectedKey: option.key,
          text: option.text,
        };
        // console.log(this.state.type);
        break;
      case 1:
        const split = option.text.split("-");
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

        console.log("moe");
        console.log(this.state.fromAreaText);
        console.log(this.state.toAreaText);

        this.state.area = {
          selectedKey: option.key,
          text: option.text,
        };
        break;
      case 2:
        this.state.address = {
          selectedKey: option.key,
          text: option.text,
        };
        break;
      case 3:
        this.state.price = {
          selectedKey: option.key,
          text: option.text,
        };
        break;

      default:
        break;
    }

    console.log("zzz");
    console.log(this.state.type);
    console.log(this.state.area);
    console.log(this.state.address);
    console.log(this.state.price);
  };

  render() {
    return (
      <form onSubmit={this.handleSearch} className="suggestion-container">

        {/* search */}
        <div className="search-bar" >
          <AiOutlineSearch />
          <input
            id={"search-bar"}
            onChange={this.handleChangeInput}
            type="text"
            className="search-bar"
            placeholder="Tìm kiếm địa điểm, khu vực"
            autoComplete="off"
          />
          {this.state.isTooltipShown ? (
            <div className="search-suggestion-tooltip noselect">
              <span className="tooltiptext">
                Thông tin phải ít nhất 3 ký tự
              </span>
            </div>
          ) : null}
        </div>
        {/* filter for searching */}
        {this.state.filters.map((filter) => (
          <React.Fragment key={filter.key}>
            <FilterDropBox
              handler={this.handleSelectItem}
              filterKey={filter.key}
              filter={filter}
              title="Khu vực"
              value="Hồ Chí Minh"
            />
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
    );
  }
}

export default SearchSuggestion;
