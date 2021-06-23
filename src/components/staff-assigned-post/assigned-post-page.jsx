import React, { Component } from "react";
import "./assigned-post.css";
import AssignedPostItem from "./assigned-post-item";
import Snackbar from "@material-ui/core/Snackbar";

class AssignedPostPage extends Component {
  state = {
    items: [],
    isSnackbarShown: true,
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

  handleCloseSnackbar = () => {
    this.setState({
      isSnackbarShown: false
    });
  }


  handleSnackbar = () => {
    return (
      <Snackbar
      autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={this.state.isSnackbarShown}
        onClose={this.handleCloseSnackbar}
        message="Great! You've created a new transaction!"
        key={"top" + "right"}
      ></Snackbar>
    );
  };
  switchToggle = () => {
    this.setState({
      isSnackbarShown: !this.state.isSnackbarShown,
    });
  };
  renderSnackbar() {
    if (this.state.isSnackbarShown) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={true}
          // onClose={handleClose}
          message="I love snacks"
          key={"top" + "right"}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        {/* <SearchSuggestion /> */}
        {/* <div onClick={this.switchToggle}>switch</div>
        {this.renderSnackbar()} */}

        {/* {this.state.isSnackbarShown ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={true}
            // onClose={handleClose}
            message="I love snacks"
            key={"top" + "right"}
          />
        ) : null} */}

        {/* <z  child={<p>stuooo</p>} /> */}
        {/* search result list */}
        <div style={{ width: "100%" }}>
          <div className="horizontal">
            <div className="staff-product-list">
              {/* {this.state.items.map((item) => (
                    <AssignedPostItem item={item} />
                  ))} */}
              <AssignedPostItem
                item={[]}
                handleSnackbar={this.handleSnackbar}
              />
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
