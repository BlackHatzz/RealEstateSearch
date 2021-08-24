import React, { Component } from "react";
import "./search-result.css";
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
  };

  componentDidMount() {
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
    var fromPrice = 0.0; // million vnd
    var toPrice = 0.0;
    var fromArea = null; // million / m2
    var toArea = null;

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
          fromArea = parseInt(split[1]);
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
        break;
    }

    // console.log(this.props.match.params.price);
    // console.log(fromPrice);
    // console.log(toPrice);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: 0,
        search: this.state.searchText,
        disName: null,
        minPrice: fromPrice,
        maxPrice: toPrice,
        minArea: fromArea,
        maxArea: toArea,
        type:
          this.props.match.params.type == 0
            ? null
            : this.props.match.params.type,
      }),
    };

    fetch(Constants.getRealEstateRef, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("search result");

          console.log(result.content);
          this.setState({
            items: result.content,
            isLoaded: true,
          });
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

    let element = document.getElementById("search-bar");
    if (element != null) {
      element.value = this.state.searchText;
    }
  }

  renderSearchResult() {
    if (!this.state.isLoaded) {
      return null;
    }

    if (this.state.items.length === 0) {
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
        {this.state.items.map((item) => (
          <Link
            key={item.id}
            className="link"
            to={{
              pathname: "/product-detail-page/" + item.id,
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

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
          }}
        >
          {/* <BuyerNavbar /> */}
          <div
            style={{
              width: "100%",
              borderBottom: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <SearchSuggestion history={this.props.history} />

          {/* search result list */}
          <div
            style={{
              overflowY: "auto",
              overflowX: "hidden",
              flex: 1,
            }}
          >
            <div className="horizontal">{this.renderSearchResult()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResultPage;
