import React, { Component } from "react";
import "./assigned-post.css";
import AssignedPostItem from "./assigned-post-item";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PositionedSnackbar from "../global/PositionedSnackbar";

class AssignedPostPage extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    console.log("hehe2");
    fetch("http://localhost:8080/api/v1/rs")
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.content);
          this.setState({
            items: result.content,
          });
          console.log(this.state.items);
          // this.setState({
          //   isLoaded: true,
          //   items: result.items,
          // });
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
        {/* <SearchSuggestion /> */}

        <PositionedSnackbar child={<p>stuooo</p>} />
        {/* search result list */}
        <div style={{ width: "100%" }}>
          <div className="horizontal">
            <div className="staff-product-list">
              {/* {this.state.items.map((item) => (
                    <AssignedPostItem item={item} />
                  ))} */}
              <AssignedPostItem item={[]} />
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

export default AssignedPostPage;
