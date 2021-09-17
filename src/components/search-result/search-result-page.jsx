import React, { Component } from "react";
import "./search-result.css";
import "./search-result-mobile.css";
import ProductItem from "./product-item";
import SearchSuggestion from "../global/search-suggestion";
import { Link } from "react-router-dom";
import Constants from "../global/Constants";
import BuyerNavbar from "../global/BuyerNavbar";

class SearchResultPage extends Component {
  state = {
    items: [],
    isLoaded: false,
    searchText: null,

    disId: null,
    minPrice: null,
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    type: null,
    doorDirection: null,
    numberOfBedroom: null,
    numberOfBathroom: null,
    sort: null,
    paging: {
      totalRecord: 0,
      totalPage: 0,
      contentSize: 0,
      pageIndex: 0,
    },

    suggestionInfo: {},
    realEstateTypes: [
      { key: 0, text: "Tất cả" },
      { key: 1, text: "Chung Cư" },
      { key: 2, text: "Nhà" },
      { key: 3, text: "Đất" },
    ],
    doorDirections: [
      { key: 0, title: "Tất cả hướng" },
      { key: 1, title: "Đông" },
      { key: 2, title: "Đông Nam" },
      { key: 3, title: "Nam" },
      { key: 4, title: "Tây Nam" },
      { key: 5, title: "Tây" },
      { key: 6, title: "Tây Bắc" },
      { key: 7, title: "Bắc" },
      { key: 8, title: "Đông Bắc" },
    ],
  };

