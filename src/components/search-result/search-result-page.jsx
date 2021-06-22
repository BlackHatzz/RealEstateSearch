import React, { Component } from "react";
import "./search-result.css";
import ProductItem from "./product-item";
import SearchSuggestion from "../global/search-suggestion";
import { Link } from "react-router-dom";

class SearchResultPage extends Component {
  state = {
    items: [],
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

    fetch("http://localhost:8080/api/v1/rs", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.content);
          this.setState({
            items: result.content,
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

  render() {
    return (
      <React.Fragment>
        <SearchSuggestion />

        {/* search result list */}
        <div style={{ width: "100%" }}>
          <div className="horizontal">
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResultPage;
