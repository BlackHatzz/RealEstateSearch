import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import FilterDropBox from "./filter-drop-box";
import "./shared.css";
import "./search-suggestion.css";
import Constants from "../global/Constants";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Divider } from "@material-ui/core";

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
    isMoreFilterMenuShown: false,
    isDoorDirectionMenuShown: false,
    selectedDoorDirection: { key: -1, title: "Tất cả hướng" },
    doorDirections: [
      { key: -1, title: "Tất cả hướng" },
      { key: 1, title: "Đông" },
      { key: 2, title: "Đông Nam" },
      { key: 3, title: "Nam" },
      { key: 4, title: "Tây Nam" },
      { key: 5, title: "Tây" },
      { key: 6, title: "Tây Bắc" },
      { key: 7, title: "Bắc" },
      { key: 8, title: "Đông Bắc" },
    ],

    selectedBedroom: { key: -1, title: "Tất cả" },
    bedrooms: [
      { key: -1, title: "Tất cả" },
      { key: 1, title: "1+" },
      { key: 2, title: "2+" },
      { key: 3, title: "3+" },
      { key: 4, title: "4+" },
    ],

    isSortShown: false,
    selectedSort: { key: 1, title: "Bất động sản nổi bật" },
    sorts: [
      { key: 1, title: "Bất động sản nổi bật" },
      { key: 2, title: "Tin mới nhất" },
      { key: 3, title: "Giá thấp đến cao" },
      { key: 4, title: "Giá cao đến thấp" },
      { key: 5, title: "Diện tích nhỏ đến lớn" },
      { key: 6, title: "Diện tích lớn đến nhỏ" },
    ]
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
                id={"search-bar"}
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
              <FilterDropBox
                handler={this.handleSelectItem}
                filterKey={filter.key}
                filter={filter}
                title="Khu vực"
                value="Hồ Chí Minh"
              />
            </React.Fragment>
          ))}
          <div>
            <div
              onClick={() => {
                this.setState({
                  isMoreFilterMenuShown: !this.state.isMoreFilterMenuShown,
                });
              }}
              className="more-filter-container"
            >
              <TuneOutlinedIcon className="icon" />
              <span className="noselect title">Lọc thêm</span>
            </div>
            {this.state.isMoreFilterMenuShown ? (
              <div className="more-filter-menu-wrapper">
                <div className="more-filter-menu-container linear-gray-border">
                  <div className="item">
                    <div className="row">
                      <span className="row-title">Hướng cửa chính</span>
                      <div style={{ height: "4px" }}></div>
                      <div
                        onClick={() => {
                          this.setState({
                            isDoorDirectionMenuShown:
                              !this.state.isDoorDirectionMenuShown,
                          });
                        }}
                        className="drop-box linear-gray-border"
                      >
                        <span className="text noselect">
                          {this.state.selectedDoorDirection.title}
                        </span>
                        <RiArrowDropDownLine className="more-filter-icon" />

                        {this.state.isDoorDirectionMenuShown ? (
                          <div className="select-wrapper">
                            <div className="select-container linear-gray-border">
                              {this.state.doorDirections.map((item, index) => (
                                <div
                                  onClick={() => {
                                    this.setState({
                                      selectedDoorDirection: item,
                                    });
                                  }}
                                  key={index}
                                  className="item noselect"
                                >
                                  <span>{item.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {/* {this.isDoorDirectionMenuShown ? } */}
                      </div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="row">
                      <span className="row-title">Phòng ngủ</span>
                      <div style={{ height: "4px" }}></div>
                      <div className="selection-box linear-gray-border">
                        {this.state.bedrooms.map((item, index) => (
                          <React.Fragment key={index}>
                            {/* item */}
                            {this.state.selectedBedroom.key === item.key ? (
                              <span style={{backgroundColor: "rgb(200, 200, 200)"}} className="selection-item noselect">
                                {item.title}
                              </span>
                            ) : (
                              <span onClick={() => {
                                this.setState({
                                  selectedBedroom: item
                                });
                              }} className="selection-item noselect">
                                {item.title}
                              </span>
                            )}

                            {/* line */}
                            {index !== this.state.bedrooms.length - 1 ? (
                              <div className="selection-line"></div>
                            ) : null}
                          </React.Fragment>
                        ))}
                        {/* <span className="selection-item">Tất cả</span>
                        <div className="selection-line"></div>
                        <span className="selection-item">1+</span>
                        <div className="selection-line"></div>
                        <span className="selection-item">2+</span>
                        <div className="selection-line"></div>
                        <span className="selection-item">3+</span>
                        <div className="selection-line"></div>
                        <span className="selection-item">4+</span> */}
                      </div>
                    </div>
                  </div>
                  
                  <div className="item">
                    <div className="row">
                      <span className="row-title">Sắp xếp</span>
                      <div style={{ height: "4px" }}></div>
                      <div
                        onClick={() => {
                          this.setState({
                            isSortShown: !this.state.isSortShown
                          });
                        }}
                        className="drop-box linear-gray-border"
                      >
                        <span className="text noselect">
                          {this.state.selectedSort.title}
                        </span>
                        <RiArrowDropDownLine className="more-filter-icon" />

                        {this.state.isSortShown ? (
                          <div className="select-wrapper">
                            <div className="select-container linear-gray-border">
                              {this.state.sorts.map((item, index) => (
                                <div
                                  onClick={() => {
                                    this.setState({
                                      selectedSort: item,
                                    });
                                  }}
                                  key={index}
                                  className="item noselect"
                                >
                                  <span>{item.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {/* {this.isDoorDirectionMenuShown ? } */}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : null}
          </div>

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