  componentDidMount() {
    // set info
    // this.setState({
    //   suggestionInfo: {
    //     // type: this.state.realEstateTypes[parseInt(this.props.match.params.type)],
    //     type: { key: 1, text: "Chung Cư" },
    //   }
    // });
    this.state.suggestionInfo = 2;
    console.log("nope");
    console.log(this.state.suggestionInfo);

    //this.props.match.params.searchtext
    this.state.searchText =
      this.props.match.params.searchtext === undefined ||
      this.props.match.params.searchtext === null
        ? ""
        : this.props.match.params.searchtext;
    this.setState({
      searchText:
        this.props.match.params.searchtext === undefined ||
        this.props.match.params.searchtext === null
          ? ""
          : this.props.match.params.searchtext,
    });
    var fromPrice = null; // million vnd
    var toPrice = null;
    var fromArea = null; // million / m2
    var toArea = null;
    var address =
      this.props.match.params.address === "0"
        ? null
        : parseInt(this.props.match.params.address);
    var doorDirection = this.props.match.params.doorDirection
      ?.toLowerCase()
      .includes("tất cả")
      ? null
      : this.props.match.params.doorDirection;
    var bedroom =
      this.props.match.params.bedroom === "0" ||
      this.props.match.params.bedroom === undefined
        ? null
        : parseInt(this.props.match.params.bedroom);
    var bathroom =
      this.props.match.params.bathroom === "0" ||
      this.props.match.params.bathroom === undefined
        ? null
        : parseInt(this.props.match.params.bathroom);
    var sort =
      this.props.match.params.sort === "view" ||
      this.props.match.params.sort === undefined
        ? null
        : this.props.match.params.sort;

    console.log("path");
    console.log(this.props);

    // if (this.props.match.params.area == 0) {
    //   fromArea = null;
    //   toArea = null;
    // } else if (this.props.match.params.area == 1) {
    //   fromArea = 0;
    //   toArea = 50;
    // }

    switch (this.props.match.params.area) {
      case "-1":
        fromArea = null;
        toArea = null;
        break;
      // case "1":
      //   fromArea = 0;
      //   toArea = 50;
      //   break;
      // case "2":
      //   fromArea = 50;
      //   toArea = 100;
      //   break;
      // case "3":
      //   fromArea = 100;
      //   toArea = 200.0;
      //   break;
      // case "4":
      //   fromArea = 200;
      //   toArea = 300;
      //   break;
      // case "5":
      //   fromArea = 300;
      //   toArea = 400;
      //   break;
      // case "6":
      //   fromArea = 400;
      //   toArea = 500;
      //   break;
      // case "7":
      //   fromArea = 500;
      //   toArea = 1000;
      //   break;

      default:
        // 2 elements is max
        const split = this.props.match.params.area.toString().split("-");

        if (split[0] !== "null" && split[1] !== "null") {
          for (var i = 0; i < split.length; i++) {
            const numberString = split[i].match(/\d+/)[0];
            if (i == 0) {
              fromArea = parseInt(numberString);
            } else if (i == 1) {
              toArea = parseInt(numberString);
            }
          }
        } else if (split[0] !== "null" && split[1] === "null") {
          fromArea = parseInt(split[0]);
        } else if (split[0] === "null" && split[1] !== "null") {
          toArea = parseInt(split[1]);
        }

        // fromArea = null;
        // toArea = null;
        break;
    }

    // console.log(this.props.match.params.area);
    // console.log(fromArea);
    // console.log(toArea);
    console.log("dumpppppp");
    console.log(this.props.match.params);
    // console.log(fromArea);
    // console.log(toArea);

    switch (this.props.match.params.price) {
      case "0":
        fromPrice = null;
        toPrice = null;
        break;
      case "1":
        fromPrice = null;
        toPrice = 1;
        break;
      case "2":
        fromPrice = 1;
        toPrice = 2;
        break;
      case "3":
        fromPrice = 2;
        toPrice = 3;
        break;
      case "4":
        fromPrice = 3;
        toPrice = 5;
        break;
      case "5":
        fromPrice = 5;
        toPrice = 10;
        break;
      case "6":
        fromPrice = 10;
        toPrice = 20;
        break;
      case "7":
        fromPrice = 20;
        toPrice = 1000;
        break;

      default:
        // 2 elements is max
        const split2 = this.props.match.params.price.toString().split("-");

        if (split2[0] !== "null" && split2[1] !== "null") {
          for (var i = 0; i < split2.length; i++) {
            const numberString = split2[i].match(/\d+/)[0];
            if (i == 0) {
              fromPrice = parseInt(numberString);
            } else if (i == 1) {
              toPrice = parseInt(numberString);
            }
          }
        } else if (split2[0] !== "null" && split2[1] === "null") {
          fromPrice = parseInt(split2[0]);
        } else if (split2[0] === "null" && split2[1] !== "null") {
          toPrice = parseInt(split2[1]);
        }
        break;
    }

    // console.log(this.props.match.params.price);
    console.log("area info");
    console.log(fromArea);
    console.log(toArea);

    this.setState({
      disId: address,
      minPrice: fromPrice,
      minPrice: fromPrice,
      maxPrice: toPrice,
      minArea: fromArea,
      maxArea: toArea,
      type:
        this.props.match.params.type == 0 ? null : this.props.match.params.type,
      doorDirection: doorDirection,
      numberOfBedroom: bedroom,
      numberOfBathroom: bathroom,
      sort: sort,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: 0,
        search: this.state.searchText,
        disId: address,
        wardId: null,
        minPrice: fromPrice,
        maxPrice: toPrice,
        minArea: fromArea,
        maxArea: toArea,
        type:
          this.props.match.params.type == 0
            ? null
            : this.props.match.params.type,
        direction: doorDirection,
        numberOfBedroom: bedroom,
        numberOfBathroom: bathroom,
        sort: sort,
      }),
    };

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     page: 0,
    //     search: this.state.searchText,
    //     disName: null,
    //     minPrice: fromPrice,
    //     maxPrice: toPrice,
    //     minArea: fromArea,
    //     maxArea: toArea,
    //     type:
    //       this.props.match.params.type == 0
    //         ? null
    //         : this.props.match.params.type,
    //   }),
    // };

