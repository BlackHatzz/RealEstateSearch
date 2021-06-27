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
  };

  componentDidMount() {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: 0,
        size: 20,
        search: this.props.match.params.searchtext,
        price: null,
        fromArea: null,
        toArea: null,
        type: null,
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
              pathname: "/product-detail-page",
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
        <BuyerNavbar />
        <div style={{backgroundColor: "silver", width: "100%", height: "1px", padding: "0"}}></div>
        <SearchSuggestion history={this.props.history} />

        {/* search result list */}
        <div style={{ width: "100%" }}>
          <div className="horizontal">{this.renderSearchResult()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResultPage;