    fetch(Constants.getRealEstateRef, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("search result zz");

          console.log(result);
          this.setState({
            items: result.content,
            isLoaded: true,
          });

          let myPaging = {
            totalRecord: result.totalRecord,
            totalPage: result.totalPage,
            contentSize: result.contentSize,
            pageIndex: result.pageIndex,
          }

          this.setState({
            paging: myPaging,
          });
        },
        (error) => {
        }
      );

    let element = document.getElementById("search-bar");
    if (element != null) {
      element.value = this.state.searchText;
    }
  }

  renderSearchResult() {
    if (!this.state.isLoaded) {
      return null;
    }

    if (this.state.items?.length === 0) {
      return (
        <div className="not-found-container">
          <div className="not-found"></div>
          <span>
            Rất tiếc, hiện chưa có bất động sản nào cho thông tin mà bạn yêu cầu
          </span>
          <br />
          <span>Vui lòng kiểm tra lại thông tin tìm kiếm của bạn</span>
        </div>
      );
    }
    return (
      <div className="product-list">
        {this.state.items?.map((item) => (
          <Link
            key={item.id}
            className="link"
            to={{
              pathname:
                "/product-detail-page/" +
                item.id +
                `${this.props.location.pathname.replace(
                  "/search-result-page",
                  ""
                )}`,
              product: item,
            }}
          >
            <ProductItem item={item} />
          </Link>
          // <Link className="link" to="/product-detail-page">
          // <ProductItem item={item} />
          // </Link>
        ))}
        {/* <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem /> */}
      </div>
    );
  }

  callAPIGetAllByPaging = (pageIndex) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pageIndex,
        search: this.state.searchText,
        disId: this.state.disId,
        wardId: null,
        minPrice: this.state.minPrice,
        maxPrice: this.state.maxPrice,
        minArea: this.state.minArea,
        maxArea: this.state.maxArea,
        type: this.state.type,
        direction: this.state.doorDirection,
        numberOfBedroom: this.state.numberOfBedroom,
        numberOfBathroom: this.state.numberOfBathroom,
        sort: this.state.sort,
      }),
    };

    fetch(Constants.getRealEstateRef, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("search result exe");
          console.log(result);
          this.setState({
            items: result.content,
            isLoaded: true,
          });
        },
        (error) => {}
      );
  };

  generatePaging = () => {
    let firstTag = (
      <li
        class={
          "page-item " + (this.state.paging.pageIndex == 0 ? "disabled" : "")
        }
      >
        <a
          class="page-link"
          onClick={() =>
            this.callAPIGetAllByPaging(
              Math.max(0, this.state.paging.pageIndex - 1)
            )
          }
        >
          Trước
        </a>
      </li>
    );
    let lastTag = (
      <li
        class={
          "page-item " +
          (this.state.paging.totalPage - 1 == this.state.paging.pageIndex
            ? "disabled"
            : "")
        }
      >
        <a
          class="page-link"
          onClick={() =>
            this.callAPIGetAllByPaging(
              Math.min(
                this.state.paging.pageIndex + 1,
                this.state.paging.totalPage - 1
              )
            )
          }
        >
          Sau
        </a>
      </li>
    );

    let tags = [firstTag];

    for (let i = 0; i < this.state.paging.totalPage; i++) {
      let tag = (
        <li class="page-item">
          <a class="page-link" onClick={() => this.callAPIGetAllByPaging(i)}>
            {i + 1}
          </a>
        </li>
      );
      let currentIndexTag = (
        <li class="page-item active">
          <span class="page-link">{i + 1}</span>
        </li>
      );
      if (this.state.paging.pageIndex == i) {
        tags.push(currentIndexTag);
      } else {
        tags.push(tag);
      }
    }
    tags.push(lastTag);
    return tags;
  };

  render() {
    return (
      <React.Fragment>
        {/* <BuyerNavbar /> */}
        <SearchSuggestion
          suggestionInfo={this.state.suggestionInfo}
          params={this.props.match.params}
          history={this.props.history}
        />
        {/* search result list */}
        <div
          style={{
            height: "calc(100% - 1px - 70px - 50px)",
            paddingTop: "12px",
            paddingBottom: "12px",
            // height: "2000px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            //           display: flex;
            // flex-direction: row;
            // align-items: center;
            // justify-content: center;
          }}
        >
          {this.renderSearchResult()}
        </div>

        <ul class="pagination">{this.generatePaging().map((val) => val)}</ul>

        {/* <div className="pagination-wrapper">
          <div className="pagination-container"></div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default SearchResultPage;
